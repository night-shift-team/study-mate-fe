'use client';

import AnnouncemnetByIdDetail from '@/feature/notice/ui/announcementDetail';
import { useEffect } from 'react';
import { Notice } from '@/feature/notice/api';
import { useIdContext } from './IdContext';

const ClientAnnouncementDetail = () => {
  const id = useIdContext();
  let data;
  useEffect(() => {
    const noticeData = sessionStorage.getItem('currentNoticeData');
    try {
      data = noticeData ? (JSON.parse(noticeData) as Notice) : undefined;
    } catch {
      console.log('notice data error');
    }
  }, []);
  return <AnnouncemnetByIdDetail id={id ?? '1'} noticeData={data} />;
};
export default ClientAnnouncementDetail;
