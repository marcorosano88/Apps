/* Gestione Orto PWA - promemoria push: calcola i promemoria dei prossimi giorni (come l'app nativa, che li programma
   come notifiche locali) e li manda a Supabase, che li spedisce all'ora giusta anche con l'app chiusa.
   Va caricato DOPO app.js (si aggancia a S.onChange). */
(function () {
  'use strict';
  const GO = window.GO;
  const { L, S, net: ST, V } = GO;

  // --- Configurazione (vedi _backend-supabase/LEGGIMI.md) ---
  const PUSH_URL = 'https://dqbqebrfwfbtqnvaejel.supabase.co'; // progetto Supabase con le tabelle orto_*
  const PUSH_KEY = 'sb_publishable_NvOCatNLryMZhvMJTW0VMA_FgQIJSTG'; // chiave pubblica (anon)
  const VAPID_PUBBLICA = 'BLkxXKXkJdpcS5-ab3BBx3gzFlmCQkZBrcEZlHBnwYmCov1teb6Y9qBNeiDOtvruLY2n_BrHiWb0ySQt1EYBVuw'; // coppia propria di Gestione Orto

  const GIORNI_AVANTI = 14; // come l'app nativa: annaffiatura, gelo, concimazione per i prossimi 14 giorni
  const GIORNI_RACCOLTA = 45; // raccolta e trapianto: piu' avanti, perche' sono eventi singoli
  const MAX_PROMEMORIA = 150;
  const ORA_GELO = '18:00'; // la sera prima della notte fredda, come l'app nativa

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
  const istante = (giorno, hhmm) => {
    const [h, m] = String(hhmm || '09:00').split(':').map(Number);
    return new Date(giorno.getFullYear(), giorno.getMonth(), giorno.getDate(), h || 0, m || 0, 0);
  };

  /** Elenco { tag, quando (ISO UTC), titolo, testo } dei promemoria futuri, come li programmerebbe l'app nativa. */
  async function programmati() {
    const set = S.set();
    const adesso = new Date();
    const oggi = L.today();
    const meteoDi = await ST.meteoPerOrti(S.orti(), false); // usa la cache se ha meno di un'ora
    const out = [];
    const aggiungi = (quando, tag, titolo, testo) => {
      if (quando <= adesso) return;
      out.push({ tag, quando: quando.toISOString(), titolo, testo });
    };
    const verdura = (a) => a.titolo.replace(/^\S+\s+\S+\s+/, '');
    const emoji = (a) => a.titolo.split(' ')[0];

    // Raccolta (N giorni prima) e trapianto (nel giorno): eventi singoli, uno per pianta
    const att = L.costruisciAttivita(S.db, oggi, meteoDi, set.annGiorni);
    if (set.promAttivo) {
      for (const a of att.filter((x) => x.tipo === 'raccogli')) {
        const giorno = L.add(a.data, -set.promGiorni);
        if (L.diff(giorno, oggi) > GIORNI_RACCOLTA) continue;
        const quanto = set.promGiorni === 0 ? 'oggi' : set.promGiorni === 1 ? 'domani' : `fra ${set.promGiorni} giorni`;
        aggiungi(istante(giorno, set.promOra), `racc-${a.coltId}-${L.iso(a.data)}`, `${emoji(a)} ${verdura(a)} quasi pronta`,
          `Raccolta stimata ${quanto} (${L.fmt(a.data)}) · ${a.posto}`);
      }
    }
    if (set.trapiantoAttivo) {
      for (const a of att.filter((x) => x.tipo === 'trapianta')) {
        if (L.diff(a.data, oggi) > GIORNI_RACCOLTA) continue;
        aggiungi(istante(a.data, set.promOra), `trap-${a.coltId}-${L.iso(a.data)}`, `${emoji(a)} ${verdura(a)} pronta da trapiantare`,
          `È il momento di trapiantare (${a.posto}).`);
      }
    }

    // Annaffiatura, concimazione e gelo: una notifica al giorno con l'elenco di quel giorno
    for (let i = 0; i < GIORNI_AVANTI; i++) {
      const giorno = L.add(oggi, i);
      const iso = L.iso(giorno);
      const avvisi = await V.calcolaAvvisi(meteoDi, giorno);
      const di = (icona) => avvisi.find((a) => a.icona === icona);
      const ann = di('💧'), conc = di('🧪'), gelo = di('❄️');
      if (ann) aggiungi(istante(giorno, set.annOra), `ann-${iso}`, '💧 Da annaffiare', ann.righe.join('\n'));
      if (conc) aggiungi(istante(giorno, set.promOra), `conc-${iso}`, '🧪 Da concimare', conc.righe.join('\n'));
      if (gelo) aggiungi(istante(giorno, ORA_GELO), `gelo-${iso}`, '❄️ Rischio gelo stanotte', `Domattina proteggi con tessuto non tessuto o un telo:\n${gelo.righe.join('\n')}`);
    }

    // Semina: il primo giorno dei prossimi 3 mesi
    if (set.seminaAttiva) {
      for (let k = 1; k <= 3; k++) {
        const primo = new Date(oggi.getFullYear(), oggi.getMonth() + k, 1);
        const sem = (await V.calcolaAvvisi(meteoDi, primo)).find((a) => a.icona === '🌱');
        if (sem) aggiungi(istante(primo, set.promOra), `sem-${L.iso(primo)}`, `🌱 ${sem.titolo}`, `${sem.righe.join('\n')}\nApri «Attività» → «Cosa seminare» per vedere dove.`);
      }
    }

    out.sort((a, b) => a.quando.localeCompare(b.quando));
    return out.slice(0, MAX_PROMEMORIA);
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
    } catch (e) {
      console.warn('Sincronizzazione promemoria non riuscita:', e);
      scrivi(CH_DA_INVIARE, '1'); // riprova al ritorno della rete / alla prossima modifica
    }
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
