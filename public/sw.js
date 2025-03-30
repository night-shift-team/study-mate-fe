self.addEventListener('install', (event) => {
  console.log('서비스 워커가 설치되었습니다.');
});

self.addEventListener('activate', (event) => {
  console.log('서비스 워커가 활성화되었습니다.');
});

self.addEventListener('fetch', (event) => {
  // 네트워크 요청 처리
});
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/file.svg',
      badge: '/globe.svg',
      data: {
        notificationId: Date.now(),
      },
    };

    // IndexedDB에 알림 저장
    event.waitUntil(
      (async () => {
        // 클라이언트에 메시지 보내기

        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach((client) => {
          client.postMessage({
            type: 'NEW_NOTIFICATION',
            notification: {
              title: data.title,
              body: data.body,
              timestamp: new Date().toISOString(),
              id: options.data.notificationId,
            },
          });
        });

        // 클라이언트에 배지 업데이트 메시지 보내기
        clients.forEach((client) => {
          client.postMessage({
            type: 'UPDATE_BADGE',
          });
        });

        return self.registration.showNotification(data.title, options);
      })()
    );
  }
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // 알림 클릭 시 앱 열기
  event.waitUntil(clients.openWindow('/'));
});
