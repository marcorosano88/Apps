/* Gestione Orto PWA - sincronizzazione dei dati tra dispositivi.
   Tutto il database dell'app (senza meteo in cache e senza tema/notifiche del singolo dispositivo) sta su una riga di Supabase
   (tabella sync_orto, vedi _backend-supabase/04-sincronizzazione.sql) identificata da un "codice di sincronizzazione" casuale.
   Dispositivi con lo stesso codice usano gli stessi dati. Scrittura ottimistica con numero di versione: se due dispositivi
   hanno modificato i dati prima di sincronizzarsi, l'utente sceglie quale versione tenere (niente unione automatica).
   Va caricato DOPO push.js (usa GO.supabase e si aggancia a S.onChange). Solo build moderna (js/), non js/legacy/. */
(function () {
  'use strict';
  const GO = window.GO;
  const { S, UI } = GO;

  const CH = {
    codice: 'gestioneorto.sync.codice',       // UUID segreto che identifica i dati sul server
    versione: 'gestioneorto.sync.versione',   // versione del server che questo dispositivo ha visto per ultima
    daInviare: 'gestioneorto.sync.daInviare', // '1' = ci sono modifiche locali non ancora inviate
    ultimo: 'gestioneorto.sync.ultimo',       // ultimo scambio riuscito (ISO)
  };
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const INVIO_DOPO_MS = 3000;       // raggruppa modifiche ravvicinate
  const CONTROLLO_VISIBILE_MS = 15000;
  const CONTROLLO_PERIODICO_MS = 120000;
  const RIMANDA_CONFLITTO_MS = 10 * 60000; // dopo «Decido dopo» non richiede la scelta per 10 minuti

  const leggi = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const scrivi = (k, v) => { try { localStorage.setItem(k, String(v)); } catch (e) { /* ignora */ } };
  const togli = (k) => { try { localStorage.removeItem(k); } catch (e) { /* ignora */ } };

  const codice = () => { const c = leggi(CH.codice); return c && UUID_RE.test(c) ? c.toLowerCase() : null; };
  const versione = () => Number(leggi(CH.versione)) || 0;
  const daInviare = () => leggi(CH.daInviare) === '1';
  const nuovoCodice = () => (crypto.randomUUID ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15); return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); }));

  let applicando = false;   // true mentre si scrivono i dati arrivati dal server: non vanno rimandati indietro
  let modifiche = 0;        // contatore: una modifica fatta durante un invio non deve cancellare il segno «da inviare»
  let timer = null;
  let ultimoControllo = 0;
  let rimandaFino = 0;
  let stato = { tipo: 'spento', dettaglio: '' };

  const quando = () => {
    const u = leggi(CH.ultimo);
    if (!u) return '';
    const d = new Date(u);
    const hm = d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    return d.toDateString() === new Date().toDateString() ? `oggi alle ${hm}` : `il ${d.toLocaleDateString('it-IT', { day: 'numeric', month: 'numeric' })} alle ${hm}`;
  };
  const testoStato = () => {
    switch (stato.tipo) {
      case 'ok': return `✅ Sincronizzato${quando() ? ` (${quando()})` : ''}`;
      case 'invio': return '⏳ Sincronizzazione in corso…';
      case 'attesa': return '⏳ Modifiche da inviare…';
      case 'offline': return '📴 Server non raggiungibile: le modifiche saranno inviate appena possibile.';
      case 'errore': return `⚠️ Sincronizzazione non riuscita: ${stato.dettaglio}`;
      case 'conflitto': return '⚠️ Dati diversi su due dispositivi: scegli quale versione tenere («Sincronizza ora»).';
      default: return '';
    }
  };
  const imposta = (tipo, dettaglio) => {
    stato = { tipo, dettaglio: dettaglio || '' };
    if (GO.sync && GO.sync.alCambioStato) { try { GO.sync.alCambioStato(testoStato()); } catch (e) { /* la vista non c'è più */ } }
  };
  const errore = (e) => {
    console.warn('Sincronizzazione non riuscita:', e);
    if (!e.http) imposta('offline'); else imposta('errore', e.message);
  };

  async function rpc(nome, corpo) {
    const { url, key } = GO.supabase;
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 25000);
    try {
      const r = await fetch(`${url}/rest/v1/rpc/${nome}`, { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify(corpo), signal: ctl.signal });
      const testo = await r.text();
      if (!r.ok) { const e = new Error(`${nome}: HTTP ${r.status} ${testo.slice(0, 200)}`); e.http = r.status; throw e; }
      return testo ? JSON.parse(testo) : null;
    } finally { clearTimeout(t); }
  }

  // Un'operazione alla volta (invio, controllo, scelta del conflitto)
  let coda = Promise.resolve();
  const serializza = (fn) => { const p = coda.then(fn).catch((e) => console.warn('Sincronizzazione:', e)); coda = p; return p; };

  /** Fa sapere al server dei promemoria (push.js) che il codice è cambiato: serve al meteo in background. */
  const avvisaPush = () => { if (GO.push && GO.push.sincronizza) GO.push.sincronizza(); };

  const scollegaLocale = () => {
    clearTimeout(timer);
    [CH.codice, CH.versione, CH.daInviare, CH.ultimo].forEach(togli);
    imposta('spento');
    avvisaPush();
  };

  /** Applica i dati scaricati dal server (sostituisce quelli locali). */
  function applica(r) {
    applicando = true;
    try { S.applicaRemoto(r.dati); } finally { applicando = false; }
    scrivi(CH.versione, r.versione);
    scrivi(CH.daInviare, '0');
    scrivi(CH.ultimo, new Date().toISOString());
    imposta('ok');
    if (GO.applicaTema) GO.applicaTema();
  }

  async function scaricaDati() {
    const righe = await rpc('sync_leggi', { p_codice: codice() });
    const r = righe && righe[0];
    if (!r) { await conflitto(0); return; }
    applica(r);
    UI.toast('Dati aggiornati da un altro dispositivo');
  }

  /** vr = versione attuale sul server (0 = i dati sul server non esistono più). */
  async function conflitto(vr) {
    imposta('conflitto');
    if (Date.now() < rimandaFino) return;
    if (vr === 0) {
      const s = await UI.sheet('I dati sul server non ci sono più', [
        { label: 'Ricarica i dati di questo dispositivo sul server', value: 'carica', sub: 'Rimette online quello che vedi qui.' },
        { label: 'Scollega questo dispositivo', value: 'scollega', sub: 'Tiene i dati qui e smette di sincronizzare.' },
      ], { cancel: 'Decido dopo' });
      if (s === 'carica') { scrivi(CH.versione, 0); scrivi(CH.daInviare, '1'); await invia(); }
      else if (s === 'scollega') scollegaLocale();
      else rimandaFino = Date.now() + RIMANDA_CONFLITTO_MS;
      return;
    }
    const s = await UI.sheet('Dati modificati su un altro dispositivo', [
      { label: 'Tieni i dati di questo dispositivo', value: 'miei', sub: 'Sostituiscono quelli sul server e sull\'altro dispositivo.' },
      { label: 'Usa i dati dell\'altro dispositivo', value: 'altri', danger: true, sub: 'Le modifiche fatte qui dopo l\'ultima sincronizzazione andranno perse.' },
    ], { cancel: 'Decido dopo' });
    if (s === 'miei') { scrivi(CH.versione, vr); scrivi(CH.daInviare, '1'); await invia(); }
    else if (s === 'altri') await scaricaDati();
    else rimandaFino = Date.now() + RIMANDA_CONFLITTO_MS;
  }

  /** Invia i dati locali se ci sono modifiche da inviare. */
  async function invia() {
    const c = codice();
    if (!c || !daInviare()) return;
    const n = modifiche;
    const dati = S.snapshot();
    imposta('invio');
    try {
      const r = await rpc('sync_scrivi', { p_codice: c, p_dati: dati, p_base: versione() });
      if (!r) { const e = new Error('sync_scrivi: risposta vuota'); e.http = 500; throw e; }
      if (r.ok) {
        scrivi(CH.versione, r.versione);
        scrivi(CH.ultimo, new Date().toISOString());
        if (n === modifiche) { scrivi(CH.daInviare, '0'); imposta('ok'); } else { imposta('attesa'); programma(); }
      } else await conflitto(r.versione);
    } catch (e) { errore(e); }
  }

  /** Confronta la versione locale con quella del server: invia, scarica o chiede cosa tenere. */
  async function controlla() {
    const c = codice();
    if (!c || Date.now() < rimandaFino) return;
    try {
      const vr = await rpc('sync_versione', { p_codice: c });
      ultimoControllo = Date.now();
      const locale = versione();
      if (vr === null || vr === undefined) {
        if (locale === 0) { await invia(); return; } // primo invio ancora da fare (era offline)
        await conflitto(0); return;
      }
      if (vr === locale) {
        if (daInviare()) await invia(); else { scrivi(CH.ultimo, new Date().toISOString()); imposta('ok'); }
        return;
      }
      if (vr > locale && !daInviare()) { if (!GO.formAttivo) await scaricaDati(); return; }
      await conflitto(vr); // il server è avanti e qui ci sono modifiche non inviate (o la versione non torna)
    } catch (e) { errore(e); }
  }

  function programma() {
    clearTimeout(timer);
    timer = setTimeout(() => serializza(invia), INVIO_DOPO_MS);
  }

  // ---------------------------------------------------------------------
  // Interfaccia per le Impostazioni
  // ---------------------------------------------------------------------
  /** Crea un nuovo codice e carica i dati di questo dispositivo. true se l'invio è riuscito subito. */
  async function attiva() {
    if (codice()) return true;
    scrivi(CH.codice, nuovoCodice());
    scrivi(CH.versione, 0);
    scrivi(CH.daInviare, '1');
    modifiche++;
    await serializza(invia);
    avvisaPush();
    return stato.tipo === 'ok';
  }

  /** Collega questo dispositivo ai dati di un altro. conferma(info) è chiamata se qui ci sono già dati che verrebbero sostituiti. */
  async function collega(testo, conferma) {
    const c = String(testo || '').trim().toLowerCase();
    if (!UUID_RE.test(c)) return { ok: false, errore: 'Il codice non è valido: ha la forma xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.' };
    try {
      const righe = await rpc('sync_leggi', { p_codice: c });
      const r = righe && righe[0];
      if (!r) return { ok: false, errore: 'Codice non trovato sul server.' };
      if (!S.senzaDati() && conferma && !(await conferma({ orti: (r.dati.orti || []).length, verdure: (r.dati.coltivazioni || []).length }))) return { ok: false, annullato: true };
      applica(r);
      scrivi(CH.codice, c); // dopo applica(): il codice serve solo da ora in poi
      scrivi(CH.versione, r.versione);
      scrivi(CH.daInviare, '0');
      imposta('ok');
      avvisaPush();
      return { ok: true };
    } catch (e) { return { ok: false, errore: e.http ? e.message : 'Server non raggiungibile: riprova con la connessione attiva.' }; }
  }

  /** Smette di sincronizzare questo dispositivo; con elimina cancella anche i dati dal server (gli altri dispositivi perdono il collegamento). */
  async function scollega(elimina) {
    const c = codice();
    if (elimina && c) {
      try { await rpc('sync_elimina', { p_codice: c }); } catch (e) { return { ok: false, errore: e.http ? e.message : 'Server non raggiungibile: riprova con la connessione attiva.' }; }
    }
    scollegaLocale();
    return { ok: true };
  }

  const sincronizzaOra = () => { rimandaFino = 0; return serializza(controlla); };

  GO.sync = { attivo: () => !!codice(), codice, testo: testoStato, attiva, collega, scollega, sincronizzaOra, alCambioStato: null };

  // Ogni modifica ai dati segna «da inviare» e programma l'invio
  const precedente = S.onChange;
  S.onChange = () => {
    if (precedente) precedente();
    if (applicando || !codice()) return;
    modifiche++;
    scrivi(CH.daInviare, '1');
    imposta('attesa');
    programma();
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && codice() && Date.now() - ultimoControllo > CONTROLLO_VISIBILE_MS) serializza(controlla);
  });
  window.addEventListener('online', () => { if (codice()) serializza(controlla); });
  setInterval(() => {
    if (document.visibilityState === 'visible' && codice() && Date.now() - ultimoControllo > CONTROLLO_PERIODICO_MS) serializza(controlla);
  }, 30000);
  const avvia = () => { if (codice()) { imposta(daInviare() ? 'attesa' : 'ok'); serializza(controlla); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
})();
