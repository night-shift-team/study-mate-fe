'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';

import AnnouncementList from './announcementList';
import useAnnouncementPage from '../model/announcementPageHook';
import { ProblemPagination } from '@/feature/pagination/ui';
import { NoticeTap } from '@/shared/components/notice/NoticeTap';
import { useEffect, useState } from 'react';
import { SuggestionList } from '@/page/suggestion/ui/SuggestionList';
import useSuggestionPage from '@/page/suggestion/model/suggestionPageHook';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import useSuggestionList from '@/page/suggestion/model/suggestionListHook';

export enum AnnouncementType {
  Anouncement,
  // Event,
}

const AnnouncementPage = () => {
  const { announcementList, page, setPage, maxPage } = useAnnouncementPage();

  const { list, router } = useSuggestionPage();
  const suggestionListHook = useSuggestionList(list ?? []);

  const [activeSort, setActiveSort] = useState<'조회순' | '최신순'>('조회순');
  const [activeTab, setActiveTab] = useState<'공지' | '문의'>('공지');
  const sorts = ['조회순', '최신순'] as const;

  useEffect(() => {
    if (!list) return;
    const sortKey = activeSort === '조회순' ? 'views' : 'date';
    suggestionListHook.handleSort(sortKey);
  }, [activeSort, list]);

  const sortAnnouncements = (list: typeof announcementList) => {
    if (!list) return [];
    return [...list].sort(
      (a, b) =>
        new Date(b.displayStartTime).getTime() -
        new Date(a.displayStartTime).getTime()
    );
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto scrollbar-hide">
      <div className="flex h-full w-full flex-col gap-4">
        <div className="flex items-center justify-between px-16p font-pixel text-[32px] font-bold text-black dark:text-white">
          <span className="text-title-page">Notice</span>
          {activeTab === '문의' && (
            <span
              className="cursor-pointer border-white text-[20px] hover:border-b"
              onClick={() => {
                router.push(RouteTo.WriteSuggestion);
              }}
            >
              Write
            </span>
          )}
        </div>
        <div className="flex h-auto w-full flex-col md:flex-row">
          <div>
            <NoticeTap activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex flex-col gap-4 p-16p">
              <div className="flex gap-2">
                {sorts.map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setActiveSort(sort)}
                    className={`rounded-full px-2 py-1 text-[14px] transition-all ${
                      activeSort === sort
                        ? 'bg-point-yellow'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
              <div className="">
                {activeTab === '공지' ? (
                  <>
                    {announcementList && announcementList.length > 0 ? (
                      sortAnnouncements(announcementList).map(
                        (announcement) => (
                          <AnnouncementList
                            key={announcement.noticeId}
                            noticeDetail={announcement}
                          />
                        )
                      )
                    ) : announcementList && announcementList.length === 0 ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-lg md:text-xl">No data</span>
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </>
                ) : (
                  <>
                    {list === null ? (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <SuggestionList
                        list={list}
                        suggestionListHook={suggestionListHook}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[4rem] justify-center pb-[4rem]">
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
