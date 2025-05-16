self.addEventListener('install', (event) => {
  console.log('서비스 워커가 설치되었습니다.');
  // 새 서비스 워커가 즉시 활성화되도록 함
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('서비스 워커가 활성화되었습니다.');
  // 활성화 즉시 모든 클라이언트 제어
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 네트워크 요청 처리
});

// IndexedDB 설정 함수
function setupNotificationDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NotificationsDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notifications')) {
        const store = db.createObjectStore('notifications', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(new Error('IndexedDB를 열 수 없습니다.'));
    };
  });
}

// 알림 저장 함수
async function saveNotification(notification) {
  try {
    const db = await setupNotificationDB();
    const tx = db.transaction('notifications', 'readwrite');
    const store = tx.objectStore('notifications');

    const request = store.add({
      title: notification.title,
      body: notification.body,
      timestamp: notification.timestamp || new Date().toISOString(),
      read: false,
    });

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error('알림 저장 실패'));
    });
  } catch (error) {
    console.error('알림 저장 오류:', error);
    return false;
  }
}

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const notificationId = data.notificationId || Date.now();

    const options = {
      body: data.body,
      icon: '/assets/icons/serviceWorker/file.svg',
      badge: '/assets/icons/serviceWorker/globe.svg',
      tag: data.tag || 'notification-tag', // 서버에서 보낸 태그 사용 또는 기본값
      data: {
        notificationId: notificationId,
      },
    };

    event.waitUntil(
      (async () => {
        try {
          // IndexedDB에 알림 저장
          await saveNotification({
            title: data.title,
            body: data.body,
            timestamp: new Date().toISOString(),
          });

          // 클라이언트에 메시지 보내기
          const clients = await self.clients.matchAll({ type: 'window' });
          clients.forEach((client) => {
            client.postMessage({
              type: 'NEW_NOTIFICATION',
              notification: {
                title: data.title,
                body: data.body,
                timestamp: new Date().toISOString(),
                id: notificationId,
              },
            });
          });

          // 배지 업데이트 메시지 보내기
          clients.forEach((client) => {
            client.postMessage({
              type: 'UPDATE_BADGE',
            });
          });

          return self.registration.showNotification(data.title, options);
        } catch (error) {
          console.error('푸시 알림 처리 오류:', error);
        }
      })()
    );
  }
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // 클라이언트에 알림 읽음 메시지 보내기
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({ type: 'window' });
      if (clients.length > 0) {
        clients[0].postMessage({
          type: 'NOTIFICATION_CLICKED',
          notificationId: event.notification.data.notificationId,
        });
        return clients[0].focus();
      } else {
        return self.clients.openWindow('/');
      }
    })()
  );
});
