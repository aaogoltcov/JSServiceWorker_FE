'use strict';

const cacheName = 'serviceWorkerStorage_v1';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    await caches.open( cacheName ).then( async cache => {
      await cache.addAll([
        '/index.html',
        '/index.js',
        '/head.css',
      ]);
    });
    await self.skipWaiting();
  }));
  console.log('Установлен');
});

self.addEventListener('activate', (event) => {
  event.waitUntil( async () => {
    const keys = await caches.keys();
    return Promise.all(
      keys
        .filter(key => !cacheName.includes(key))
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  });
  console.log('Активирован');
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL( event.request.url );
  if ( !requestUrl.pathname.startsWith('/api') ) {
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    try {
      const response = await fetch( event.request );
      event.waitUntil(cache.put( event.request, response.clone() ));
      return response;
    } catch ( error ) {
      const cachedResponse = await cache.match( event.request );
      if ( cachedResponse ) {
        return cachedResponse;
      }
    }
    throw new Error('no cached data');
  }));
  console.log('Происходит запрос на сервер');
});
