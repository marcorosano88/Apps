/* Gestione Orto PWA - promemoria push: calcola i promemoria dei prossimi giorni (come l'app nativa, che li programma
   come notifiche locali) e li manda a Supabase, che li spedisce all'ora giusta anche con l'app chiusa.
   Va caricato DOPO app.js (si aggancia a S.onChange). */
(function () {
  'use strict';
  const GO = window.GO;
  const { L, S, net: ST, V } = GO;

  // --- Configurazione (vedi _backend-supabase/LEGGIMI.md) ---
  const PUSH_URL = 'https://cvonyqexrnwvebfxgdih.supabase.co'; // progetto Supabase di Gestione Orto (NON quello di Mangiami Prima)
  const PUSH_KEY = 'sb_publishable_L0QszZJh33AXcAk2SM2DJw_KNz6vfk-'; // chiave pubblica (anon)
  GO.supabase = { url: PUSH_URL, key: PUSH_KEY }; // usato anche da store.js per il servizio prezzi
  const VAPID_PUBBLICA = 'BLkxXKXkJdpcS5-ab3BBx3gzFlmCQkZBrcEZlHBnwYmCov1teb6Y9qBNeiDOtvruLY2n_BrHiWb0ySQt1EYBVuw'; // coppia propria di Gestione Orto

  const CH_ID = 'gestioneorto.push.id';
  const CH_ATTIVO = 'gestioneorto.push.attivo';
  const CH_DA_INVIARE = 'gestioneorto.push.daInviare';
  let timer = null;

  const leggi = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const scrivi = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } };

  const supportato = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const attivo = () => supportato() && leggi(CH_ATTIVO) === '1' && Notification.permission === 'granted';
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;

  function idDispositivo() {
    let id = leggi(CH_ID);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); });
      scrivi(CH_ID, id);
    }
    return id;
  }

  function chiaveDaBase64(b64) {
    const pad = '='.repeat((4 - (b64.length % 4)) % 4);
    const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(raw, (c) => c.charCodeAt(0));
  }

  async function rpc(nome, corpo) {
    const r = await fetch(`${PUSH_URL}/rest/v1/rpc/${nome}`, {
      method: 'POST', headers: { apikey: PUSH_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(corpo),
    });
    if (!r.ok) throw new Error(`${nome}: HTTP ${r.status} ${await r.text().catch(() => '')}`);
  }

  async function sottoscrizione(crea) {
    const reg = await navigator.serviceWorker.ready;
    const chiave = chiaveDaBase64(VAPID_PUBBLICA);
    let sub = await reg.pushManager.getSubscription();
    // Una sottoscrizione creata con un'altra chiave VAPID non e' piu' valida: va rifatta.
    if (sub && sub.options && sub.options.applicationServerKey) {
      const att = new Uint8Array(sub.options.applicationServerKey);
      if (att.length !== chiave.length || att.some((b, i) => b !== chiave[i])) { await sub.unsubscribe(); sub = null; }
    }
    if (!sub && crea) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chiave });
    return sub;
  }

  // ---------------------------------------------------------------------
  // Calcolo dei promemoria programmati
  // ---------------------------------------------------------------------
  /** Elenco { tag, quando (ISO UTC), titolo, testo } dei promemoria futuri, come li programmerebbe l'app nativa (calcolo in promemoria.js). */
  async function programmati() {
    const meteoDi = await ST.meteoPerOrti(S.orti(), false); // usa la cache se ha meno di un'ora
    return GO.programmati(meteoDi);
  }

  // ---------------------------------------------------------------------
  // Sincronizzazione con Supabase
  // ---------------------------------------------------------------------
  async function sincronizzaOra() {
    if (!attivo()) return;
    try {
      const sub = await sottoscrizione(true);
      await rpc('push_sincronizza',{ p_id: idDispositivo(), p_subscription: sub.toJSON(), p_promemoria: await programmati() });
      scrivi(CH_DA_INVIARE, '0');
      await sincronizzaPioggia(); // dopo: il dispositivo deve già esistere sul server
      await sincronizzaCollegamento();
    } catch (e) {
      console.warn('Sincronizzazione promemoria non riuscita:', e);
      scrivi(CH_DA_INVIARE, '1'); // riprova al ritorno della rete / alla prossima modifica
    }
  }

  /** Comunica al server i luoghi degli orti e la soglia di pioggia: il server controlla il meteo anche con l'app chiusa
      e manda «Sta piovendo?». Senza luoghi o con il controllo disattivato il server smette di controllare.
      Un errore qui (es. 03-pioggia.sql non ancora eseguito) non deve bloccare i promemoria normali. */
  async function sincronizzaPioggia() {
    try {
      const set = S.set();
      const luoghi = [], visti = new Set();
      if (set.pioggiaOraria && set.annAttiva) {
        for (const o of S.orti()) {
          const p = L.posizione(o);
          if (!p || visti.has(L.suffissoLuogo(p))) continue;
          visti.add(L.suffissoLuogo(p));
          luoghi.push({ nome: p.localita || '', lat: p.lat, lon: p.lon });
        }
      }
      await rpc('push_meteo', { p_id: idDispositivo(), p_luoghi: luoghi, p_soglia: luoghi.length ? Number(set.pioggiaSoglia) || 5 : null });
    } catch (e) { console.warn('Sincronizzazione avviso pioggia non riuscita:', e); }
  }

  /** Comunica al server il codice di sincronizzazione (se attiva) e il fuso orario: con i dati sul server la funzione
      «aggiorna-promemoria» ricalcola ogni 3 ore i promemoria con il meteo aggiornato, anche con l'app chiusa.
      Senza sincronizzazione il codice è null e il server non ricalcola nulla per questo dispositivo. Un errore qui
      (es. 05-meteo-background.sql non ancora eseguito) non deve bloccare i promemoria normali. */
  async function sincronizzaCollegamento() {
    try {
      const codice = GO.sync && GO.sync.attivo() ? GO.sync.codice() : null;
      let fuso = null;
      try { fuso = Intl.DateTimeFormat().resolvedOptions().timeZone || null; } catch (e) { /* lascia null: il server usa Europe/Rome */ }
      await rpc('push_collega_dati', { p_id: idDispositivo(), p_codice: codice, p_fuso: fuso });
    } catch (e) { console.warn('Collegamento dati per il meteo in background non riuscito:', e); }
  }

  /** Raggruppa modifiche ravvicinate in un solo invio. */
  function sincronizza() {
    if (!attivo()) return;
    clearTimeout(timer);
    timer = setTimeout(sincronizzaOra, 2500);
  }

  /** Dopo che l'utente ha concesso il permesso: registra il telefono e invia i promemoria. true se riuscito. */
  async function attiva() {
    if (!supportato() || Notification.permission !== 'granted') return false;
    scrivi(CH_ATTIVO, '1');
    await sincronizzaOra();
    return leggi(CH_DA_INVIARE) !== '1';
  }

  async function disattiva() {
    scrivi(CH_ATTIVO, '0');
    try {
      const sub = await sottoscrizione(false);
      if (sub) await sub.unsubscribe();
      await rpc('push_rimuovi',{ p_id: idDispositivo() });
    } catch (e) { console.warn('Disattivazione push:', e); }
  }

  GO.push = { supportato, attivo, attiva, disattiva, sincronizza, isIOS, standalone, programmati };

  // Ogni modifica ai dati o alle impostazioni ricalcola i promemoria (come RicalcolaAsync dell'app nativa)
  const precedente = S.onChange;
  S.onChange = () => { if (precedente) precedente(); sincronizza(); };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') sincronizza(); });
  window.addEventListener('online', () => { if (leggi(CH_DA_INVIARE) === '1') sincronizza(); });
  const avvia = () => { if (attivo()) sincronizza(); }; // rinnova anche la sottoscrizione ad ogni apertura
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
})();
