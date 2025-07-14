'use client';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import { useRef, useState } from 'react';
export interface QuestionHistory {
  historyId: number;
  questionTitle: string;
  questionId: string;
  userId: string;
  userAnswer: string;
  score: number;
  isCorrect: boolean;
  questionType: string;
}

const useCheckList = (questionHistory: QuestionHistory[] | undefined) => {
  const resultContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 이동을 위한 ref
  // 클릭된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>(
    ProblemCategoryTitle.ALGORITHUM
  );

  // 각 카테고리별 문제 개수를 계산
  const ALGORITHUM_MAQ = questionHistory
    ? questionHistory.filter(
        (history) =>
          history.questionType === 'ALGORITHUM_MAQ' ||
          history.questionType === 'ALGORITHUM_SAQ'
      ).length
    : 0;
  const DB_MAQ = questionHistory
    ? questionHistory.filter(
        (history) =>
          history.questionType === 'DB_MAQ' || history.questionType === 'DB_SAQ'
      ).length
    : 0;
  const NETWORK_MAQ = questionHistory
    ? questionHistory.filter(
        (history) =>
          history.questionType === 'NETWORK_MAQ' ||
          history.questionType === 'NETWORK_SAQ'
      ).length
    : 0;
  const OS_MAQ = questionHistory
    ? questionHistory.filter(
        (history) =>
          history.questionType === 'OS_MAQ' || history.questionType === 'OS_SAQ'
      ).length
    : 0;
  const TempCategories: {
    title: ProblemCategoryTitle;
    count: number;
    question: number;
  }[] = [
    {
      title: ProblemCategoryTitle.ALGORITHUM,
      count: 152,
      question: ALGORITHUM_MAQ,
    },
    {
      title: ProblemCategoryTitle.DB,
      count: 152,
      question: DB_MAQ,
    },
    {
      title: ProblemCategoryTitle.NETWORK,
      count: 152,
      question: NETWORK_MAQ,
    },
    {
      title: ProblemCategoryTitle.OS,
      count: 152,
      question: OS_MAQ,
    },
  ];

  const filteredHistory = selectedCategory
    ? questionHistory?.filter(
        (history) =>
          history.questionType === `${selectedCategory}_MAQ` ||
          history.questionType === `${selectedCategory}_SAQ`
      )
    : [];

  return {
    TempCategories,
    selectedCategory,
    setSelectedCategory,
    resultContainerRef,
    filteredHistory,
  };
};
export default useCheckList;
