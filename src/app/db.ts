// db.ts - IndexedDB 설정 및 타입 정의

// 알림 인터페이스 정의
export interface Notification {
  id?: number;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export function setupNotificationDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NotificationsDB', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('notifications')) {
        const store = db.createObjectStore('notifications', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject(new Error('IndexedDB를 열 수 없습니다.'));
    };
  });
}

export async function saveNotification(
  notification: Omit<Notification, 'id' | 'read'>
): Promise<boolean> {
  try {
    const db = await setupNotificationDB();
    const tx = db.transaction('notifications', 'readwrite');
    const store = tx.objectStore('notifications');

    await store.add({
      title: notification.title,
      body: notification.body,
      timestamp: notification.timestamp || new Date().toISOString(),
      read: false,
    });

    return true;
  } catch (error) {
    console.error('알림 저장 오류:', error);
    return false;
  }
}

export async function getNotifications(): Promise<Notification[]> {
  try {
    const db = await setupNotificationDB();
    const tx = db.transaction('notifications', 'readonly');
    const store = tx.objectStore('notifications');
    const index = store.index('timestamp');

    // 최신 알림부터 가져오기
    return new Promise((resolve, reject) => {
      const request = index.getAll(null, 50);

      request.onsuccess = () => {
        resolve(request.result.reverse());
      };

      request.onerror = () => {
        reject(new Error('알림을 가져오는 중 오류가 발생했습니다.'));
      };
    });
  } catch (error) {
    console.error('알림 가져오기 오류:', error);
    return [];
  }
}

export async function markNotificationAsRead(id: number): Promise<boolean> {
  try {
    const db = await setupNotificationDB();
    const tx = db.transaction('notifications', 'readwrite');
    const store = tx.objectStore('notifications');

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const notification = getRequest.result;
        if (!notification) {
          resolve(false);
          return;
        }

        notification.read = true;
        const updateRequest = store.put(notification);

        updateRequest.onsuccess = () => {
          resolve(true);
        };

        updateRequest.onerror = () => {
          reject(new Error('알림 업데이트 중 오류가 발생했습니다.'));
        };
      };

      getRequest.onerror = () => {
        reject(new Error('알림을 찾는 중 오류가 발생했습니다.'));
      };
    });
  } catch (error) {
    console.error('알림 읽음 표시 오류:', error);
    return false;
  }
}
