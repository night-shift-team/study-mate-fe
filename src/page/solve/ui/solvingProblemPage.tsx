'use client';

import { PiPaperPlaneTilt } from 'react-icons/pi';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { IoIosArrowForward } from 'react-icons/io';
import { BookMarkCircle } from '@/feature/boomMark/ui/bookmarkCircle';
import useSolvingProblem from '../model/solvingProblemHook';
import MarkdownComponent from '@/shared/lexical/model/markdownConfig';
import {
  ProblemCategoryTitle,
  ProblemCategoryType,
  ProblemInfoMAQ,
} from '@/shared/problem/model/problemInfo.types';
import { SendMAQAnswerRes, SendSAQAnswerRes } from '../api';
import {
  ChoicedItemResult,
  ChoiceItem,
} from '@/feature/level_test/ui/ChoiceItem';

export interface ProblemProps {
  category: 'random' | ProblemCategoryTitle;
}

const SolvingProblemPage = ({ category }: ProblemProps) => {
  const {
    currentQuestionWithType,
    problemAnswer,
    selectedAnswer,
    setSelectedAnswer,
    sendAnswerButton,
    bookMarkToggle,
    handleNextButton,
    isLoading,
    isPageLoading,
    Toaster,
  } = useSolvingProblem(category as ProblemProps['category']);

  return (
    <div className="relative flex h-full w-full justify-center px-[2%] md:px-0">
      <Toaster />
      {isPageLoading ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full max-w-[1200px] flex-col rounded-xl px-[2%] pb-[2%] pt-[1%] md:max-h-full md:min-h-[50vh]">
          {!currentQuestionWithType ? (
            '더 이상 풀 문제가 없습니다'
          ) : (
            <div className="flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col pb-2 md:gap-2 md:p-2">
                <div className="flex w-full items-end justify-between">
                  <div className="space-x-1 text-xl">
                    <span>
                      {category.at(0)
                        ? category.at(0)?.toUpperCase() + category.slice(1)
                        : ''}
                    </span>
                    <span
                      className={`rounded-lg border p-0.5 px-1.5 text-[0.65rem] text-gray-800 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'bg-pointcolor-coral/40' : 'bg-pointcolor-apricot/40'}`}
                    >
                      {currentQuestionWithType?.problemType ===
                      ProblemCategoryType.MAQ
                        ? '객관식'
                        : '주관식'}
                    </span>
                  </div>
                  <button className="rounded-lg bg-pointcolor-beigebrown p-2 text-sm hover:cursor-auto">
                    레벨 {currentQuestionWithType?.difficulty}
                  </button>
                </div>
                <div className="py-3 pl-2 font-bold">
                  {currentQuestionWithType?.questionTitle}
                </div>
                <div className="w-full flex-1 overflow-y-auto rounded-3xl bg-white p-2 shadow-md">
                  <MarkdownComponent
                    markdown={currentQuestionWithType?.content ?? ''}
                  />
                </div>
              </div>

              {problemAnswer ? (
                <div className="flex w-full flex-col">
                  <div className="mt-4 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-3 md:text-base">
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.MAQ ? (
                      Array.from({ length: 4 }, (_, i) => i).map((index) => {
                        return (
                          <ChoicedItemResult
                            key={index}
                            index={index}
                            text={
                              currentQuestionWithType[
                                `choice${index + 1}` as Extract<
                                  keyof ProblemInfoMAQ,
                                  `choice${string}`
                                >
                              ]
                            }
                            userAnswer={selectedAnswer ?? ''}
                            problemAnswer={
                              (problemAnswer as SendMAQAnswerRes).answer
                            }
                          />
                        );
                      })
                    ) : (
                      <>
                        <textarea
                          className="w-full rounded-lg border p-2"
                          value={selectedAnswer ?? ''}
                          readOnly
                        />
                        <div
                          className={`mt-4 flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 inner-border ${(problemAnswer as SendSAQAnswerRes).reflectedScore > 0 ? 'bg-correctGreen' : 'bg-wrongRed'}`}
                        >
                          <p className="text-sm text-gray-600">정답 : </p>
                          <span>
                            {(problemAnswer as SendSAQAnswerRes).modelAnswer}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`flex w-full flex-col md:pl-2 md:pr-3 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'mt-4' : 'mt-2'} gap-0.5`}
                  >
                    <div className="flex w-full flex-col rounded-xl bg-white px-4 py-3 inner-border">
                      <p className="text-sm text-gray-600">해설 : </p>
                      <span>{problemAnswer.answerExplanation}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
                    {currentQuestionWithType ? (
                      <div className="mr-1 flex h-full items-center gap-2 md:mr-4 md:mt-3 md:gap-2">
                        <BookMarkCircle
                          size={20}
                          color="#b08968"
                          strokeWidth={2.2}
                          initialValue={false}
                          onClick={async () =>
                            await bookMarkToggle(currentQuestionWithType.id)
                          }
                        />
                        <button
                          disabled={problemAnswer === null}
                          className={`flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                            problemAnswer === null
                              ? 'cursor-not-allowed bg-gray-400 opacity-50'
                              : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                          } text-white`}
                          onClick={async () => {
                            await handleNextButton();
                          }}
                        >
                          <IoIosArrowForward
                            color="white"
                            className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  <div className="mt-2 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-2 md:text-base">
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.MAQ
                      ? Array.from({ length: 4 }, (_, i) => i).map((index) => {
                          return (
                            <ChoiceItem
                              key={index}
                              text={
                                currentQuestionWithType[
                                  `choice${index + 1}` as Extract<
                                    keyof ProblemInfoMAQ,
                                    `choice${string}`
                                  >
                                ]
                              }
                              isSelected={
                                selectedAnswer === (index + 1).toString()
                              }
                              onClick={() => {
                                if (isLoading) return;
                                setSelectedAnswer((index + 1).toString());
                              }}
                            />
                          );
                        })
                      : null}
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.SAQ ? (
                      <textarea
                        className="w-full rounded-lg border border-gray-300 p-2"
                        placeholder="답을 입력해주세요"
                        value={selectedAnswer ?? ''}
                        onChange={(e) => {
                          if (isLoading) return;
                          setSelectedAnswer(e.target.value);
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
                    {currentQuestionWithType ? (
                      <button
                        disabled={selectedAnswer === null}
                        className={`mr-1 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                          selectedAnswer === null || isLoading
                            ? 'cursor-not-allowed bg-gray-400 opacity-50'
                            : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                        } text-white`}
                        onClick={async () => {
                          if (!currentQuestionWithType || !selectedAnswer)
                            return;
                          await sendAnswerButton(
                            currentQuestionWithType.id,
                            selectedAnswer
                          );
                        }}
                      >
                        {isLoading ? (
                          <Spinner size="xs" />
                        ) : (
                          <PiPaperPlaneTilt className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SolvingProblemPage;
