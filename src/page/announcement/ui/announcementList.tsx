'use client';
import { Notice } from '@/feature/notice/api';
import {
  convertNoticeCategoryToString,
  timestampToDate,
} from '@/feature/notice/model/dataConvert';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';

const AnnouncementList = ({ noticeDetail }: { noticeDetail: Notice }) => {
  const router = useRouter();

  return (
    <div
      className="group flex h-[6rem] w-full shrink-0 flex-col justify-between gap-0.5 rounded-xl border bg-white p-3 px-4 text-sm shadow-md transition-colors duration-300 hover:cursor-pointer hover:bg-pointcolor-beigebrown md:h-[4rem] md:flex-row md:items-center md:overflow-hidden md:whitespace-nowrap md:text-base"
      onClick={() => {
        sessionStorage.setItem(
          'currentNoticeData',
          JSON.stringify(noticeDetail)
        );
        router.push(`${RouteTo.Announcement}/${noticeDetail.noticeId}`);
      }}
    >
      <div className="h-[2.5rem] overflow-hidden text-ellipsis whitespace-pre-line md:h-auto md:truncate">
        <span className="">
          [{convertNoticeCategoryToString(noticeDetail.noticeCategory)}]
        </span>
        <span>
          {noticeDetail.noticeTitle.split(']')[1]}
          {noticeDetail.noticeTitle.split(']')[1]}
          {noticeDetail.noticeTitle.split(']')[1]}
          {noticeDetail.noticeTitle.split(']')[1]}
          {noticeDetail.noticeTitle.split(']')[1]}
          {noticeDetail.noticeTitle.split(']')[1]}
        </span>
      </div>
      <span className="text-[0.65rem] font-normal md:text-xs">
        {timestampToDate(noticeDetail.displayStartTime)}
      </span>
    </div>
  );
};
export default AnnouncementList;
