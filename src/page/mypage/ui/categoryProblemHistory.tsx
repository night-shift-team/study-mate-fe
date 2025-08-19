'use client';

import Image from 'next/image';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useCategoryProblemHistory from '../model/categoryProblemHistoryHook';
import { QuestionItem } from '@/feature/mypage/ui/Item';
import { ProblemPagination } from '@/feature/pagination/ui';

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
    loading,
  } = useCategoryProblemHistory();

  if (!category || typeof category !== 'string') {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  console.log(category, 'category');
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col p-8p">
      <span className="text-title-page text-black dark:text-white">
        Solution Archive
      </span>
      <div className="mt-[20px] flex h-full w-full flex-col justify-between">
        <div className="flex h-[52vh] flex-col justify-between">
          {' '}
          <div className="flex flex-col gap-3">
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
                  category={category}
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
