// public/sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 모든 캐시 삭제
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      // 본인 언레지스터
      await self.registration.unregister();
      // 열려있는 탭 새로고침 유도(선택)
      const cs = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      cs.forEach((c) => c.navigate(c.url));
    })()
  );
});
// fetch/other 핸들러 없음 (아무것도 안 가로채게)
