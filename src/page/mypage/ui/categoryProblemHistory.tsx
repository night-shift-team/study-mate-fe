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
    <div className="flex w-full flex-col p-8p">
      <span className="text-title-page text-black dark:text-white">
        Solution Archive
      </span>
      <div className="mt-[20px] flex w-full flex-col">
        <div className="flex h-[85vh] flex-col justify-between gap-3 pb-[10px]">
          <div className="flex flex-col gap-3">
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

          {filteredHistory && filteredHistory.length > 0 && (
            <div className="mb-[10px] mt-4 flex justify-center">
              <ProblemPagination
                page={page}
                setPage={setPage}
                paginationSize={Math.max(
                  1,
                  Math.ceil(filteredHistory.length / itemsPerPage)
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProblemHistoryPage;
