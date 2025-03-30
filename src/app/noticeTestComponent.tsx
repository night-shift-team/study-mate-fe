'use client';

import { useEffect, useState } from 'react';
import { sendPushNotification, subscribeToPushNotifications } from './actions';
import {
  saveNotification,
  getNotifications,
  markNotificationAsRead,
  Notification,
  updateBadgeCount,
} from './db';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationButtonV2() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 알림 목록 로드
  async function loadNotifications() {
    setIsLoading(true);
    const notifs = await getNotifications();
    setNotifications(notifs);
    setIsLoading(false);
  }

  // 구독 상태 확인 함수
  async function checkSubscriptionStatus() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('푸시 알림이 지원되지 않는 브라우저입니다.');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        console.log('이미 구독 중입니다:', subscription);
        setIsSubscribed(true);
        return true;
      } else {
        console.log('구독되지 않았습니다.');
        setIsSubscribed(false);
        return false;
      }
    } catch (error) {
      console.error('구독 상태 확인 오류:', error);
      return false;
    }
  }

  async function subscribeToNotifications() {
    try {
      // 이미 구독 중인지 확인
      const isAlreadySubscribed = await checkSubscriptionStatus();
      if (isAlreadySubscribed) {
        console.log('이미 구독 중입니다. 새로운 구독을 생성하지 않습니다.');
        return;
      }

      // 서비스 워커 등록 먼저 확인
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      console.log('서비스 워커 등록됨:', registration);

      // 서비스 워커가 활성화될 때까지 대기
      await navigator.serviceWorker.ready;

      // 푸시 매니저에서 구독 생성
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''
        ),
      });

      console.log('구독 정보:', subscription);
      // PushSubscription 객체를 직렬화
      const serializedSubscription = JSON.parse(JSON.stringify(subscription));

      // 이제 서버 함수로 전달
      await subscribeToPushNotifications(serializedSubscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error('알림 구독 오류:', error);
    }
  }

  // 알림 푸시
  const sendNotification = async () => {
    console.log('isSubscribed', isSubscribed);
    try {
      if (!isSubscribed) {
        console.log('알림을 보내기 전에 먼저 구독해야 합니다.');
        return { success: false };
      }

      // 현재 구독 정보 가져오기
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        console.log('구독 정보를 찾을 수 없습니다.');
        return { success: false };
      }

      // 구독 정보를 직렬화하여 서버에 전송
      const serializedSubscription = JSON.parse(JSON.stringify(subscription));
      const result = await sendPushNotification('test', serializedSubscription);
      console.log('알림 전송 결과:', result);

      // 알림 결과가 성공이면 IndexedDB에도 저장
      if (result.success && result.notification) {
        await saveNotification({
          ...result.notification,
          timestamp: new Date().toISOString(),
        });
        // 알림 목록 다시 로드
        loadNotifications();
      }

      return result;
    } catch (e) {
      console.error('알림 전송 오류:', e);
      return { success: false, error: String(e) };
    }
  };

  // 알림을 읽음으로 표시
  const markAsRead = async (id: number) => {
    await markNotificationAsRead(id);
    await loadNotifications();
    await updateBadgeCount(); // 배지 카운트 업데이트
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 서비스 워커 등록 및 구독 상태 확인
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
        })
        .then((registration) => {
          console.log('서비스 워커가 등록되었습니다:', registration);
          // 구독 상태 확인
          checkSubscriptionStatus();
        })
        .catch((error) => {
          console.error('서비스 워커 등록 오류:', error);
        });
    }

    // 알림 목록 로드
    loadNotifications();

    // 서비스 워커로부터 메시지 수신 처리
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        if (event.data && event.data.type === 'NEW_NOTIFICATION') {
          // 새 알림이 도착하면 저장하고 목록 업데이트
          await saveNotification(event.data.notification);
          loadNotifications();
        }
      });
    }

    // 서비스 워커로부터 메시지 수신 처리
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        if (event.data) {
          if (event.data.type === 'NEW_NOTIFICATION') {
            // ... 기존 코드 ...
          } else if (event.data.type === 'UPDATE_BADGE') {
            await updateBadgeCount();
          }
        }
      });
    }
    updateBadgeCount();
  }, []);

  return (
    <div className="flex min-h-[30rem] w-[20rem] flex-col items-center gap-[2rem] overflow-scroll p-4 pt-[2rem] scrollbar-hide md:min-h-[40rem] md:pt-[5rem]">
      <div className="h-[6rem] w-full max-w-md">
        <button
          onClick={async () => await subscribeToNotifications()}
          className="mb-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          {isSubscribed ? '알림 구독 중' : '알림 구독하기'}
        </button>
        <button
          onClick={async () => await sendNotification()}
          className="w-full rounded bg-green-500 px-4 py-2 text-white"
        >
          알림 보내기
        </button>
      </div>

      <div className="h-[3rem] w-full max-w-md rounded-lg border p-4 shadow-sm">
        <h2 className="text-xl font-bold">알림 목록</h2>
        {isLoading ? (
          <p className="py-4 text-center">로딩 중...</p>
        ) : notifications.length > 0 ? (
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`cursor-pointer px-2 py-3 hover:bg-gray-50 ${notification.read ? 'opacity-60' : 'font-semibold'}`}
                onClick={() =>
                  notification.id !== undefined && markAsRead(notification.id)
                }
              >
                <div className="flex justify-between">
                  <h3 className="text-md">{notification.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {notification.body}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-4 text-center text-gray-500">알림이 없습니다</p>
        )}
      </div>
    </div>
  );
}
