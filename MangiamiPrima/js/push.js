/* Mangiami Prima - Web Push: registra il telefono su Supabase perche' il server invii le notifiche di scadenza anche ad app chiusa. */
(function () {
  'use strict';
  const MP = (window.MP = window.MP || {});

  // --- Configurazione (vedi _backend-supabase/LEGGIMI.md) ---
  const PUSH_URL = 'https://dqbqebrfwfbtqnvaejel.supabase.co'; // progetto Supabase che contiene le tabelle push_*
  const PUSH_KEY = 'sb_publishable_NvOCatNLryMZhvMJTW0VMA_FgQIJSTG'; // chiave pubblica (anon)
  const VAPID_PUBBLICA = 'BNklMlRmQSUe1XqcEKl0ANKXSG55VsIwLdJohqbktIJZlRqBtqQ510XIv3XwRVNKGQUaTh7nGJWJI9RBARq5f6Q';

  const CH_ID = 'mp_push_id';
  const CH_ATTIVO = 'mp_push_attivo';
  let timer = null;

  const leggi = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const scrivi = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } };

  function supportato() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  /** true se questo dispositivo e' registrato per il push (e il permesso e' ancora concesso). */
  function attivo() {
    return supportato() && leggi(CH_ATTIVO) === '1' && Notification.permission === 'granted';
  }

  function idDispositivo() {
    let id = leggi(CH_ID);
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() :
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        }));
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
      method: 'POST',
      headers: { apikey: PUSH_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo)
    });
    if (!r.ok) throw new Error(`${nome}: HTTP ${r.status} ${await r.text().catch(() => '')}`);
  }

  async function sottoscrizione(crea) {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub && crea) {
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chiaveDaBase64(VAPID_PUBBLICA) });
    }
    return sub;
  }

  /** Invia al server sottoscrizione, impostazioni e scadenze correnti. */
  async function sincronizzaOra() {
    if (!attivo()) return;
    try {
      const sub = await sottoscrizione(true);
      const imp = MP.store.impostazioni();
      await rpc('push_sincronizza', {
        p_id: idDispositivo(),
        p_subscription: sub.toJSON(),
        p_ora: imp.orario,
        p_giorni: imp.giorniPreavviso,
        p_fuso: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome',
        p_scadenze: MP.store.prodotti().filter((p) => p.dataScadenza).map((p) => ({ nome: p.titolo, data: p.dataScadenza }))
      });
      scrivi('mp_push_da_inviare', '0');
    } catch (e) {
      console.warn('Sincronizzazione push non riuscita:', e);
      scrivi('mp_push_da_inviare', '1'); // riprova al ritorno della rete / alla prossima modifica
    }
  }

  /** Raggruppa modifiche ravvicinate in un solo invio. */
  function sincronizza() {
    if (!attivo()) return;
    clearTimeout(timer);
    timer = setTimeout(sincronizzaOra, 1500);
  }

  /** Da chiamare dopo che l'utente ha concesso il permesso (o all'avvio se gia' concesso). */
  async function attiva() {
    if (!supportato() || Notification.permission !== 'granted') return false;
    scrivi(CH_ATTIVO, '1');
    await sincronizzaOra();
    return leggi('mp_push_da_inviare') !== '1';
  }

  async function disattiva() {
    scrivi(CH_ATTIVO, '0');
    try {
      const sub = await sottoscrizione(false);
      if (sub) await sub.unsubscribe();
      await rpc('push_rimuovi', { p_id: idDispositivo() });
    } catch (e) { console.warn('Disattivazione push:', e); }
  }

  function avvia() {
    if (!supportato()) return;
    MP.store.onChange(sincronizza);
    window.addEventListener('online', () => { if (leggi('mp_push_da_inviare') === '1') sincronizza(); });
    if (Notification.permission === 'granted' && MP.store.impostazioni().notifiche !== false) attiva(); // rinnova la sottoscrizione ad ogni apertura
  }

  MP.push = { supportato, attivo, attiva, disattiva, sincronizza, avvia };
})();
