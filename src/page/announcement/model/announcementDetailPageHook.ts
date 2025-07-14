'use client';
import { getNoticeDetailApi, Notice } from '@/feature/notice/api';
import { getWithCache } from '@/shared/api/model/apiCacheHook';
import { useRouter } from 'next/navigation';
import { useIdContext } from './idContext';
import { useEffect, useState } from 'react';

const useAnnouncementDetailPage = () => {
  const [noticeDetail, setNoticeDetail] = useState<Notice | null>(null);
  const router = useRouter();

  const id = useIdContext() ?? '1';
  let noticeData;

  useEffect(() => {
    const data = sessionStorage.getItem('currentNoticeData');
    try {
      noticeData = data ? (JSON.parse(data) as Notice) : undefined;
    } catch {
      console.log('notice data error');
    }
  }, []);

  const getNoticeDetailInfo = async (id: string) => {
    if (isNaN(Number(id))) return;
    try {
      const res = await getWithCache({
        key: 'AnnouncementByIdDetail-getNoticeDetail',
        fetcher: async () => await getNoticeDetailApi(Number(id)),
        expires: 5 * 60 * 1000, // 5분
      });
      if (res.ok) {
        const noticeDetail = res.payload as Notice;
        setNoticeDetail(noticeDetail);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!noticeData) {
    getNoticeDetailInfo(id);
  }
  return {
    noticeDetail,
    router,
  };
};
export default useAnnouncementDetailPage;
