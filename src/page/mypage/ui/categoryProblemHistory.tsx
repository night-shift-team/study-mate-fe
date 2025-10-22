'use client';
import useCategoryProblemHistory from '../model/categoryProblemHistoryHook';
import { QuestionItem } from '@/feature/mypage/ui/Item';
import { ProblemPagination } from '@/feature/pagination/ui';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import { useLayoutEffect } from 'react';

const CategoryProblemHistoryPage = () => {
  const {
    category,
    paginatedHistory,
    startIndex,
    textColorClass,
    filteredHistory,
    itemsPerPage,
    page,
    setPage,
  } = useCategoryProblemHistory();

  // const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    setPageLoader('loading');
  }, []);

  useLayoutEffect(() => {
    if (paginatedHistory) {
      setPageLoader('loaded');
    }
  }, [paginatedHistory]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8p pb-[82px] scrollbar-hide">
      <span className="mt-4 text-title-page text-black dark:text-white">
        Solution Archive
      </span>
      <div className="mt-4 flex w-full flex-col gap-3">
        {paginatedHistory && paginatedHistory.length > 0 ? (
          paginatedHistory.map((history, index) => {
            console.log(history); // 로그 출력
            return (
              <Link
                key={history.historyId}
                href={{
                  pathname: RouteTo.MypageProblemDetail,
                  query: {
                    problemId: history.questionId,
                  },
                }}
              >
                <QuestionItem
                  index={startIndex + index}
                  isCorrectAnswer={history.isCorrect}
                  userAnswer={history.userAnswer}
                  userId={history.userId}
                  historyId={history.historyId}
                  questionId={history.questionId}
                  questionTitle={history.questionTitle}
                  score={history.score}
                  textColorClass={textColorClass}
                  category={category as string}
                  createdDt={history.createdDt}
                />
              </Link>
            );
          })
        ) : (
          <p>해당 카테고리 문제 데이터가 없습니다.</p>
        )}
      </div>
      <div className="flex w-full shrink-0 flex-col py-3">
        {filteredHistory && filteredHistory.length > 0 && (
          <ProblemPagination
            page={page}
            setPage={setPage}
            paginationSize={Math.max(
              1,
              Math.ceil(filteredHistory.length / itemsPerPage)
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProblemHistoryPage;
