/* ════════════════════════════════════════════════
   FIBAM Portfolio — Service Worker
   Caches static assets for offline access
════════════════════════════════════════════════ */
'use strict';

const CACHE_NAME = 'fibam-v9';
const BASE = self.registration.scope;

// Local assets — cached with default mode (same-origin)
const LOCAL_ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'funds.html',
  BASE + 'analytics.html',

  BASE + 'css/style.css',
  BASE + 'css/print.css',
  BASE + 'js/data.js',
  BASE + 'js/app.js',
  BASE + 'manifest.json',
  BASE + 'favicon.svg',
];

// Cache each URL individually — one failure won't abort the whole install
async function cacheAll(cache, urls) {
  await Promise.allSettled(
    urls.map(url =>
      cache.add(new Request(url, { mode: 'same-origin' })).catch(err => {
        console.warn('[SW] Failed to cache:', url, err.message);
      })
    )
  );
}

// Install: pre-cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await cacheAll(cache, LOCAL_ASSETS);
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for static, network-first for API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-first for live data APIs and CORS proxies
  const LIVE_HOSTS = ['frankfurter', 'finance.yahoo', 'corsproxy.io', 'allorigins.win', 'codetabs.com', 'open.er-api.com'];
  if (LIVE_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(
      fetch(event.request)
        .catch(() => new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        }))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => {
      if (event.request.destination === 'document') {
        return caches.match(BASE + 'index.html');
      }
    })
  );
});s
