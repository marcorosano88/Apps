/* Gestione Orto PWA - service worker: cache offline di tutti gli asset dell'app. Cambia VERSION a ogni rilascio. */
const VERSION = '1.1.2';
const CACHE = `gestione-orto-${VERSION}`;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/data.js',
  'js/logic.js',
  'js/store.js',
  'js/ui.js',
  'js/views.js',
  'js/forms.js',
  'js/app.js',
  'js/push.js',
  'icons/icon.svg',
  'icons/icon-maskable.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-192.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.map((a) => new Request(a, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('gestione-orto-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // API esterne (meteo, prezzi): sempre in rete
  // Navigazioni: pagina dalla cache (funziona offline), aggiornata in background
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((cached) => {
        const rete = fetch(req).then((r) => { if (r && r.ok) caches.open(CACHE).then((c) => c.put('index.html', r.clone())); return r; }).catch(() => cached);
        return cached || rete;
      })
    );
    return;
  }
  // Asset: prima la cache, poi la rete (e si aggiorna la cache)
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((r) => {
      if (r && r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      return r;
    }).catch(() => cached))
  );
});

/* Web Push inviato dal server (Supabase Edge Function). Su iOS ogni push deve mostrare una notifica. */
self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { corpo: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.titolo || 'Gestione Orto', {
    body: d.corpo || '', icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: d.tag || 'promemoria-orto', lang: 'it',
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./index.html#/attivita');
  }));
});
