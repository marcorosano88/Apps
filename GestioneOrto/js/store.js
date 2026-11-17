/* Gestione Orto PWA - persistenza locale (localStorage), operazioni sui dati e servizi di rete (meteo, città, prezzi). */
(function () {
  'use strict';
  const GO = window.GO;
  const D = GO.D;
  const L = GO.L;
  const S = (GO.S = {});
  const KEY = 'gestioneorto.dati.v1';

  const TABELLE = ['orti', 'coltivazioni', 'oggetti', 'letture', 'materiali', 'trattSolco', 'trattVerdura', 'raccolti', 'registro', 'abbinamenti', 'spese', 'prezzi'];
  S.SETTINGS_DEFAULT = {
    tema: 'auto', promAttivo: true, promGiorni: 2, promOra: '09:00', annAttiva: true, annGiorni: 3, annOra: '18:00',
    annIntelligente: true, pioggiaOraria: true, pioggiaSoglia: 5, geloAttivo: true, seminaAttiva: true, trapiantoAttivo: true,
    concimazioneAttiva: true, notificheBrowser: false, unitaPref: {},
  };

  const vuoto = () => {
    const d = { seq: 0, settings: Object.assign({}, S.SETTINGS_DEFAULT), meteo: {}, prezziAgg: {} };
    TABELLE.forEach((t) => (d[t] = []));
    return d;
  };
  const normalizza = (d) => {
    const v = vuoto();
    Object.keys(v).forEach((k) => { if (d && d[k] !== undefined) v[k] = d[k]; });
    v.settings = Object.assign({}, S.SETTINGS_DEFAULT, v.settings || {});
    TABELLE.forEach((t) => { if (!Array.isArray(v[t])) v[t] = []; });
    let max = 0;
    TABELLE.forEach((t) => v[t].forEach((r) => { if (r && r.id > max) max = r.id; }));
    v.seq = Math.max(v.seq || 0, max);
    return v;
  };

  S.db = vuoto();
  S.erroreSalvataggio = null;
  S.load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      S.db = normalizza(raw ? JSON.parse(raw) : null);
    } catch (e) { S.db = vuoto(); }
    return S.db;
  };
  let timer = null;
  S.salvaOra = () => {
    clearTimeout(timer);
    try { localStorage.setItem(KEY, JSON.stringify(S.db)); S.erroreSalvataggio = null; return true; }
    catch (e) { S.erroreSalvataggio = 'Impossibile salvare i dati: spazio esaurito o archivio non disponibile. Esporta un backup.'; return false; }
  };
  S.save = () => { S.salvaOra(); if (S.onChange) S.onChange(); };
  window.addEventListener('pagehide', () => S.salvaOra());
  window.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') S.salvaOra(); });

  S.id = () => ++S.db.seq;
  S.set = () => S.db.settings;
  const byId = (t, id) => S.db[t].find((x) => x.id === id) || null;
  S.get = byId;

  // ---------- Orti ----------
  S.orto = (id) => byId('orti', id);
  S.orti = () => L.sortBy(S.db.orti, (o) => o.nome.toLowerCase());
  S.addOrto = (o) => { o.id = S.id(); S.db.orti.push(o); S.save(); return o; };
  S.updateOrto = () => S.save();
  S.deleteOrto = (id) => {
    const oggIds = new Set(S.db.oggetti.filter((o) => o.ortoId === id).map((o) => o.id));
    S.db.coltivazioni = S.db.coltivazioni.filter((c) => c.ortoId !== id);
    S.db.oggetti = S.db.oggetti.filter((o) => o.ortoId !== id);
    S.db.letture = S.db.letture.filter((x) => !oggIds.has(x.oggettoId));
    S.db.materiali = S.db.materiali.filter((x) => !oggIds.has(x.oggettoId));
    S.db.registro = S.db.registro.filter((x) => !oggIds.has(x.oggettoId));
    S.db.trattSolco = S.db.trattSolco.filter((t) => t.ortoId !== id);
    S.db.trattVerdura = S.db.trattVerdura.filter((t) => t.ortoId !== id);
    S.db.orti = S.db.orti.filter((o) => o.id !== id);
    S.save();
  };
  S.coltivazioni = (ortoId) => L.sortBy(S.db.coltivazioni.filter((c) => c.ortoId === ortoId), (c) => c.data).reverse();
  S.oggettiOrto = (ortoId) => S.db.oggetti.filter((o) => o.ortoId === ortoId);
  S.trattSolchi = (ortoId) => S.db.trattSolco.filter((t) => t.ortoId === ortoId);
  S.trattVerdure = (ortoId) => S.db.trattVerdura.filter((t) => t.ortoId === ortoId);
  S.raccoltiOrto = (ortoId) => S.db.raccolti.filter((r) => r.ortoId === ortoId);
  S.totaleSolchi = (ortoId) => L.totaleSolchi(S.orto(ortoId), S.db.coltivazioni.filter((c) => c.ortoId === ortoId), S.trattSolchi(ortoId));

  // ---------- Coltivazioni ----------
  S.newColt = (ortoId) => ({ id: 0, ortoId, verdura: '', tipologia: null, data: L.iso(L.today()), note: null, solco: null, distP: null, distS: null, oggettoId: null, ultimaAnn: null, quantita: null, trapiantata: false });
  S.addColt = (c) => { c.id = S.id(); S.db.coltivazioni.push(c); S.save(); return c; };
  S.updateColt = () => S.save();

  /** Annota nel posto da cui una verdura se ne va (per la rotazione). */
  const ricordaColturaRimossa = (colt) => {
    if (!colt || !L.famiglia(colt.verdura)) return;
    if (colt.oggettoId == null && !(colt.solco > 0)) return;
    const solco = colt.oggettoId == null ? colt.solco : 0;
    const ogg = colt.oggettoId == null ? null : colt.oggettoId;
    const gia = S.db.trattSolco.some((t) => t.ortoId === colt.ortoId && t.solco === solco && t.note === 'Coltura rimossa' && (t.oggettoId == null ? null : t.oggettoId) === ogg && t.data === colt.data && L.eq(t.sostanza, colt.verdura));
    if (gia) return;
    S.db.trattSolco.push({ id: S.id(), ortoId: colt.ortoId, solco, oggettoId: ogg, data: colt.data, sostanza: colt.verdura, note: 'Coltura rimossa' });
  };
  S.deleteColt = (id) => {
    const c = byId('coltivazioni', id);
    ricordaColturaRimossa(c);
    S.db.trattVerdura = S.db.trattVerdura.filter((t) => t.coltId !== id);
    S.db.coltivazioni = S.db.coltivazioni.filter((x) => x.id !== id);
    S.save();
  };
  S.annaffiaTutto = (ortoId) => {
    const oggi = L.iso(L.today());
    const v = S.db.coltivazioni.filter((c) => c.ortoId === ortoId);
    v.forEach((c) => (c.ultimaAnn = oggi));
    S.save();
    return v.length;
  };
  /** Pioggia confermata: segna annaffiate le verdure in piena terra e in aiuola rialzata. */
  S.segnaAnnaffiateDallaPioggia = (giorno, ortiIds) => {
    const g = L.iso(giorno);
    const aiuole = new Set(S.db.oggetti.filter((o) => o.tipo === D.AIUOLA).map((o) => o.id));
    const v = S.db.coltivazioni.filter((c) => (!ortiIds || ortiIds.includes(c.ortoId)) && c.data <= g && (c.oggettoId == null || aiuole.has(c.oggettoId)) && !(c.ultimaAnn && c.ultimaAnn >= g));
    v.forEach((c) => (c.ultimaAnn = g));
    S.save();
    return v.length;
  };
  S.trapianta = (coltId, ortoId, solco, oggettoId, nota, quantita) => {
    const colt = byId('coltivazioni', coltId);
    if (!colt) return;
    const presente = S.db.coltivazioni.find((x) => x.ortoId === ortoId && x.id !== coltId && (x.oggettoId == null ? null : x.oggettoId) === (oggettoId == null ? null : oggettoId)
      && (oggettoId != null || x.solco === solco) && L.eq(x.verdura, colt.verdura));
    const da = colt.oggettoId != null ? byId('oggetti', colt.oggettoId) : null;
    const daVaschetta = da && L.tipo(da.tipo).conAlveoli;
    if (presente) {
      const spostate = quantita != null && quantita < L.piantine(colt) ? quantita : L.piantine(colt);
      presente.quantita = L.piantine(presente) + spostate;
      if (spostate < L.piantine(colt)) { colt.quantita = L.piantine(colt) - spostate; S.save(); return; }
      if (!daVaschetta) ricordaColturaRimossa(colt);
      S.db.trattVerdura.forEach((t) => { if (t.coltId === coltId) { t.coltId = presente.id; t.ortoId = ortoId; } });
      S.db.raccolti.forEach((r) => { if (r.coltId === coltId) { r.coltId = presente.id; r.ortoId = ortoId; } });
      S.db.coltivazioni = S.db.coltivazioni.filter((x) => x.id !== coltId);
      S.save();
      return;
    }
    if (quantita != null && quantita < L.piantine(colt)) {
      colt.quantita = L.piantine(colt) - quantita;
      S.db.coltivazioni.push(Object.assign({}, colt, {
        id: S.id(), ortoId, solco, oggettoId, quantita, note: colt.note && colt.note.trim() ? `${colt.note.trim()}; ${nota}` : nota,
      }));
      S.save();
      return;
    }
    if (!daVaschetta) ricordaColturaRimossa(colt);
    const ortoPrima = colt.ortoId;
    colt.ortoId = ortoId; colt.solco = solco; colt.oggettoId = oggettoId;
    colt.note = colt.note && colt.note.trim() ? `${colt.note.trim()}; ${nota}` : nota;
    if (ortoPrima !== ortoId) {
      S.db.trattVerdura.forEach((t) => { if (t.coltId === coltId) t.ortoId = ortoId; });
      S.db.raccolti.forEach((r) => { if (r.coltId === coltId) r.ortoId = ortoId; });
    }
    S.save();
  };

  // ---------- Solchi ----------
  S.inserisciSolco = (ortoId, posizione, totaleAttuale) => {
    S.db.coltivazioni.forEach((c) => { if (c.ortoId === ortoId && c.oggettoId == null && c.solco >= posizione) c.solco++; });
    S.orto(ortoId).solchi = totaleAttuale + 1;
    S.db.trattSolco.forEach((t) => { if (t.ortoId === ortoId && t.solco >= posizione) t.solco++; });
    S.db.oggetti.forEach((o) => { if (o.ortoId === ortoId && o.dopoSolco != null && o.dopoSolco >= posizione) o.dopoSolco++; });
    S.save();
  };
  const verdureNelSolco = (ortoId, solco) => S.db.coltivazioni.filter((x) => x.ortoId === ortoId && x.oggettoId == null && x.solco === solco);
  const storicoSolco = (ortoId, solco) => S.db.trattSolco.filter((t) => t.ortoId === ortoId && t.oggettoId == null && t.solco === solco);
  S.anteprimaRimozioneSolco = (ortoId, solco) => {
    const orto = S.orto(ortoId);
    if (!orto) throw new Error('Orto non trovato.');
    if (L.isBalcone(orto)) throw new Error('Un orto su balcone non ha solchi.');
    const totale = S.totaleSolchi(ortoId);
    if (solco < 1 || solco > totale) throw new Error(`Il solco deve essere compreso fra 1 e ${totale}.`);
    const storico = storicoSolco(ortoId, solco);
    const prima = L.uniqueCI(verdureNelSolco(ortoId, solco - 1).map((v) => v.verdura));
    const dopo = L.uniqueCI(verdureNelSolco(ortoId, solco + 1).map((v) => v.verdura));
    const vicini = [];
    for (const a of prima) for (const b of dopo)
      if (!L.eq(a, b) && L.valuta(a, b, S.db.abbinamenti) < 0) vicini.push(`${a} (solco ${solco - 1}) e ${b} (solco ${solco + 1}) diventeranno vicini: abbinamento sconsigliato.`);
    return {
      verdure: verdureNelSolco(ortoId, solco).map((v) => v.verdura),
      concimi: storico.filter((t) => t.note !== 'Coltura rimossa').length,
      colture: storico.filter((t) => t.note === 'Coltura rimossa').length,
      nuoviVicini: vicini, passaggioPossibile: solco > 1 && solco < totale,
    };
  };
  const nomeLibero = (ortoId, base) => {
    const usati = new Set(S.db.oggetti.filter((o) => o.ortoId === ortoId).map((o) => o.nome.toLowerCase()));
    let n = 1;
    while (usati.has(`${base} ${n}`.toLowerCase())) n++;
    return `${base} ${n}`;
  };
  /** sostituzione: 'nessuna' | 'aiuola' | 'passaggio' */
  S.rimuoviSolco = (ortoId, solco, sostituzione, eliminaVerdure) => {
    S.anteprimaRimozioneSolco(ortoId, solco); // validazioni
    const orto = S.orto(ortoId);
    const totale = S.totaleSolchi(ortoId);
    if (sostituzione === 'passaggio' && (solco === 1 || solco === totale)) throw new Error('Un passaggio sta fra due solchi: non può sostituire il primo o l\'ultimo.');
    const verdure = verdureNelSolco(ortoId, solco);
    if (verdure.length > 0 && sostituzione !== 'aiuola' && !eliminaVerdure) throw new Error(`Il solco ${solco} contiene ${verdure.length} verdure: confermare l'eliminazione o sostituirlo con un'aiuola rialzata.`);
    const storico = storicoSolco(ortoId, solco);
    if (sostituzione === 'aiuola') {
      const a = { id: S.id(), ortoId, tipo: D.AIUOLA, nome: nomeLibero(ortoId, L.tipoBase(L.tipo(D.AIUOLA))), data: L.iso(L.today()), note: null, dopoSolco: solco === totale ? null : solco - 1, alveoli: null, profCm: null };
      S.db.oggetti.push(a);
      verdure.forEach((v) => { v.solco = null; v.oggettoId = a.id; });
      storico.forEach((t) => { t.solco = 0; t.oggettoId = a.id; });
    } else {
      const ids = new Set(verdure.map((v) => v.id));
      S.db.trattVerdura = S.db.trattVerdura.filter((t) => !ids.has(t.coltId));
      S.db.coltivazioni = S.db.coltivazioni.filter((c) => !ids.has(c.id));
      const sid = new Set(storico.map((t) => t.id));
      S.db.trattSolco = S.db.trattSolco.filter((t) => !sid.has(t.id));
    }
    S.db.coltivazioni.forEach((c) => { if (c.ortoId === ortoId && c.oggettoId == null && c.solco > solco) c.solco--; });
    S.db.trattSolco.forEach((t) => { if (t.ortoId === ortoId && t.oggettoId == null && t.solco > solco) t.solco--; });
    S.db.oggetti.forEach((o) => { if (o.ortoId === ortoId && o.dopoSolco != null && o.dopoSolco >= solco) o.dopoSolco--; });
    const nuovo = totale - 1;
    orto.solchi = nuovo > 0 ? nuovo : null;
    // passaggi: via quelli di testa/coda e i doppioni
    let passaggi = S.db.oggetti.filter((o) => o.ortoId === ortoId && o.tipo === D.PASSAGGIO && o.dopoSolco != null);
    const via = new Set(passaggi.filter((p) => p.dopoSolco < 1 || p.dopoSolco >= nuovo).map((p) => p.id));
    passaggi = passaggi.filter((p) => !via.has(p.id));
    const visti = new Set();
    passaggi.slice().sort((a, b) => a.id - b.id).forEach((p) => { if (visti.has(p.dopoSolco)) via.add(p.id); else visti.add(p.dopoSolco); });
    if (sostituzione === 'passaggio' && !visti.has(solco - 1))
      S.db.oggetti.push({ id: S.id(), ortoId, tipo: D.PASSAGGIO, nome: 'Passaggio', data: L.iso(L.today()), note: null, dopoSolco: solco - 1, alveoli: null, profCm: null });
    S.db.oggetti = S.db.oggetti.filter((o) => !via.has(o.id));
    S.save();
  };

  // ---------- Oggetti ----------
  S.addOggetto = (o) => { o.id = S.id(); S.db.oggetti.push(o); S.save(); return o; };
  S.deleteOggetto = (id) => {
    S.db.oggetti = S.db.oggetti.filter((o) => o.id !== id);
    S.db.letture = S.db.letture.filter((x) => x.oggettoId !== id);
    S.db.materiali = S.db.materiali.filter((x) => x.oggettoId !== id);
    S.db.registro = S.db.registro.filter((x) => x.oggettoId !== id);
    S.db.trattSolco = S.db.trattSolco.filter((t) => t.oggettoId !== id);
    S.save();
  };
  S.addRiga = (tabella, riga) => { riga.id = S.id(); S.db[tabella].push(riga); S.save(); return riga; };
  S.delRiga = (tabella, id) => { S.db[tabella] = S.db[tabella].filter((x) => x.id !== id); S.save(); };

  // ---------- Backup ----------
  S.esporta = () => {
    const copia = Object.assign({}, S.db, { meteo: {} });
    return JSON.stringify({ app: 'gestione-orto-pwa', versione: 1, esportato: new Date().toISOString(), dati: copia }, null, 1);
  };
  S.importa = (testo) => {
    const j = JSON.parse(testo);
    const dati = j && j.dati ? j.dati : j;
    if (!dati || !Array.isArray(dati.orti) || !Array.isArray(dati.coltivazioni)) throw new Error('Il file non contiene dati di Gestione Orto.');
    S.db = normalizza(dati);
    S.save();
  };
  S.azzera = () => { S.db = vuoto(); S.save(); };

  // ---------- Rete: meteo, città, quota, prezzi ----------
  const ST = (GO.net = {});
  const conTimeout = async (url, ms = 9000) => {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), ms);
    try {
      const r = await fetch(url, { signal: ctl.signal });
      return r;
    } finally { clearTimeout(t); }
  };
  ST.online = () => navigator.onLine !== false;

  const analizza = (json, scaricata) => {
    if (!json) return null;
    const j = typeof json === 'string' ? JSON.parse(json) : json;
    const d = j.daily;
    if (!d || !d.time) return null;
    const giorni = d.time.map((t, i) => ({
      data: L.parse(t),
      tMax: typeof d.temperature_2m_max[i] === 'number' ? d.temperature_2m_max[i] : 20,
      pioggia: typeof d.precipitation_sum[i] === 'number' ? d.precipitation_sum[i] : 0,
      tMin: d.temperature_2m_min && typeof d.temperature_2m_min[i] === 'number' ? d.temperature_2m_min[i] : 20,
    }));
    return { scaricata: new Date(scaricata), giorni };
  };
  ST.leggiCache = (pos) => {
    try {
      const c = S.db.meteo[L.suffissoLuogo(pos)];
      if (!c || Date.now() - c.ts > 3 * 86400000) return null;
      return analizza(c.json, c.ts);
    } catch (e) { return null; }
  };
  ST.ultimoAggiornamento = (pos) => { const c = S.db.meteo[L.suffissoLuogo(pos)]; return c ? new Date(c.ts) : null; };
  /** Scarica le previsioni se la cache ha più di un'ora (o con forza). Offline resta la cache. */
  ST.previsione = async (pos, forza) => {
    const cache = ST.leggiCache(pos);
    if (!forza && cache && Date.now() - cache.scaricata.getTime() < 3600000) return cache;
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=8&timezone=auto`;
      const r = await conTimeout(url);
      if (!r.ok) return cache;
      const json = await r.json();
      const nuova = analizza(json, Date.now());
      if (!nuova || !nuova.giorni.length) return cache;
      S.db.meteo[L.suffissoLuogo(pos)] = { json, ts: Date.now() };
      S.salvaOra();
      return nuova;
    } catch (e) { return cache; }
  };
  /** Previsioni di ogni luogo degli orti (una volta per luogo): Map suffisso -> previsione|null */
  ST.meteoPerOrti = async (orti, forza) => {
    const m = new Map();
    for (const o of orti) {
      const p = L.posizione(o);
      if (!p) continue;
      const k = L.suffissoLuogo(p);
      if (!m.has(k)) m.set(k, await ST.previsione(p, forza));
    }
    return (orto) => { const p = L.posizione(orto); return p ? m.get(L.suffissoLuogo(p)) || null : null; };
  };
  ST.pioggiaOraria = async (pos) => {
    try {
      const r = await conTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lon}&hourly=precipitation&past_days=1&forecast_days=1&timezone=auto`);
      if (!r.ok) return null;
      const j = await r.json();
      const ore = j.hourly.time, mm = j.hourly.precipitation;
      const adesso = new Date();
      let ieri = 0, oggi = 0, piove = false;
      const oggiS = L.iso(adesso), ieriS = L.iso(L.add(adesso, -1));
      for (let i = 0; i < ore.length; i++) {
        const ora = new Date(ore[i]);
        if (typeof mm[i] === 'number' && mm[i] > 0 && ora > new Date(adesso.getTime() - 3600000) && ora <= new Date(adesso.getTime() + 3600000 - adesso.getMinutes() * 60000 - adesso.getSeconds() * 1000)) piove = true;
        if (ora > adesso || typeof mm[i] !== 'number') continue;
        if (ore[i].slice(0, 10) === oggiS) oggi += mm[i]; else if (ore[i].slice(0, 10) === ieriS) ieri += mm[i];
      }
      return { ieri, oggi, piove };
    } catch (e) { return null; }
  };
  ST.altitudine = async (lat, lon) => {
    try {
      const r = await conTimeout(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`, 8000);
      const j = await r.json();
      return j.elevation && typeof j.elevation[0] === 'number' ? j.elevation[0] : null;
    } catch (e) { return null; }
  };
  /** Cerca città per nome (Open-Meteo geocoding): elenco di {nome, lat, lon, alt, desc} o lancia un errore. */
  ST.cercaCitta = async (nome) => {
    const r = await conTimeout(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nome)}&count=6&language=it&format=json`);
    if (!r.ok) throw new Error('Ricerca non riuscita.');
    const j = await r.json();
    return (j.results || []).map((x) => ({
      nome: x.name, lat: x.latitude, lon: x.longitude, alt: typeof x.elevation === 'number' ? x.elevation : null,
      desc: [x.name, x.admin1, x.country].filter(Boolean).join(', '),
    }));
  };
  ST.posizioneAttuale = () => new Promise((res, rej) => {
    if (!navigator.geolocation) return rej(new Error('Il dispositivo non supporta la geolocalizzazione.'));
    navigator.geolocation.getCurrentPosition(
      async (p) => {
        let localita = null;
        try {
          const r = await conTimeout(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=it&lat=${p.coords.latitude}&lon=${p.coords.longitude}`, 7000);
          const j = await r.json();
          const a = j.address || {};
          localita = a.city || a.town || a.village || a.municipality || a.county || null;
        } catch (e) { /* il nome è solo un di più */ }
        res({ lat: p.coords.latitude, lon: p.coords.longitude, localita: localita || 'Posizione attuale', alt: typeof p.coords.altitude === 'number' ? p.coords.altitude : null });
      },
      (err) => rej(new Error(err.code === 1 ? 'Permesso di posizione negato.' : 'Posizione non disponibile.')),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 }
    );
  });

  // Prezzi di mercato (Agri-food data portal UE). Se il portale non è raggiungibile resta quanto già salvato.
  ST.prezziDaAggiornare = (anno) => {
    const ts = S.db.prezziAgg[anno];
    if (!ts) return true;
    if (anno < new Date().getFullYear() && new Date(ts).getFullYear() > anno) return false;
    return Date.now() - ts > 3 * 86400000;
  };
  ST.scaricaPrezzi = async (anno) => {
    try {
      const prodotti = Array.from(new Set(Object.values(D.PRODOTTI_PREZZI))).join(',');
      const r = await conTimeout(`https://api.tech.ec.europa.eu/agrifood/api/fruitAndVegetable/pricesSupplyChain?memberStateCodes=IT&years=${anno}&products=${encodeURIComponent(prodotti)}`, 40000);
      if (r.status === 429) return 'Servizio prezzi momentaneamente al limite delle richieste: riprova più tardi.';
      if (r.status !== 404 && !r.ok) return `Il servizio prezzi ha risposto ${r.status}.`;
      const nuovi = r.status === 404 ? [] : interpretaPrezzi(await r.json());
      S.db.prezzi = S.db.prezzi.filter((p) => L.parse(p.inizio).getFullYear() !== anno).concat(nuovi);
      S.db.prezziAgg[anno] = Date.now();
      S.save();
      return null;
    } catch (e) {
      return 'Servizio prezzi non raggiungibile: controlla la connessione.';
    }
  };
  const interpretaPrezzi = (arr) => {
    const t = (e, k) => (typeof e[k] === 'string' ? e[k] : '');
    const dIso = (s) => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s); return m ? `${m[3]}-${m[2]}-${m[1]}` : null; };
    const grezzi = [];
    for (const e of arr) {
      if (t(e, 'productStage') !== 'Ex-packaging station price' || t(e, 'unit') !== '€/100Kg') continue;
      const varieta = t(e, 'variety');
      const verdura = Object.keys(D.PRODOTTI_PREZZI).find((k) => varieta.toLowerCase().startsWith(D.PRODOTTI_PREZZI[k].toLowerCase()));
      if (!verdura) continue;
      const p = parseFloat(t(e, 'price').replace('€', '').trim());
      const ini = dIso(t(e, 'beginDate')), fin = dIso(t(e, 'endDate'));
      if (isNaN(p) || !ini || !fin) continue;
      grezzi.push({ verdura, ini, fin, tutte: varieta.toLowerCase().includes('all types and varieties'), p: p / 100 });
    }
    const gruppi = new Map();
    grezzi.forEach((g) => { const k = `${g.verdura}|${g.ini}|${g.fin}`; if (!gruppi.has(k)) gruppi.set(k, []); gruppi.get(k).push(g); });
    return Array.from(gruppi.values()).map((g) => {
      const sc = g.some((x) => x.tutte) ? g.filter((x) => x.tutte) : g;
      return { verdura: g[0].verdura, inizio: g[0].ini, fine: g[0].fin, euroKg: sc.reduce((s, x) => s + x.p, 0) / sc.length };
    });
  };
})();
