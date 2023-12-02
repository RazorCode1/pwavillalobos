const CACHE_NAME = 'pwa-cache-v2'; // Cambia esto para actualizar el caché
const cacheUrls = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/pwa.png',
    // Agrega otros archivos HTML, CSS, JS y recursos que desees cachear
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(cacheUrls))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
        .then(() => self.clients.claim())
    );
});

