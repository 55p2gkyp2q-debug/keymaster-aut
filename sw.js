const CACHE='keymaster-auto-pro-v1';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./logo-keymaster.jpg'];
self.addEventListener('install', e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request).then(resp=>{
    const clone=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone)).catch(()=>{});
    return resp;
  }).catch(()=>caches.match('./index.html'))));
});