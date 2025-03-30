'use server';

import webpush from 'web-push';

// VAPID 키 설정
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeToPushNotifications(
  subscription: PushSubscription
) {
  // 구독 정보를 데이터베이스에 저장
  // ...

  return { success: true };
}

export async function sendPushNotification(userId: string) {
  // 사용자의 구독 정보 가져오기
  // const subscription = ...
  //! 실제로는 데이터베이스에서 사용자의 구독 정보를 가져와야 함
  const subscription = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/example123456:APA91bExampleString',
    expirationTime: null,
    keys: {
      p256dh: 'BNYDjQL9d5PSoeBurHy2e4d4GY0sGJXBNexample_key_data',
      auth: '0IyyvUGNJ9RxJc83poo3bA',
    },
  };
  // 푸시 알림 보내기
  await webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: '새 알림',
      body: '새로운 알림이 도착했습니다.',
    })
  );

  return { success: true };
}
