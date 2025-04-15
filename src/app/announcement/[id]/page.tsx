'use client';

import AnnouncemnetByIdDetail from '@/feature/notice/ui/announcementDetail';
import { useLayoutEffect } from 'react';
import { Notice } from '@/feature/notice/api';

const ClientAnnouncementDetail = ({
  id,
  data,
}: {
  id: string;
  data?: Notice;
}) => {
  useLayoutEffect(() => {
    const noticeData = sessionStorage.getItem('currentNoticeData');
    try {
      data = noticeData ? (JSON.parse(noticeData) as Notice) : undefined;
    } catch {
      console.log('notice data error');
    }
  }, []);
  return <AnnouncemnetByIdDetail id={id} noticeData={data} />;
};
export default ClientAnnouncementDetail;
