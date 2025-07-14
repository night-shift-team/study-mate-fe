'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';

import AnnouncementList from './announcementList';
import useAnnouncementPage from '../model/announcementPageHook';
import { ProblemPagination } from '@/feature/pagination/ui';

export enum AnnouncementType {
  Anouncement,
  // Event,
}

const AnnouncementPage = () => {
  const {
    isLoading,
    setCurrentTab,
    announcementList,
    page,
    setPage,
    maxPage,
    currentTab,
  } = useAnnouncementPage();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-7 scrollbar-hide md:p-20">
      <span className="font-jalnan text-2xl md:text-3xl">News</span>
      <div className="flex h-full w-full flex-col gap-4 md:gap-6">
        <div className="flex h-auto w-full flex-col pt-4 md:flex-row">
          {/* Announcement , Event Tab */}
          <div className="flex flex-shrink-0 gap-1 p-2 md:w-[8rem] md:flex-col md:gap-3">
            <button
              disabled={isLoading}
              onClick={() => setCurrentTab(AnnouncementType.Anouncement)}
              className={`whitespace-nowrap px-3 py-1.5 text-center font-bold md:px-0 md:py-2 md:text-lg ${currentTab === AnnouncementType.Anouncement ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
            >
              공지사항
            </button>
            {/* <button
            disabled={isLoading}
            onClick={() => setCurrentTab(AnnouncementType.Event)}
            className={`whitespace-nowrap px-3 py-1.5 text-center font-bold md:px-0 md:py-2 md:text-lg ${isLoading ? 'text-gray-500' : 'font-bold'} ${currentTab === AnnouncementType.Event ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
          >
            이벤트
          </button> */}
          </div>
          <div className="mt-2 flex h-full w-full min-w-[10rem] flex-col gap-4 px-3 py-1 pb-4 md:mt-0 md:max-w-[80vw]">
            {announcementList && announcementList.length > 0
              ? announcementList.map((announcement) => {
                  return (
                    <AnnouncementList
                      key={announcement.noticeId}
                      noticeDetail={announcement}
                    />
                  );
                })
              : null}
            {announcementList && announcementList.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-lg md:text-xl">No data</span>
              </div>
            ) : null}
            {!announcementList ? <Spinner /> : null}
          </div>
        </div>
        <div className="flex h-[4rem] w-full justify-center pb-[4rem] md:pl-[8rem]">
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
