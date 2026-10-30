/* Cosmica service worker — makes the app work offline.
   Everything the app needs is cached on first visit. Bump VERSION when you ship changes so old caches are removed. */
const VERSION = 'cosmica-v3.0.0';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'fonts/poppins-400.woff', 'fonts/poppins-500.woff', 'fonts/poppins-700.woff',
  'js/vendor/astronomy.browser.min.js', 'js/astro.js', 'js/i18n.js', 'js/i18n2.js', 'js/i18n3.js', 'js/ui.js', 'js/quiz.js', 'js/pdf.js', 'js/certificate.js', 'js/events.js', 'js/ics.js', 'js/log.js', 'js/remind.js', 'js/chart.js', 'js/views.js', 'js/learn.js', 'js/quiz-ui.js', 'js/events-ui.js', 'js/plan-ui.js', 'js/ar.js', 'js/app.js',
  'js/data/sky.js', 'js/data/cities.js', 'js/data/objects.js', 'js/data/facts.js', 'js/data/glossary.js',
  'js/data/indian.js', 'js/data/onthisday.js', 'js/data/meteors.js', 'js/data/constellations.js', 'js/data/agencies.js', 'js/data/quiz-a.js', 'js/data/quiz-c.js', 'js/data/quiz-d.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k.startsWith('cosmica-')).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;      // online city search etc. go straight to the network
  e.respondWith(caches.open(VERSION).then(async (cache) => {
    const hit = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(fresh); return hit; }                                  // cached copy now, refresh quietly for next time
    const res = await fresh;
    if (res) return res;
    if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
    return Response.error();
  }));
});

/* tapping a reminder notification brings Cosmica to the front (or opens it on the Events screen) */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) { if ('focus' in c) { if ('navigate' in c) c.navigate('./#/events'); return c.focus(); } }
    return self.clients.openWindow ? self.clients.openWindow('./#/events') : null;
  }));
});
