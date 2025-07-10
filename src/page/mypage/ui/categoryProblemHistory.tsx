'use client';

import Image from 'next/image';
import { QuestionItem } from '@/feature/mypage/Item';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { ProblemPagination } from '@/feature/pagination';
import useCategoryProblemHistory from '../model/categoryProblemHistoryHook';

const CategoryProblemHistoryPage = () => {
  const {
    bgColorClass,
    category,
    paginatedHistory,
    startIndex,
    textColorClass,
    filteredHistory,
    itemsPerPage,
    page,
    setPage,
    loading,
  } = useCategoryProblemHistory();

  if (!category || typeof category !== 'string') {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col pb-8">
      <div
        className={`flex h-44 w-full items-center justify-between rounded-b-xl p-5 ${bgColorClass}`}
      >
        <div className="ml-5 flex h-full items-end">
          <div className="flex h-[85px] flex-col justify-center">
            <h1 className="text-xl font-bold">{category}</h1>
            <span className="text-l font-bold">문제아카이브</span>
          </div>
        </div>

        <Image
          src="/assets/icons/mypage/icons.png"
          alt="icon"
          width={120}
          height={50}
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-[52vh] flex-col justify-between">
          {' '}
          <div className="flex flex-col gap-3 p-5">
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((history, index) => (
                <QuestionItem
                  key={history.historyId}
                  index={startIndex + index}
                  isCorrectAnswer={history.isCorrect}
                  userAnswer={history.userAnswer}
                  userId={history.userId}
                  historyId={history.historyId}
                  questionId={history.questionId}
                  questionTitle={history.questionTitle}
                  score={history.score}
                  textColorClass={textColorClass}
                />
              ))
            ) : (
              <p>해당 카테고리 문제 데이터가 없습니다.</p>
            )}
          </div>
        </div>
        {filteredHistory.length > itemsPerPage && (
          <div className="mt-4 flex justify-center">
            <ProblemPagination
              page={page}
              setPage={setPage}
              paginationSize={Math.ceil(filteredHistory.length / itemsPerPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProblemHistoryPage;
