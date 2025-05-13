'use client';

import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import React, { useEffect, useRef, useState } from 'react';
import { getCategoriesIcon } from '@/page/solve/model/getCategoryIcons';
import { QuestionItem } from '@/feature/mypage/Item';
import { getQuestionDetailApi } from '../api';

interface QuestionHistory {
  historyId: number;
  questionTitle: string;
  questionId: string;
  userId: string;
  userAnswer: string;
  score: number;
  isCorrect: boolean;
  questionType: string;
}

interface CheckListProps {
  questionHistory?: QuestionHistory[];
  title: string;
}

const CheckList: React.FC<CheckListProps> = ({ questionHistory }) => {
  const resultContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 이동을 위한 ref
  // 클릭된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
  const DESIGN_MAQ = questionHistory
    ? questionHistory.filter(
        (history) =>
          history.questionType === 'DESIGN_MAQ' ||
          history.questionType === 'DESIGN_SAQ'
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
      title: ProblemCategoryTitle.DESIGN,
      count: 15,
      question: DESIGN_MAQ,
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

  console.log(OS_MAQ);

  const filteredHistory = selectedCategory
    ? questionHistory?.filter(
        (history) => history.questionType === `${selectedCategory}_MAQ`
      )
    : [];

  useEffect(() => {
    if (selectedCategory && resultContainerRef.current) {
      resultContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedCategory]);

  return (
    <>
      <div className="flex flex-col items-center gap-5 overflow-auto bg-pointcolor-yogurt">
        <div className="w-[100%] overflow-auto rounded-xl p-4 scrollbar-hide">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {TempCategories.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(category.title)} // 클릭 시 상태 업데이트
                  className="min-w-auto relative flex h-[5rem] cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-4 pt-2.5 shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-5px] md:p-4"
                >
                  <div className="flex h-[3rem] justify-center">
                    <div className="itmes-center relative flex aspect-1 h-full items-center justify-center">
                      {getCategoriesIcon(category.title)}
                    </div>
                    <span
                      className="flex items-center text-sm font-bold"
                      style={{
                        letterSpacing:
                          category.title.length > 20 ? '-0.06rem' : '',
                      }}
                    >
                      {category.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {selectedCategory && (
          <div
            ref={resultContainerRef} // 스크롤 이동 대상
            className="h-[30vh] w-[100%] overflow-auto rounded-xl border bg-white p-4 scrollbar-hide"
          >
            <h2 className="text-center text-lg font-bold">
              {selectedCategory}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredHistory ? (
                filteredHistory.map((history, index) => (
                  <QuestionItem
                    key={history.historyId}
                    index={index}
                    isCorrectAnswer={history.isCorrect}
                    userAnswer={history.userAnswer}
                    userId={history.userId}
                    historyId={history.historyId}
                    questionId={history.questionId}
                    questionTitle={history.questionTitle}
                    score={history.score}
                  />
                ))
              ) : (
                <span>No data</span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckList;
