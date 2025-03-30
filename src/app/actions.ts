'use server';

import webpush from 'web-push';

// VAPID 키 설정
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// 구독 정보를 저장할 임시 변수 (실제로는 데이터베이스에 저장해야 함)
let savedSubscription: any = null;

export async function subscribeToPushNotifications(subscription: any) {
  // 구독 정보를 저장
  savedSubscription = subscription;
  console.log('서버에 구독 정보가 저장되었습니다:', subscription);

  // 실제 구현에서는 데이터베이스에 저장
  // await db.subscriptions.create({ userId, subscription });

  return { success: true };
}

export async function sendPushNotification(userId: string, subscription: any) {
  if (!subscription) {
    console.error('구독 정보가 없습니다. 먼저 구독해주세요.');
    return { success: false, error: '구독 정보가 없습니다' };
  }

  try {
    const notificationData = {
      title: '새 알림',
      body:
        userId +
        ' 새로운 알림이 도착했습니다. \n' +
        new Date().toLocaleString(),
    };

    // 푸시 알림 보내기
    await webpush.sendNotification(
      subscription,
      JSON.stringify(notificationData)
    );

    console.log('푸시 알림이 성공적으로 전송되었습니다.');
    return { success: true, notification: notificationData };
  } catch (error) {
    console.error('푸시 알림 전송 오류:', error);
    return { success: false, error: String(error) };
  }
}
