/* Mangiami Prima - servizi di rete: Open Food Facts (& co.) e ricette su Supabase. */
(function () {
  'use strict';
  const MP = (window.MP = window.MP || {});

  /* ================= Open Food Facts ================= */
  const API_URLS = [
    'https://world.openfoodfacts.org/api/v2/product/',
    'https://world.openbeautyfacts.org/api/v2/product/',
    'https://world.openproductsfacts.org/api/v2/product/'
  ];
  const UPCITEMDB_URL = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';
  const TIMEOUT_MS = 12000;
  const CAMPI = 'product_name,product_name_it,product_name_en,generic_name_it,generic_name,brands,image_front_small_url,image_front_url';

  const urlHttps = (u) => {
    try { const x = new URL(String(u || '').trim()); return x.protocol === 'https:' ? x.href : null; } catch (e) { return null; }
  };

  function varianti(codice) {
    const v = [codice];
    if (codice.length === 12) v.push('0' + codice); // UPC-A <-> EAN-13
    else if (codice.length === 13 && codice[0] === '0') v.push(codice.slice(1));
    return v;
  }

  async function chiedi(url, opzioni) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      return await fetch(url, { signal: ctrl.signal, headers: Object.assign({ Accept: 'application/json' }, opzioni && opzioni.headers) });
    } finally { clearTimeout(t); }
  }

  async function cercaOpenFacts(apiUrl, codice) {
    try {
      const r = await chiedi(`${apiUrl}${encodeURIComponent(codice)}.json?fields=${CAMPI}`);
      if (!r.ok) return { errore: r.status !== 404 }; // 404 = assente
      const j = await r.json();
      if (!j || j.status !== 1 || !j.product) return { errore: false };
      const p = j.product;
      let nome = [p.product_name_it, p.product_name, p.product_name_en, p.generic_name_it, p.generic_name]
        .find((n) => typeof n === 'string' && n.trim());
      if (!nome) return { errore: false };
      nome = nome.trim();
      const marca = typeof p.brands === 'string' ? p.brands.split(',')[0].trim() : '';
      if (marca && !nome.toLowerCase().includes(marca.toLowerCase())) nome = `${nome} ${marca}`;
      return { nome, immagine: urlHttps(p.image_front_small_url) || urlHttps(p.image_front_url), errore: false };
    } catch (e) { return { errore: true }; }
  }

  async function cercaUpcItemDb(codice) {
    try {
      const r = await chiedi(UPCITEMDB_URL + encodeURIComponent(codice));
      if (!r.ok) return { errore: r.status !== 404 };
      const j = await r.json();
      const item = j && Array.isArray(j.items) ? j.items[0] : null;
      const nome = item && typeof item.title === 'string' ? item.title.trim() : '';
      if (!nome) return { errore: false };
      const img = (Array.isArray(item.images) ? item.images : []).map(urlHttps).find(Boolean) || null;
      return { nome, immagine: img, errore: false };
    } catch (e) { return { errore: true }; }
  }

  /** Esito: { titolo, immagineUrl, erroreRete }. Il ripiego UPCitemdb (spesso senza CORS) non conta come errore di rete. */
  async function cercaProdotto(codice) {
    let erroreRete = false;
    const v = varianti(codice);
    for (const variante of v) {
      for (const api of API_URLS) {
        const r = await cercaOpenFacts(api, variante);
        if (r.nome) return { titolo: r.nome, immagineUrl: r.immagine, erroreRete: false };
        erroreRete = erroreRete || r.errore;
      }
    }
    // Ripiego: UPCitemdb e GS1 Italy passano dal proxy su Supabase (dal browser sono bloccati da CORS).
    const p = await cercaViaProxy(codice);
    if (p.nome) return { titolo: p.nome, immagineUrl: p.immagine, erroreRete: false };
    if (p.errore === null) {
      // proxy non raggiungibile: UPCitemdb diretto, che a volte risponde (ripiego di ripiego)
      for (const variante of v) {
        const r = await cercaUpcItemDb(variante);
        if (r.nome) return { titolo: r.nome, immagineUrl: r.immagine, erroreRete: false };
      }
      return { titolo: null, immagineUrl: null, erroreRete };
    }
    return { titolo: null, immagineUrl: null, erroreRete: erroreRete || p.errore };
  }

  /** { nome, immagine, errore }: errore = null se il proxy non e' raggiungibile, true se i servizi hanno fallito. */
  async function cercaViaProxy(codice) {
    try {
      const r = await chiedi(`${SUPABASE_URL}/functions/v1/cerca-prodotto?codice=${encodeURIComponent(codice)}`,
        { headers: { apikey: SUPABASE_KEY, Accept: 'application/json' } });
      if (!r.ok) return { errore: null };
      const j = await r.json();
      const nome = typeof j.titolo === 'string' ? j.titolo.trim() : '';
      if (nome) return { nome, immagine: urlHttps(j.immagineUrl), errore: false };
      return { errore: !!j.errore };
    } catch (e) { return { errore: null }; }
  }
  MP.openFoodFacts = { cerca: cercaProdotto };

  /* ================= Ricette (Supabase) ================= */
  const SUPABASE_URL = 'https://dqbqebrfwfbtqnvaejel.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_NvOCatNLryMZhvMJTW0VMA_FgQIJSTG'; // chiave "anon" pubblica (RLS lato server)
  const BONUS_SCADENZA = 0.15;
  const CHIAVE_CACHE = 'mp.ricetteCache.v1';
  const CHIAVE_CODA = 'mp.codaRicette.v1';

  const jl = (k, d) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : d; } catch (e) { return d; } };
  const js = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  function arricchisci(ricette, prodottiFrigo) {
    const { radici, corrisponde } = MP.ingredienti;
    const frigo = prodottiFrigo.map((p) => ({
      radici: radici(p.titolo), subito: MP.prodotto.daUsareSubito(p), scadenza: p.dataScadenza
    }));
    for (const r of ricette) {
      const ingredienti = Array.isArray(r.ingredienti) ? r.ingredienti.map(String) : [];
      r.ingredienti = ingredienti;
      const mancanti = [];
      const inScadenza = [];
      let posseduti = 0;
      for (const ing of ingredienti) {
        const ri = radici(ing);
        const trovati = frigo.filter((p) => corrisponde(p.radici, ri));
        if (trovati.length === 0) { mancanti.push(ing); continue; }
        posseduti++;
        const scad = trovati.filter((p) => p.subito && p.scadenza).map((p) => p.scadenza).sort();
        if (scad.length) inScadenza.push({ ingrediente: ing, scadenza: scad[0] });
      }
      r.posseduti = posseduti;
      r.mancanti = mancanti;
      r.inScadenza = inScadenza;
    }
    const punteggio = (r) => r.posseduti / Math.max(r.ingredienti.length, 1) + BONUS_SCADENZA * Math.min(r.inScadenza.length, 3);
    return ricette.filter((r) => r.posseduti > 0)
      .sort((a, b) => (punteggio(b) - punteggio(a)) || (b.posseduti - a.posseduti));
  }

  /** Ritorna { ricette, daCache }. Se la rete manca usa l'ultimo elenco scaricato; se non c'e' lancia errore. */
  async function getIdee(prodottiFrigo) {
    let grezze;
    let daCache = false;
    try {
      grezze = await richiestaRicette();
      js(CHIAVE_CACHE, { quando: new Date().toISOString(), ricette: grezze });
    } catch (e) {
      if (e instanceof TypeError || e.name === 'AbortError') {
        const cache = jl(CHIAVE_CACHE, null);
        if (cache && Array.isArray(cache.ricette)) { grezze = cache.ricette; daCache = true; } else throw new Error('Nessuna connessione e nessuna ricetta salvata sul dispositivo.');
      } else throw e;
    }
    return { ricette: arricchisci(grezze, prodottiFrigo), daCache };
  }

  async function richiestaRicette() {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/ricette?select=*&limit=500`, {
        headers: { apikey: SUPABASE_KEY, Accept: 'application/json' }, signal: ctrl.signal
      });
      if (!r.ok) throw new Error(`Il server ha risposto ${r.status}.`);
      const j = await r.json();
      return Array.isArray(j) ? j : [];
    } finally { clearTimeout(t); }
  }

  async function inviaRicetta(r) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/ricette`, {
        method: 'POST',
        headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          titolo: r.titolo, ingredienti: r.ingredienti, procedimento: r.procedimento,
          tempo_preparazione: r.tempo || null, autore_nome: r.autore || null
        }),
        signal: ctrl.signal
      });
      if (!resp.ok) {
        const dettaglio = await resp.text().catch(() => '');
        const err = new Error(`Il server ha risposto ${resp.status}. ${dettaglio}`);
        err.http = resp.status;
        throw err;
      }
    } finally { clearTimeout(t); }
  }

  /** Invia la ricetta; se manca la rete la mette in coda (ritorna 'inviata' | 'in-coda'). */
  async function salvaRicetta(r) {
    try {
      await inviaRicetta(r);
      return 'inviata';
    } catch (e) {
      if (e.http) throw e; // risposta negativa del server: non si accoda
      const coda = jl(CHIAVE_CODA, []);
      coda.push(r);
      if (!js(CHIAVE_CODA, coda)) throw new Error('Rete assente e memoria del dispositivo piena.');
      return 'in-coda';
    }
  }

  let svuotando = false;
  /** Prova a inviare le ricette in coda; ritorna quante ne ha inviate. */
  async function svuotaCoda() {
    if (svuotando) return 0;
    svuotando = true;
    let inviate = 0;
    try {
      let coda = jl(CHIAVE_CODA, []);
      while (coda.length) {
        try { await inviaRicetta(coda[0]); } catch (e) {
          if (e.http === 400 || e.http === 422) { coda.shift(); js(CHIAVE_CODA, coda); continue; } // dati rifiutati: si scarta
          break; // rete o server non disponibile: riprova piu' tardi
        }
        coda.shift();
        js(CHIAVE_CODA, coda);
        inviate++;
      }
    } finally { svuotando = false; }
    return inviate;
  }

  MP.ricette = {
    getIdee, salvaRicetta, svuotaCoda,
    inCoda: () => jl(CHIAVE_CODA, []).length
  };
})();
