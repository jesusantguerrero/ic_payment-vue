const cacheName = 'ic-payment-app';
const filesToCache = [
  '/app/admin',
  '/assets/js/manifest.js',
  '/assets/js/vendor.js',
  '/assets/js/app.js',
  '/assets/js/2.js',
  '/assets/img/icpayment_logo_alter.svg',
  '/assets/css/main.css',
  '/assets/css/secundaryCss.min.css',
  '/assets/css/5-others/square/frontend.min.css',
];
alert('hola');
self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keylist => Promise.all(keylist.map((key) => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removiendo antiguo cache', key);
        return caches.delete(key);
      }
      return false;
    }))),
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.req)),
  );
});
