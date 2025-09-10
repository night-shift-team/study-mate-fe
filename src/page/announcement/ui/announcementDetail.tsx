'use client';

import { BsList } from 'react-icons/bs';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import NoticeFoxBg from '@public/assets/backgroundImages/main/noticeFoxBg.svg';
import { SvgIcon } from '@mui/material';

import useAnnouncementDetailPage from '../model/announcementDetailPageHook';
import {
  convertNoticeCategoryToString,
  splitNoticeTitle,
} from '@/feature/notice/model/dataConvert';

const AnnouncemnetByIdDetailPage = () => {
  const { noticeDetail, router } = useAnnouncementDetailPage();

  return (
    <>
      <div className="flex h-full w-full flex-col bg-point-logo font-pretandard">
        <div className="flex gap-2 bg-black p-16p">
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
