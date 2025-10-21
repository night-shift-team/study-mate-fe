'use client';

import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import useAnnouncementDetailPage from '../model/announcementDetailPageHook';
import { useLayoutEffect } from 'react';

const AnnouncemnetByIdDetailPage = () => {
  const { noticeDetail } = useAnnouncementDetailPage();
  const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    if (getPageLoader === 'loading' && noticeDetail) {
      setPageLoader('loaded');
    }
  }, [noticeDetail]);

  useLayoutEffect(() => {
    setPageLoader('loading');
  }, []);

  return (
    <>
      <div className="flex h-full w-full flex-col bg-point-logo font-pretandard">
        <div className="flex gap-2 bg-white p-16p dark:bg-black">
          <span className="text-point-orange">공지</span>
          <span className="text-black dark:text-white">
            {noticeDetail?.noticeTitle}
          </span>
        </div>
        <div className="flex flex-col p-16p text-black">
          <span className="text-body-small">
            작성일 : {noticeDetail?.displayStartTime.split('T')[0]}
          </span>
          <span className="p-8p text-body-primary">
            {noticeDetail?.noticeContent}
          </span>
        </div>
      </div>
    </>
  );
};
export default AnnouncemnetByIdDetailPage;
