'use client';

import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import AuthHoc from '@/shared/auth/model/authHoc';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Preview } from './preview';
import useLevelTest from '../model/levelTestHook';
import { ProblemInfoMAQ } from '@/shared/problem/model/problemInfo.types';
import MarkdownComponent from '@/shared/lexical/model/markdownConfig';

export type ChoiceAttrs = Pick<
  ProblemInfoMAQ,
  'choice1' | 'choice2' | 'choice3' | 'choice4'
>;

const LevelTestPage = () => {
  const {
    isPageLoading,
    isStarted,
    setIsStarted,
    currentQuestionNo,
    levelTestLists,
    isGetResultApiLoading,
    selectedAnswer,
    showResult,
    handleAnswerSelect,
    handleNextQuestion,
    handlePrevQuestion,
  } = useLevelTest();

  return (
    <div className="flex h-full w-full items-center justify-center px-[2%] md:px-[10%]">
      {isPageLoading ? (
        <Spinner size="xl" />
      ) : !isStarted ? (
        <Preview
          onStart={() => {
            setIsStarted(true);
          }}
        />
      ) : (
        <div className="flex h-full w-full max-w-[1200px] flex-col rounded-xl px-[2%] pb-[2%] pt-[1%] md:max-h-full md:min-h-[50vh]">
          <div className="flex h-full w-full flex-col gap-4 pb-4 md:pb-0">
            <div className="flex w-full items-center justify-between">
              <span className="pl-2">문제 {currentQuestionNo + 1}</span>{' '}
              <button className="rounded-lg bg-pointcolor-beigebrown p-2 hover:cursor-auto">
                {currentQuestionNo + 1}/{levelTestLists.length ?? 1}
              </button>
            </div>
            <div className="pl-2 font-bold">
              {levelTestLists[currentQuestionNo]?.questionTitle}
            </div>
            <div className="h-full rounded-3xl bg-white p-2 shadow-md">
              <MarkdownComponent
                markdown={levelTestLists[currentQuestionNo].content}
              />
            </div>
            <div className="flex h-auto w-full flex-col justify-end">
              <div className="flex flex-col gap-2.5 md:gap-4">
                {Array.from(
                  {
                    length: Object.keys(
                      levelTestLists[currentQuestionNo]
                    ).filter(
                      (keyValue) => keyValue.startsWith('choice') === true
                    ).length,
                  },
                  (_, i) => i
                ).map((index) => {
                  return (
                    <ChoiceItem
                      key={index}
                      text={
                        (levelTestLists[currentQuestionNo] as ProblemInfoMAQ)[
                          `choice${index + 1}` as keyof ChoiceAttrs
                        ]
                      }
                      onClick={() => {
                        if (isGetResultApiLoading) {
                          return;
                        } else {
                          handleAnswerSelect(index + 1);
                        }
                      }}
                      isSelected={selectedAnswer === index + 1}
                      showResult={showResult}
                    />
                  );
                })}
              </div>
              <div className="flex w-full justify-end gap-2 md:gap-3">
                <button
                  disabled={isGetResultApiLoading || currentQuestionNo <= 0}
                  className={`mt-4 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-200 ease-in-out md:h-[45px] md:w-[45px] ${
                    isGetResultApiLoading || currentQuestionNo <= 0
                      ? 'cursor-not-allowed bg-gray-400 opacity-50'
                      : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                  } text-white`}
                  onClick={handlePrevQuestion}
                >
                  <IoIosArrowBack
                    color="white"
                    className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                  />
                </button>
                <button
                  disabled={isGetResultApiLoading || selectedAnswer === null}
                  className={`mt-4 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-200 ease-in-out md:h-[45px] md:w-[45px] ${
                    isGetResultApiLoading || selectedAnswer === null
                      ? 'cursor-not-allowed bg-gray-400 opacity-50'
                      : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                  } text-white`}
                  onClick={handleNextQuestion}
                >
                  {currentQuestionNo === levelTestLists.length - 1 ? (
                    isGetResultApiLoading ? (
                      <Spinner color="white" size={'xs'} />
                    ) : (
                      <PiPaperPlaneTilt className="h-[18px] w-[18px] md:h-[23px] md:w-[23px]" />
                    )
                  ) : (
                    // <FaArrowRight />
                    <IoIosArrowForward
                      color="white"
                      className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthHoc(LevelTestPage);
