// Define the name of the cache and the files to cache
const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
    '/',
    'index.html',
    'page2',
    'style.css',
    'app.js',
    'manifest.json'
];

// 1. Install Event: Cache all assets
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching files.');
                return cache.addAll(urlsToCache);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// 2. Fetch Event: Serve from cache first, then network (Cache-first strategy)
self.addEventListener('fetch', event => {
    // Check if the request is for a cached file
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response
                if (response) {
                    console.log('Serving from cache: ', event.request.url);
                    return response;
                }
                
                // No cache match - fetch from network
                console.log('Fetching from network: ', event.request.url);
                return fetch(event.request);
            })
    );
});

// 3. Activate Event: Clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete old caches not in the whitelist
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache: ', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Ensure that Service Worker takes control of the page immediately
    return self.clients.claim();
});
