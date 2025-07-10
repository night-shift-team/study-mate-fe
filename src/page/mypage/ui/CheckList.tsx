import React from 'react';
import { QuestionItem } from '@/feature/mypage/Item';
import { MobileCheckList } from './MobileCheckList';
import useCheckList, { QuestionHistory } from '../model/checkListHook';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';

interface CheckListProps {
  questionHistory?: QuestionHistory[];
  title: string;
}

const CheckList: React.FC<CheckListProps> = ({ questionHistory }) => {
  const {
    TempCategories,
    selectedCategory,
    setSelectedCategory,
    resultContainerRef,
    filteredHistory,
  } = useCheckList(questionHistory);

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
              className={`hidden h-[60vh] w-[100%] flex-col overflow-auto md:flex ${
                {
                  [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                  [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                  [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                  [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
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
              <div className="h-2 w-full" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckList;
