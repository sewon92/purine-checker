const CACHE_NAME = 'purine-v2';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// 캐시 안쓰고 항상 네트워크에서 최신 파일 가져오기
self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(function(){
      return caches.match(e.request);
    })
  );
});
