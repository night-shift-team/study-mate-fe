'use client';

import { useEffect, useState } from 'react';
import { subscribeToPushNotifications } from './actions';

export default function PushNotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  async function subscribeToNotifications() {
    try {
      // 서비스 워커 등록
      const registration = await navigator.serviceWorker.ready;

      // 푸시 매니저에서 구독 생성
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      // 서버에 구독 정보 전송
      await subscribeToPushNotifications(subscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error('알림 구독 오류:', error);
    }
  }

  return (
    <button
      onClick={subscribeToNotifications}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      {isSubscribed ? '알림 구독 중' : '알림 구독하기'}
    </button>
  );
}
