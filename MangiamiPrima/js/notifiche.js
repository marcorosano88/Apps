/* Mangiami Prima - notifiche di scadenza (Notification API + service worker) e banner in-app. */
(function () {
  'use strict';
  const MP = (window.MP = window.MP || {});

  const standalone = () =>
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  /** Stato: 'non-supportato' | 'serve-installazione' (iOS in Safari) | 'default' | 'granted' | 'denied' */
  function stato() {
    if (isIOS() && !standalone()) return 'serve-installazione';
    if (!('Notification' in window)) return 'non-supportato';
    return Notification.permission;
  }

  async function richiediPermesso() {
    if (!('Notification' in window)) return 'non-supportato';
    try {
      const p = await Notification.requestPermission();
      if (p === 'granted') {
        MP.store.impostaImpostazioni({ notifiche: true, ultimaNotifica: '' });
        await registraSincronizzazione();
        if (MP.push) await MP.push.attiva(); // push dal server: arriva anche ad app chiusa
        controlla();
      }
      return p;
    } catch (e) { return Notification.permission; }
  }

  /** Interruttore delle Impostazioni. true = accese, false = spente. Restituisce lo stato finale (true/false). */
  async function imposta(acceso) {
    if (acceso) {
      if (Notification.permission !== 'granted') {
        const p = await richiediPermesso(); // se concesso imposta gia' notifiche: true e attiva il push
        return p === 'granted';
      }
      MP.store.impostaImpostazioni({ notifiche: true, ultimaNotifica: '' });
      await registraSincronizzazione();
      if (MP.push) await MP.push.attiva();
      controlla();
      return true;
    }
    MP.store.impostaImpostazioni({ notifiche: false });
    if (MP.push) await MP.push.disattiva(); // annulla la sottoscrizione e cancella i dati dal server
    await salvaSnapshot();
    return false;
  }

  /* ---------- Testo ---------- */
  function testo(titoli, giorni) {
    const quando = giorni === 0 ? 'oggi' : giorni === 1 ? 'domani' : `tra ${giorni} giorni`;
    return titoli.length === 1 ? `${titoli[0]} scade ${quando}` : `${titoli.length} prodotti scadono ${quando}: ${titoli.join(', ')}`;
  }

  /** Prodotti che oggi vanno notificati: scadenza == oggi + giorni di preavviso (come PianificaAsync). */
  function daNotificareOggi() {
    const imp = MP.store.impostazioni();
    const bersaglio = MP.date.aggiungiGiorni(MP.date.oggi(), imp.giorniPreavviso);
    return MP.store.prodotti().filter((p) => p.dataScadenza === bersaglio).map((p) => p.titolo);
  }

  async function mostra(corpo) {
    const opzioni = { body: corpo, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'scadenza-' + MP.date.oggi(), lang: 'it' };
    try {
      const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
      if (reg) { await reg.showNotification('Mangiami Prima', opzioni); return true; }
      new Notification('Mangiami Prima', opzioni);
      return true;
    } catch (e) { return false; }
  }

  /** Se e' l'ora giusta e non e' gia' stato fatto oggi, mostra la notifica di scadenza. */
  async function controlla() {
    if (stato() !== 'granted') return;
    if (MP.push && MP.push.attivo()) return; // ci pensa il server (evita la notifica doppia)
    const imp = MP.store.impostazioni();
    if (imp.notifiche === false) return; // spente dall'interruttore delle Impostazioni
    const adesso = new Date();
    const hhmm = `${String(adesso.getHours()).padStart(2, '0')}:${String(adesso.getMinutes()).padStart(2, '0')}`;
    if (hhmm < imp.orario || imp.ultimaNotifica === MP.date.oggi()) return;
    const titoli = daNotificareOggi();
    MP.store.impostaImpostazioni({ ultimaNotifica: MP.date.oggi() });
    if (titoli.length) await mostra(testo(titoli, imp.giorniPreavviso));
  }

  /* ---------- Snapshot per il service worker (IndexedDB) + Periodic Background Sync ---------- */
  function apriDb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('mangiamiprima', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function salvaSnapshot() {
    try {
      const imp = MP.store.impostazioni();
      const snap = {
        push: !!(MP.push && MP.push.attivo()),
        attive: imp.notifiche !== false,
        giorniPreavviso: imp.giorniPreavviso, orario: imp.orario, ultimaNotifica: imp.ultimaNotifica,
        scadenze: MP.store.prodotti().filter((p) => p.dataScadenza).map((p) => ({ titolo: p.titolo, scadenza: p.dataScadenza }))
      };
      const db = await apriDb();
      await new Promise((res, rej) => {
        const tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(snap, 'snapshot');
        tx.oncomplete = res; tx.onerror = () => rej(tx.error);
      });
      db.close();
    } catch (e) { /* IndexedDB non disponibile: resta il controllo ad app aperta */ }
  }
  async function registraSincronizzazione() {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg.periodicSync) await reg.periodicSync.register('scadenze', { minInterval: 6 * 60 * 60 * 1000 });
    } catch (e) { /* non supportato o non permesso */ }
  }

  /* ---------- Banner in-app ---------- */
  function prodottiInScadenza() {
    return MP.store.prodotti()
      .filter(MP.prodotto.daUsareSubito)
      .sort((a, b) => a.dataScadenza.localeCompare(b.dataScadenza));
  }

  function avvia() {
    MP.store.onChange(salvaSnapshot);
    salvaSnapshot();
    if (stato() === 'granted') registraSincronizzazione();
    controlla();
    setInterval(controlla, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) controlla(); });
  }

  MP.notifiche = { stato, richiediPermesso, imposta, controlla, avvia, prodottiInScadenza, isIOS, standalone, testo };
})();
