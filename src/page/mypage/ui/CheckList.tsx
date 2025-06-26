'use client';

import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import React, { useEffect, useRef, useState } from 'react';
import { getCategoriesIcon } from '@/page/solve/model/getCategoryIcons';
import { QuestionItem } from '@/feature/mypage/Item';
import { MobileCheckList } from './MobileCheckList';
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
      <div className="flex flex-col items-center overflow-auto bg-pointcolor-yogurt">
        <div className="w-[100%] overflow-auto scrollbar-hide">
          <div className="flex">
            {TempCategories.map((category, index) => {
              const categoryBgColors: Record<ProblemCategoryTitle, string> = {
                [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
                [ProblemCategoryTitle.DESIGN]: 'bg-[#FFF5E1]', // Added DESIGN category
              };
              const bgColorClass =
                categoryBgColors[category.title] ?? 'bg-white';
              return (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`hidden h-[3rem] w-[150px] cursor-pointer flex-col items-center justify-center rounded-tr-2xl px-4 pt-2.5 md:flex md:p-4 ${bgColorClass}`}
                >
                  <div className="flex h-[3rem] justify-center">
                    <span
                      className={`flex items-center text-sm font-bold ${
                        selectedCategory === category.title
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
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
          <div className="mt-5 grid grid-cols-2 md:hidden">
            {TempCategories.map((category, index) => {
              return (
                <div key={index} className="grid-2 grid md:hidden">
                  <MobileCheckList category={category.title} />
                </div>
              );
            })}
          </div>

          {selectedCategory && (
            <div
              ref={resultContainerRef}
              className={`hidden h-[30vh] w-[100%] overflow-auto md:flex ${
                {
                  [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                  [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                  [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                  [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
                  [ProblemCategoryTitle.DESIGN]: 'bg-[#FFF5E1]',
                }[selectedCategory as ProblemCategoryTitle] ?? 'bg-white'
              } p-4 scrollbar-hide`}
            >
              <div className="flex w-full flex-col gap-2">
                {filteredHistory && filteredHistory.length > 0 ? (
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
      </div>
    </>
  );
};

export default CheckList;
