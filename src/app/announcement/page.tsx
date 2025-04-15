'use client';
import { ProblemPagination } from '@/feature/adminProblem/ui/manageProblemComponents';
import {
  getAllNoticeListApi,
  getAllNoticeListRes,
  GetValidnoticeListRes,
  Notice,
  NoticeCategory,
} from '@/feature/notice/api';
import {
  convertNoticeCategoryToString,
  timestampToDate,
} from '@/feature/notice/model/dataConvert';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

enum AnnouncementType {
  Anouncement,
  Event,
}

const AnnouncementPage = () => {
  const [currentTab, setCurrentTab] = useState<AnnouncementType>(0);
  const [isLoading, setIsLoading] = useState(false);

  const getNoticeList = (currentTab: AnnouncementType) => {
    if (currentTab === AnnouncementType.Anouncement) {
      return [] as Notice[];
    }
    return [] as Notice[];
  };

  const [announcementList, setAnnouncementList] = useState<Notice[]>(
    getNoticeList(currentTab)
  );
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const MAX_PAGE = 10;

  const getNoticeListByPage = async (page: number) => {
    setIsLoading(true);

    try {
      const res = await getAllNoticeListApi(page, MAX_PAGE);
      if (res.ok) {
        const noticeList = (res.payload as getAllNoticeListRes).content;
        setMaxPage((res.payload as getAllNoticeListRes).totalPages);
        setAnnouncementList(noticeList);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab === AnnouncementType.Anouncement) {
      getNoticeListByPage(page);
    } else {
      setAnnouncementList([]);
      setPage(0);
      setMaxPage(1);
    }
  }, [currentTab, page]);

  return (
    <div className="flex h-full w-full flex-col p-20">
      <span className="font-jalnan text-3xl">News</span>
      <div className="flex h-full w-full flex-col gap-4 md:gap-6">
        <div className="flex h-full w-full pt-4">
          {/* Announcement , Event Tab */}
          <div className="flex w-[8rem] flex-col gap-3 p-2">
            <button
              disabled={isLoading}
              onClick={() => setCurrentTab(AnnouncementType.Anouncement)}
              className={`py-1 text-center text-lg font-bold ${currentTab === AnnouncementType.Anouncement ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
            >
              공지사항
            </button>
            <button
              disabled={isLoading}
              onClick={() => setCurrentTab(AnnouncementType.Event)}
              className={`py-1 text-center text-lg ${isLoading ? 'text-gray-500' : 'font-bold'} ${currentTab === AnnouncementType.Event ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
            >
              이벤트
            </button>
          </div>
          <div className="flex h-full w-full flex-col gap-4 px-3 py-1">
            {announcementList.length ? (
              announcementList.map((announcement) => {
                return (
                  <NoticeDataRow
                    key={announcement.noticeId}
                    noticeDetail={announcement}
                  />
                );
              })
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xl">No data</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[4rem] w-full justify-center pl-[8rem]">
          <ProblemPagination
            page={page}
            setPage={setPage}
            paginationSize={maxPage}
          />
        </div>
      </div>
    </div>
  );
};
export default AnnouncementPage;

const NoticeDataRow = ({ noticeDetail }: { noticeDetail: Notice }) => {
  const router = useRouter();

  return (
    <div
      className="group flex h-[4rem] w-full items-center justify-between gap-0.5 rounded-xl border bg-white p-3 px-4 font-medium shadow-md transition-colors duration-500 hover:cursor-pointer hover:bg-pointcolor-beigebrown"
      onClick={() => {
        sessionStorage.setItem(
          'currentNoticeData',
          JSON.stringify(noticeDetail)
        );
        router.push(`${RouteTo.Announcement}/${noticeDetail.noticeId}`);
      }}
    >
      <div>
        <span>
          [{convertNoticeCategoryToString(noticeDetail.noticeCategory)}]
        </span>
        <span>{noticeDetail.noticeTitle.split(']')[1]}</span>
      </div>
      <span className="text-xs font-normal">
        {timestampToDate(noticeDetail.displayStartTime)}
      </span>
    </div>
  );
};
