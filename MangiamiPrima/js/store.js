/* Mangiami Prima - dati locali (localStorage), impostazioni, date, corrispondenza ingredienti. */
(function () {
  'use strict';
  const MP = (window.MP = window.MP || {});

  const CHIAVE_DATI = 'mp.dati.v1';
  const CHIAVE_IMPOSTAZIONI = 'mp.impostazioni.v1';

  MP.VERSIONE = '1.3.6'; // tenere uguale a VERSIONE in sw.js (senza la v)
  MP.GIORNI_PREAVVISO = 3; // entro quanti giorni un prodotto e' "in scadenza"
  MP.GIORNI_PREDEFINITI = 2;
  MP.MASSIMO_GIORNI = 14;

  /* ---------- Date (stringhe ISO yyyy-mm-dd, fuso locale) ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  const date = {
    oggi() {
      const d = new Date();
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    },
    aggiungiGiorni(iso, n) {
      const [y, m, g] = iso.split('-').map(Number);
      const d = new Date(Date.UTC(y, m - 1, g + n));
      return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    },
    giorniDa(iso) { // giorni da oggi (negativo = passato)
      const [y, m, g] = iso.split('-').map(Number);
      const [y0, m0, g0] = date.oggi().split('-').map(Number);
      return Math.round((Date.UTC(y, m - 1, g) - Date.UTC(y0, m0 - 1, g0)) / 86400000);
    },
    formatta(iso) {
      if (!iso) return '';
      const [y, m, g] = iso.split('-');
      return `${g}/${m}/${y}`;
    },
    valida(iso) {
      if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
      const [y, m, g] = iso.split('-').map(Number);
      const d = new Date(Date.UTC(y, m - 1, g));
      return d.getUTCFullYear() === y && d.getUTCMonth() === m - 1 && d.getUTCDate() === g;
    }
  };
  MP.date = date;

  /* ---------- Persistenza ---------- */
  let dati = null;
  let impostazioni = null;
  const ascoltatori = [];

  function leggi(chiave) {
    try {
      const grezzo = localStorage.getItem(chiave);
      return grezzo ? JSON.parse(grezzo) : null;
    } catch (e) { return null; }
  }
  function scrivi(chiave, valore) {
    try { localStorage.setItem(chiave, JSON.stringify(valore)); return true; } catch (e) { return false; }
  }

  function normalizzaDati(d) {
    const r = { prodotti: [], spesa: [], prossimoId: 1 };
    if (!d || typeof d !== 'object') return r;
    let max = 0;
    for (const p of Array.isArray(d.prodotti) ? d.prodotti : []) {
      if (!p || typeof p.titolo !== 'string' || !p.titolo.trim()) continue;
      const id = Number.isInteger(p.id) ? p.id : ++max;
      max = Math.max(max, id);
      r.prodotti.push({
        id,
        codice: String(p.codice ?? ''),
        titolo: p.titolo.trim(),
        immagineUrl: typeof p.immagineUrl === 'string' && p.immagineUrl ? p.immagineUrl : null,
        quantita: Math.max(1, parseInt(p.quantita, 10) || 1),
        dataInserimento: typeof p.dataInserimento === 'string' ? p.dataInserimento : new Date().toISOString(),
        dataScadenza: date.valida(p.dataScadenza) ? p.dataScadenza : null
      });
    }
    for (const e of Array.isArray(d.spesa) ? d.spesa : []) {
      if (!e || typeof e.nome !== 'string' || !e.nome.trim()) continue;
      const id = Number.isInteger(e.id) ? e.id : ++max;
      max = Math.max(max, id);
      r.spesa.push({
        id,
        nome: e.nome.trim(),
        acquistato: !!e.acquistato,
        dataInserimento: typeof e.dataInserimento === 'string' ? e.dataInserimento : new Date().toISOString()
      });
    }
    r.prossimoId = Math.max(max + 1, Number.isInteger(d.prossimoId) ? d.prossimoId : 1);
    return r;
  }

  function normalizzaImpostazioni(i) {
    const r = { giorniPreavviso: MP.GIORNI_PREDEFINITI, orario: '09:00', tema: 'auto', ultimaNotifica: '', notifiche: true };
    if (!i || typeof i !== 'object') return r;
    if (typeof i.notifiche === 'boolean') r.notifiche = i.notifiche; // interruttore delle Impostazioni (false = avvisi spenti)
    const g = parseInt(i.giorniPreavviso, 10);
    if (Number.isFinite(g)) r.giorniPreavviso = Math.min(Math.max(g, 0), MP.MASSIMO_GIORNI);
    if (typeof i.orario === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(i.orario)) r.orario = i.orario;
    if (['auto', 'chiaro', 'scuro'].includes(i.tema)) r.tema = i.tema;
    if (typeof i.ultimaNotifica === 'string') r.ultimaNotifica = i.ultimaNotifica;
    return r;
  }

  function carica() {
    if (!dati) dati = normalizzaDati(leggi(CHIAVE_DATI));
    if (!impostazioni) impostazioni = normalizzaImpostazioni(leggi(CHIAVE_IMPOSTAZIONI));
  }
  function salvaDati() {
    const ok = scrivi(CHIAVE_DATI, dati);
    ascoltatori.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
    return ok;
  }

  /* ---------- Prodotti ---------- */
  const prodotto = {
    giorni(p) { return p.dataScadenza ? date.giorniDa(p.dataScadenza) : null; },
    scaduto(p) { const g = prodotto.giorni(p); return g !== null && g < 0; },
    inScadenza(p) { const g = prodotto.giorni(p); return g !== null && g >= 0 && g <= MP.GIORNI_PREAVVISO; },
    daUsareSubito(p) { const g = prodotto.giorni(p); return g !== null && g <= MP.GIORNI_PREAVVISO; },
    testoScadenza(p) {
      const g = prodotto.giorni(p);
      if (g === null) return '';
      if (g < -1) return `Scaduto da ${-g} giorni`;
      if (g === -1) return 'Scaduto ieri';
      if (g === 0) return 'Scade oggi';
      if (g === 1) return 'Scade domani';
      if (g <= MP.GIORNI_PREAVVISO) return `Scade tra ${g} giorni`;
      return '';
    }
  };
  MP.prodotto = prodotto;

  MP.store = {
    onChange(f) { ascoltatori.push(f); },

    prodotti() { carica(); return dati.prodotti.slice().sort((a, b) => b.dataInserimento.localeCompare(a.dataInserimento)); },

    /** Stesso codice: incrementa la quantita' e aggiorna i dati (come l'app originale). */
    salvaProdotto({ codice, titolo, immagineUrl, dataScadenza }) {
      carica();
      const adesso = new Date().toISOString();
      const esistente = dati.prodotti.find((p) => p.codice === codice);
      if (esistente) {
        esistente.quantita++;
        esistente.titolo = titolo;
        esistente.immagineUrl = immagineUrl || esistente.immagineUrl;
        esistente.dataInserimento = adesso;
        esistente.dataScadenza = dataScadenza || null;
      } else {
        dati.prodotti.push({
          id: dati.prossimoId++, codice, titolo, immagineUrl: immagineUrl || null,
          quantita: 1, dataInserimento: adesso, dataScadenza: dataScadenza || null
        });
      }
      return salvaDati();
    },
    diminuisci(id) {
      carica();
      const p = dati.prodotti.find((x) => x.id === id);
      if (!p) return;
      p.quantita--;
      if (p.quantita <= 0) dati.prodotti = dati.prodotti.filter((x) => x.id !== id);
      salvaDati();
    },
    aumenta(id) {
      carica();
      const p = dati.prodotti.find((x) => x.id === id);
      if (!p) return;
      p.quantita++;
      salvaDati();
    },

    /* ---------- Lista della spesa ---------- */
    listaSpesa() {
      carica();
      return dati.spesa.slice().sort((a, b) =>
        (a.acquistato - b.acquistato) || a.dataInserimento.localeCompare(b.dataInserimento) || a.id - b.id);
    },
    /** Aggiunge i nomi saltando quelli gia' da comprare; restituisce quanti ne ha aggiunti. */
    aggiungiAllaSpesa(nomi) {
      carica();
      const daComprare = new Set(dati.spesa.filter((e) => !e.acquistato).map((e) => e.nome.toLowerCase()));
      let aggiunti = 0;
      for (const n of nomi.map((x) => String(x).trim()).filter(Boolean)) {
        if (daComprare.has(n.toLowerCase())) continue;
        daComprare.add(n.toLowerCase());
        dati.spesa.push({ id: dati.prossimoId++, nome: n, acquistato: false, dataInserimento: new Date().toISOString() });
        aggiunti++;
      }
      if (aggiunti) salvaDati();
      return aggiunti;
    },
    impostaAcquistato(id, acquistato) {
      carica();
      const e = dati.spesa.find((x) => x.id === id);
      if (e) { e.acquistato = acquistato; salvaDati(); }
    },
    eliminaElementoSpesa(id) {
      carica();
      dati.spesa = dati.spesa.filter((x) => x.id !== id);
      salvaDati();
    },
    rimuoviAcquistati() {
      carica();
      dati.spesa = dati.spesa.filter((x) => !x.acquistato);
      salvaDati();
    },

    /* ---------- Impostazioni ---------- */
    impostazioni() { carica(); return Object.assign({}, impostazioni); },
    impostaImpostazioni(parziale) {
      carica();
      impostazioni = normalizzaImpostazioni(Object.assign({}, impostazioni, parziale));
      scrivi(CHIAVE_IMPOSTAZIONI, impostazioni);
      ascoltatori.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
    },

    /* ---------- Export / import ---------- */
    esporta() {
      carica();
      return JSON.stringify({
        app: 'MangiamiPrima', versione: 1, esportatoIl: new Date().toISOString(),
        prodotti: dati.prodotti, spesa: dati.spesa,
        impostazioni: { giorniPreavviso: impostazioni.giorniPreavviso, orario: impostazioni.orario, tema: impostazioni.tema }
      }, null, 2);
    },
    importa(testo) {
      let j;
      try { j = JSON.parse(testo); } catch (e) { throw new Error('Il file non e\' un JSON valido.'); }
      if (!j || j.app !== 'MangiamiPrima' || !Array.isArray(j.prodotti) || !Array.isArray(j.spesa)) {
        throw new Error('Il file non sembra un salvataggio di Mangiami Prima.');
      }
      carica();
      dati = normalizzaDati({ prodotti: j.prodotti, spesa: j.spesa });
      if (j.impostazioni) {
        impostazioni = normalizzaImpostazioni(Object.assign({}, impostazioni, j.impostazioni, { ultimaNotifica: '' }));
        scrivi(CHIAVE_IMPOSTAZIONI, impostazioni);
      }
      salvaDati();
      return { prodotti: dati.prodotti.length, spesa: dati.spesa.length };
    }
  };

  /* ---------- Corrispondenza ingredienti (port di CorrispondenzaIngredienti.cs) ---------- */
  const PAROLE_VUOTE = new Set(['di', 'da', 'del', 'dei', 'della', 'delle', 'degli', 'dello', 'al', 'alla', 'alle', 'ai',
    'con', 'senza', 'per', 'in', 'su', 'e', 'a', 'il', 'lo', 'la', 'le', 'i', 'gli', 'un', 'una', 'uno']);

  function radici(testo) {
    const r = new Set();
    const norm = String(testo).normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC').toLowerCase();
    let parola = '';
    const chiudi = () => {
      if (!parola) return;
      let t = parola;
      parola = '';
      if (PAROLE_VUOTE.has(t)) return;
      if (t.length >= 4 && 'aeio'.includes(t[t.length - 1])) t = t.slice(0, -1);
      r.add(t);
    };
    for (const c of norm) {
      if (/\p{L}/u.test(c)) parola += c; else chiudi();
    }
    chiudi();
    return r;
  }
  const sottoinsieme = (a, b) => { for (const x of a) if (!b.has(x)) return false; return true; };
  function corrisponde(rp, ri) {
    if (rp.size === 0 || ri.size === 0) return false;
    return sottoinsieme(ri, rp) || sottoinsieme(rp, ri);
  }
  MP.ingredienti = { radici, corrisponde };
})();
