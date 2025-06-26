'use client';

import { userStore } from '@/state/userStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { getQuestionHistoryApi } from '@/page/mypage/api';
import { QuestionItem } from '@/feature/mypage/Item';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { ProblemPagination } from '@/feature/pagination';

const CategoryPage = () => {
  const { user } = userStore();
  const { category } = useParams();
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    getQuestionHistoryApi(100, 100000)
      .then((res) => {
        if (res.ok && res.payload && 'content' in res.payload) {
          setQuestionHistory(res.payload.content);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

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

  const filteredHistory = questionHistory.filter(
    (history) =>
      history.questionType === `${category}_MAQ` ||
      history.questionType === `${category}_SAQ`
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, endIndex);

  const categoryBgColors: Record<string, string> = {
    ALGORITHUM: 'bg-[#DDEDFB]',
    NETWORK: 'bg-[#EEDDFB]',
    DB: 'bg-[#E3F5E8]',
    OS: 'bg-[#FDDCDE]',
    DESIGN: 'bg-[#FFF5E1]',
  };

  const categorytextColors: Record<string, string> = {
    ALGORITHUM: 'text-[#66B8FF]',
    NETWORK: 'text-[#D38DE8]',
    DB: 'text-[#98E0AC]',
    OS: 'text-[#F7A8AC]',
    DESIGN: 'text-[#FFF5E1]',
  };

  const bgColorClass = categoryBgColors[category] || 'bg-white';
  const textColorClass = categorytextColors[category] || 'text-white';

  return (
    <div className="h-full w-full">
      <div
        className={`flex h-[200px] w-full items-center justify-between rounded-b-xl p-5 ${bgColorClass}`}
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
      <div className="h-full w-full overflow-hidden">
        <div className="flex h-[52vh] flex-col justify-between overflow-auto">
          {' '}
          <div className="flex flex-col gap-4 p-5">
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

export default CategoryPage;
