'use client';

import { useEffect, useState } from 'react';
import { sendPushNotification, subscribeToPushNotifications } from './actions';

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

export default function PushNotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

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
        console.log('already subscribed:');
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
      return result;
    } catch (e) {
      console.error('알림 전송 오류:', e);
      return { success: false, error: String(e) };
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 서비스 워커 등록 및 구독 상태 확인
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
        })
        .then((registration) => {
          console.log('service worker registered:');
          // 구독 상태 확인
          checkSubscriptionStatus();
        })
        .catch((error) => {
          console.error('서비스 워커 등록 오류:', error);
        });
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        onClick={async () => await subscribeToNotifications()}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        {isSubscribed ? '알림 구독 중' : '알림 구독하기'}
      </button>
      <button
        onClick={async () => await sendNotification()}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        알림 보내기
      </button>
    </div>
  );
}
