'use client';

import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import React, { useState } from 'react';
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
  // 클릭된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 각 카테고리별 문제 개수를 계산
  const ALGORITHUM_MAQ = questionHistory
    ? questionHistory.filter(
        (history) => history.questionType === 'ALGORITHUM_MAQ'
      ).length
    : 0;
  const DB_MAQ = questionHistory
    ? questionHistory.filter((history) => history.questionType === 'DB_MAQ')
        .length
    : 0;
  const DESIGN_MAQ = questionHistory
    ? questionHistory.filter((history) => history.questionType === 'DESIGN_MAQ')
        .length
    : 0;
  const NETWORK_MAQ = questionHistory
    ? questionHistory.filter(
        (history) => history.questionType === 'NETWORK_MAQ'
      ).length
    : 0;
  const OS_MAQ = questionHistory
    ? questionHistory.filter((history) => history.questionType === 'OS_MAQ')
        .length
    : 0;

  // TempCategories 배열에 문제 개수를 동적으로 추가
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

  // 선택된 카테고리에 따라 데이터를 필터링
  const filteredHistory = selectedCategory
    ? questionHistory?.filter(
        (history) => history.questionType === `${selectedCategory}_MAQ`
      )
    : [];

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 overflow-auto">
      <div className="h-[30vh] w-[100%] overflow-auto rounded-xl bg-white p-4 shadow-xl scrollbar-hide">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {TempCategories.map((category, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedCategory(category.title)} // 클릭 시 상태 업데이트
                className="min-w-auto relative flex h-[6rem] cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-4 pt-2.5 shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-2xl md:p-4"
              >
                <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-red-200 md:h-[2.5rem] md:w-[2.5rem]">
                  {getCategoriesIcon(category.title)}
                </div>
                <span
                  className="mt-2 text-center text-sm font-semibold"
                  style={{
                    letterSpacing: category.title.length > 20 ? '-0.06rem' : '',
                  }}
                >
                  {category.title}
                </span>
                <span
                  className="mt-1 text-center text-sm font-semibold"
                  style={{
                    letterSpacing: category.title.length > 20 ? '-0.06rem' : '',
                  }}
                >
                  {category.question}문제
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 선택된 카테고리에 따라 보이는 영역 */}
      {selectedCategory && (
        <div className="h-[30vh] w-[100%] overflow-auto rounded-xl bg-white p-4 shadow-xl scrollbar-hide">
          <h2 className="text-center text-lg font-bold">{selectedCategory}</h2>
          <div className="flex gap-2">
            {filteredHistory?.map((history, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckList;
