const CACHE = 'kg-v6';
const PRECACHE = ['/', '/styles.css', '/js/content.js', '/js/game.js',
  '/assets/images/icon-192.png', '/assets/images/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isOwnFile = url.origin === self.location.origin;
  // For our own files: bypass HTTP cache so we always hit the CDN fresh.
  // For external resources (fonts etc.): normal fetch.
  const req = isOwnFile
    ? new Request(e.request, { cache: 'no-cache' })
    : e.request;
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok && res.type === 'basic') {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
