/* Mangiami Prima - service worker. Incrementare VERSIONE a ogni modifica dei file dell'app. */
const VERSIONE = 'v1.3.8';
const CACHE = `mangiamiprima-${VERSIONE}`;
const FILE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/stile.css',
  'js/store.js',
  'js/servizi.js',
  'js/notifiche.js',
  'js/push.js',
  'js/app.js',
  'css/legacy.css',
  'js/legacy/polyfill.js',
  'js/legacy/store.js',
  'js/legacy/servizi.js',
  'js/legacy/push.js',
  'js/legacy/notifiche.js',
  'js/legacy/app.js',
  'icons/icon.svg',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  // cache: 'reload' = scarica i file freschi dal server, non dalla cache HTTP del browser (GitHub Pages li tiene 10 minuti)
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILE.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((chiavi) => Promise.all(chiavi.filter((k) => k.startsWith('mangiamiprima-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Solo risorse della propria origine (le API esterne passano direttamente alla rete).
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const inCache = await cache.match(req, { ignoreSearch: true });
    const rete = fetch(req).then((r) => {
      if (r && r.ok) cache.put(req, r.clone());
      return r;
    });
    if (inCache) { rete.catch(() => {}); return inCache; } // stale-while-revalidate
    try { return await rete; } catch (err) {
      if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
      return Response.error();
    }
  })());
});

/* ---------- Notifiche di scadenza in background (Periodic Background Sync, dove disponibile) ---------- */
function leggiSnapshot() {
  return new Promise((res) => {
    const r = indexedDB.open('mangiamiprima', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onerror = () => res(null);
    r.onsuccess = () => {
      const db = r.result;
      const g = db.transaction('kv').objectStore('kv').get('snapshot');
      g.onsuccess = () => { db.close(); res(g.result || null); };
      g.onerror = () => { db.close(); res(null); };
    };
  });
}

function iso(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

async function controllaScadenze() {
  const snap = await leggiSnapshot();
  if (!snap || snap.push || snap.attive === false || self.Notification?.permission !== 'granted') return; // snap.push: se ne occupa il server; attive false: spente dalle Impostazioni
  const adesso = new Date();
  const hhmm = `${String(adesso.getHours()).padStart(2, '0')}:${String(adesso.getMinutes()).padStart(2, '0')}`;
  const oggi = iso(adesso);
  if (hhmm < snap.orario || snap.ultimaNotifica === oggi) return;
  const t = new Date(adesso.getFullYear(), adesso.getMonth(), adesso.getDate() + snap.giorniPreavviso);
  const titoli = snap.scadenze.filter((s) => s.scadenza === iso(t)).map((s) => s.titolo);
  if (!titoli.length) return;
  const g = snap.giorniPreavviso;
  const quando = g === 0 ? 'oggi' : g === 1 ? 'domani' : `tra ${g} giorni`;
  const corpo = titoli.length === 1 ? `${titoli[0]} scade ${quando}` : `${titoli.length} prodotti scadono ${quando}: ${titoli.join(', ')}`;
  await self.registration.showNotification('Mangiami Prima', { body: corpo, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'scadenza-' + oggi, lang: 'it' });
}

self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'scadenze') e.waitUntil(controllaScadenze());
});

/* Web Push inviato dal server (Supabase Edge Function). Su iOS ogni push deve mostrare una notifica. */
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { corpo: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.titolo || 'Mangiami Prima', {
    body: d.corpo || 'Hai prodotti in scadenza.',
    icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: d.tag || 'scadenza', lang: 'it'
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const lista = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of lista) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./#/dispensa');
  })());
});
