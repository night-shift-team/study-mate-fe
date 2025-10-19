import React from 'react';
import { MobileCheckList } from '../list/MobileCheckList';
import useCheckList, { QuestionHistory } from '../../model/checkListHook';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';

interface CheckListProps {
  questionHistory?: QuestionHistory[];
  title: string;
}

const CheckList: React.FC<CheckListProps> = ({ questionHistory }) => {
  const { TempCategories } = useCheckList(questionHistory);

  const categoryBgColors: Record<ProblemCategoryTitle, string> = {
    [ProblemCategoryTitle.ALGORITHUM]: 'bg-point-pink',
    [ProblemCategoryTitle.NETWORK]: 'bg-point-cyan',
    [ProblemCategoryTitle.DB]: 'bg-point-orange',
    [ProblemCategoryTitle.OS]: 'bg-success',
  };

  return (
    <>
      <div className="flex w-full flex-col items-center pb-[50px] pt-[20px]">
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-3 pb-10">
            {TempCategories.map((category, index) => {
              const bgColorClass = categoryBgColors[category.title] ?? '';

              return (
                <div key={index} className="grid-2 grid w-full">
                  <MobileCheckList
                    category={category.title}
                    bgColorClass={bgColorClass}
                  />
                </div>
              );
            })}
          </div>

          {/* {selectedCategory && (
            <div
              ref={resultContainerRef}
              className={`hidden h-[60vh] w-[100%] flex-col overflow-auto md:flex ${
                {
                  [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                  [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                  [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                  [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
                }[selectedCategory as ProblemCategoryTitle] ?? 'b'
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default CheckList;
