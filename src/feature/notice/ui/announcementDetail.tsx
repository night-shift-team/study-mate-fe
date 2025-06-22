'use client';
import { useState } from 'react';
import { getNoticeDetailApi, Notice, NoticeCategory } from '../api';
import {
  convertNoticeCategoryToString,
  splitNoticeTitle,
} from '../model/dataConvert';
import Image from 'next/image';
import { BsList } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import NoticeFoxBg from '@public/assets/backgroundImages/main/noticeFoxBg.svg';
import { getWithCache } from '@/entities/apiCacheHook';
import { SvgIcon } from '@mui/material';

const AnnouncemnetByIdDetail = ({
  id,
  noticeData,
}: {
  id: string;
  noticeData?: Notice;
}) => {
  const [noticeDetail, setNoticeDetail] = useState<Notice | null>(null);
  const router = useRouter();

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

  return (
    <div className="relative flex h-full w-[50rem] flex-col items-center gap-8 overflow-y-auto p-7 scrollbar-hide md:px-20 md:py-20">
      <div className="absolute left-1 top-11 flex h-[4rem] w-full md:left-0 md:top-[5.5em]">
        <div className="relative flex h-full w-full gap-3 rounded-2xl p-2 md:gap-9 md:p-2.5">
          {/* <Image
            src={listMenu}
            alt="list-text"
            className="h-fit w-[3.5rem] rounded-full p-2 px-4 hover:bg-pointcolor-beigebrown/20 md:w-[3.8rem]"
            objectFit="cover"
          /> */}
          <button onClick={() => router.push(RouteTo.Announcement)}>
            <BsList className="hidden h-fit w-[2rem] rounded-xl bg-pointcolor-beigebrown/60 p-2 px-1.5 hover:bg-pointcolor-beigebrown/90 md:block md:w-[2.5rem]" />
          </button>
          <span className="md:text-4x pl-5 font-doodle text-3xl md:pl-0">
            Notice
          </span>
        </div>
      </div>
      <div className="absolute right-10 top-8 flex h-[5rem] w-fit md:right-[5rem] md:top-4 md:h-[10.2rem]">
        <SvgIcon
          className="h-full w-full drop-shadow-lg"
          component={NoticeFoxBg}
          inheritViewBox
          sx={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="z-[1] mt-[5rem] flex min-h-[30rem] w-full flex-col items-center gap-3 rounded-3xl bg-white p-6 text-sm shadow-md md:mt-[6rem] md:gap-4 md:text-base">
        <span className="flex w-full justify-center font-gmarketsans">
          {noticeDetail &&
            convertNoticeCategoryToString(noticeDetail?.noticeCategory)}
        </span>
        <span className="font-gmarketsans">
          {splitNoticeTitle(noticeDetail?.noticeTitle).rest}
        </span>
        <div className="w-full border-black p-1 md:p-4">
          {noticeDetail && noticeDetail.noticeContent}
        </div>
      </div>
    </div>
  );
};
export default AnnouncemnetByIdDetail;
