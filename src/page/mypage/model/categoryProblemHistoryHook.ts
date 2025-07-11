'use client';
import { useEffect, useState } from 'react';
import { getQuestionHistoryApi } from '../api';
import { useParams } from 'next/navigation';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';

const useCategoryProblemHistory = () => {
  const { category } = useParams();
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

  const filteredHistory = questionHistory.filter(
    (history) =>
      history.questionType === `${category}_MAQ` ||
      history.questionType === `${category}_SAQ`
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, endIndex);

  const categoryBgColors: Record<ProblemCategoryTitle, string> = {
    ALGORITHUM: 'bg-[#DDEDFB]',
    NETWORK: 'bg-[#EEDDFB]',
    DB: 'bg-[#E3F5E8]',
    OS: 'bg-[#FDDCDE]',
  };

  const categorytextColors: Record<ProblemCategoryTitle, string> = {
    ALGORITHUM: 'text-[#66B8FF]',
    NETWORK: 'text-[#D38DE8]',
    DB: 'text-[#2f3330]',
    OS: 'text-[#F7A8AC]',
  };

  const bgColorClass =
    categoryBgColors[category as ProblemCategoryTitle] || 'bg-white';
  const textColorClass =
    categorytextColors[category as ProblemCategoryTitle] || 'text-white';

  return {
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
  };
};
export default useCategoryProblemHistory;
