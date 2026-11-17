/* Gestione Orto PWA - avvio, router a hash, intestazione, barra delle schede, tema, service worker, notifiche. */
(function () {
  'use strict';
  const GO = window.GO;
  const { L, S, UI, net: ST, V } = GO;
  const h = UI.h;
  GO.token = 0;

  // ---------- Navigazione ----------
  GO.nav = {
    depth: 0,
    go(hash) { GO.nav.depth++; location.hash = hash; },
    tab(hash) { GO.nav.depth = 0; location.hash = hash; },
    replace(hash) { location.replace(hash); },
    back(parent) {
      if (GO.nav.depth > 0) { GO.nav.depth--; history.back(); } else location.replace(parent || '#/attivita');
    },
  };

  const TABS = [
    { id: 'attivita', ic: '🗓️', lb: 'Attività', hash: '#/attivita' },
    { id: 'orti', ic: '🌱', lb: 'Orti', hash: '#/orti' },
    { id: 'schema', ic: '🗺️', lb: 'Schema', hash: '#/schema' },
    { id: 'statistiche', ic: '📊', lb: 'Statistiche', hash: '#/statistiche' },
    { id: 'impostazioni', ic: '⚙️', lb: 'Impost.', hash: '#/impostazioni' },
  ];
  const ROUTES = [
    [/^\/attivita$/, 'attivita', () => V.attivita()],
    [/^\/orti$/, 'orti', () => V.orti()],
    [/^\/orto\/nuovo$/, 'orti', () => V.modificaOrto({ id: 'nuovo' })],
    [/^\/orto\/(\d+)$/, 'orti', (m) => V.ortoDettaglio({ id: m[1] })],
    [/^\/orto\/(\d+)\/modifica$/, 'orti', (m) => V.modificaOrto({ id: m[1] })],
    [/^\/orto\/(\d+)\/verdura\/(\d+)$/, 'orti', (m, q) => V.nuovaColtivazione({ id: m[1], cid: m[2], query: q })],
    [/^\/orto\/(\d+)\/oggetto$/, 'orti', (m) => V.nuovoOggetto({ id: m[1] })],
    [/^\/oggetto\/(\d+)$/, 'orti', (m) => V.oggetto({ id: m[1] })],
    [/^\/schema$/, 'schema', () => V.schema()],
    [/^\/statistiche$/, 'statistiche', () => V.statistiche()],
    [/^\/spese$/, 'statistiche', () => V.spese()],
    [/^\/impostazioni$/, 'impostazioni', () => V.impostazioni()],
    [/^\/semine$/, 'attivita', () => V.semine()],
    [/^\/compagni$/, 'attivita', () => V.compagni()],
  ];

  let $main, $title, $back, $tabs, $fab;
  let lastHash = null;

  const parseHash = () => {
    const raw = (location.hash || '').replace(/^#/, '') || '/attivita';
    const i = raw.indexOf('?');
    return { path: i < 0 ? raw : raw.slice(0, i), query: i < 0 ? '' : raw.slice(i + 1) };
  };

  GO.render = (top) => {
    if (!$main) return;
    const y = window.scrollY;
    const { path, query } = parseHash();
    const hash = location.hash || '#/attivita';
    GO.token++;
    let view = null, tab = 'attivita';
    for (const [re, t, fn] of ROUTES) {
      const m = re.exec(path);
      if (m) {
        tab = t;
        try { view = fn(m, query); } catch (e) { console.error(e); view = { title: 'Errore', el: UI.note(`Si è verificato un errore: ${e.message}`, 'warn') }; }
        break;
      }
    }
    if (!view) { location.replace('#/attivita'); return; }
    GO.formAttivo = !!view.form;
    UI.clear($main);
    $main.append(view.el);
    $title.textContent = view.title || 'Gestione Orto';
    document.title = `${view.title || 'Gestione Orto'} · Gestione Orto`;
    $back.hidden = !view.back;
    $back.onclick = () => GO.nav.back(view.back);
    UI.clear($fab);
    if (view.fab) { $fab.append(h('button', { class: 'fab', onclick: view.fab.onclick, text: view.fab.label })); }
    Array.from($tabs.querySelectorAll('button')).forEach((b) => b.classList.toggle('on', b.dataset.id === tab));
    if (top || hash !== lastHash) window.scrollTo(0, 0); else window.scrollTo(0, y);
    lastHash = hash;
    if (path === '/spese' && hash !== GO._lastSpese) { GO._lastSpese = hash; V.speseAvvio(); }
    if (path !== '/spese') GO._lastSpese = null;
  };

  let pending = false;
  S.onChange = () => {
    if (pending || GO.formAttivo) return;
    pending = true;
    Promise.resolve().then(() => { pending = false; GO.render(); });
  };

  // ---------- Tema ----------
  GO.applicaTema = () => {
    const t = S.set().tema;
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  };

  // ---------- Notifiche all'apertura ----------
  const notificaAvvisi = async () => {
    const set = S.set();
    if (!set.notificheBrowser || !('Notification' in window) || Notification.permission !== 'granted') return;
    if (GO.push && GO.push.attivo()) return; // i promemoria arrivano dal server (push): niente notifica doppia all'apertura
    const oggi = L.iso(L.today());
    let ultima = null;
    try { ultima = localStorage.getItem('gestioneorto.ultimaNotifica'); } catch (e) { /* ignore */ }
    if (ultima === oggi) return;
    const meteoDi = (o) => { const p = L.posizione(o); return p ? ST.leggiCache(p) : null; };
    const avvisi = await V.calcolaAvvisi(meteoDi);
    if (!avvisi.length) return;
    const corpo = avvisi.map((a) => `${a.icona} ${a.titolo}`).join(' · ');
    try { localStorage.setItem('gestioneorto.ultimaNotifica', oggi); } catch (e) { /* ignore */ }
    try {
      const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
      if (reg && reg.showNotification) await reg.showNotification('Gestione Orto', { body: corpo, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'avvisi-orto' });
      else new Notification('Gestione Orto', { body: corpo, icon: 'icons/icon-192.png' });
    } catch (e) { /* ignore */ }
  };

  // ---------- Service worker ----------
  const registraSW = () => {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    const aveva = !!navigator.serviceWorker.controller;
    let ricarica = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!aveva || ricarica) return;
      ricarica = true;
      UI.toast('App aggiornata: ricarico…');
      setTimeout(() => location.reload(), 900);
    });
    navigator.serviceWorker.register('sw.js').catch((e) => console.warn('Service worker non registrato', e));
  };

  // ---------- Avvio ----------
  const start = () => {
    S.load();
    GO.applicaTema();
    const app = document.getElementById('app');
    $back = h('button', { class: 'back', 'aria-label': 'Indietro', text: '‹', hidden: true });
    $title = h('h1', { text: 'Gestione Orto' });
    $main = h('main', { id: 'main' });
    $fab = h('div');
    $tabs = h('nav', { class: 'tabs', 'aria-label': 'Sezioni' }, h('div', { class: 'tabs-in' },
      TABS.map((t) => h('button', { 'data-id': t.id, onclick: () => GO.nav.tab(t.hash), 'aria-label': t.lb }, h('span', { class: 'ic', text: t.ic }), h('span', { class: 'lb', text: t.lb })))));
    app.append(h('header', { class: 'top' }, $back, $title), $main, $fab, $tabs);
    window.addEventListener('hashchange', () => GO.render());
    GO.render();
    registraSW();
    if (S.erroreSalvataggio) UI.toast(S.erroreSalvataggio);
    setTimeout(notificaAvvisi, 1200);
    // Se si torna all'app dopo ore, ricalcola avvisi e meteo
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && !GO.formAttivo) GO.render(); });
    window.addEventListener('online', () => { if (!GO.formAttivo) GO.render(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
