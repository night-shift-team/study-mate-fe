'use client';
import { useState } from 'react';
import { getNoticeDetailApi, Notice, NoticeCategory } from '../api';
import {
  convertNoticeCategoryToString,
  splitNoticeTitle,
} from '../model/dataConvert';
import Image from 'next/image';
import listMenu from '@/assets/icons/list-text.png';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

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
      const res = await getNoticeDetailApi(Number(id));
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
    <div className="relative flex h-full w-[50rem] flex-col items-center gap-8 overflow-y-auto p-7 scrollbar-hide md:p-20">
      <div className="absolute left-5 flex h-[3rem] w-full md:left-0">
        <button
          className="flex h-full w-[3rem] rounded-2xl p-3 hover:bg-pointcolor-beigebrown/20 md:p-2.5"
          onClick={() => router.push(RouteTo.Announcement)}
        >
          <Image src={listMenu} alt="list-text" />
        </button>
      </div>

      <span className="font-doodle text-3xl md:text-4xl">Notice</span>
      <div className="flex min-h-[30rem] w-full flex-col items-center gap-3 rounded-3xl bg-white p-6 text-sm shadow-md md:gap-4 md:text-base">
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
