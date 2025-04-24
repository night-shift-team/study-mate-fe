'use client';
import { csQuizQuestions } from '@/entities/test';
import { ChoicedItemResult, ChoiceItem } from '@/feature/level_test/ChoiceItem';
import {
  ProblemCategoryTitle,
  ProblemCategoryTitleLength,
  ProblemCategoryType,
  ProblemInfoMAQ,
  ProblemInfoSAQ,
} from '@/shared/constants/problemInfo';
import { useLayoutEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {
  getMAQbyCategoryApi,
  getSAQbyCategoryApi,
  sendMAQAnswerApi,
  SendMAQAnswerRes,
  sendSAQAnswerApi,
  SendSAQAnswerRes,
} from '../api';
import {
  getRandomProblemCategory,
  getRandomProblemType,
} from '../model/getRandomCategory';
import { ServerErrorResponse } from '@/shared/api/model/config';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import useToast, { ToastType } from '@/shared/toast/toast';
import { devNull } from 'os';
import { userStore } from '@/state/userStore';
import { Preahvihear } from 'next/font/google';
import { UserInfo } from '@/shared/constants/userInfo';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { IoIosArrowForward } from 'react-icons/io';

interface ProblemProps {
  category: 'random' | ProblemCategoryTitle;
}
interface QuestionType extends ProblemInfoMAQ, ProblemInfoSAQ {
  problemType: ProblemCategoryType;
}

const Problem = ({ category }: ProblemProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionWithType, setCurrentQuestionWithType] =
    useState<QuestionType | null>(null);
  const [problemAnswer, setProblemAnswer] = useState<
    SendMAQAnswerRes | SendSAQAnswerRes | null
  >(null);

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  const { user, setUser } = userStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getRandomProblem = async () => {
    const randomType = getRandomProblemType();
    const randomCategory = getRandomProblemCategory();
    try {
      if (randomType === ProblemCategoryType.MAQ) {
        const res = await getMAQbyCategoryApi(randomCategory);
        if (res.ok) {
          setCurrentQuestionWithType({
            ...(res.payload as ProblemInfoMAQ),
            problemType: ProblemCategoryType.MAQ,
          } as QuestionType);
          return res.payload as ProblemInfoMAQ;
        }
        throw res.payload as ServerErrorResponse;
      } else {
        const res = await getSAQbyCategoryApi(randomCategory);
        if (res.ok) {
          setCurrentQuestionWithType({
            ...(res.payload as ProblemInfoSAQ),
            problemType: ProblemCategoryType.SAQ,
          } as QuestionType);
          return res.payload as ProblemInfoSAQ;
        }
        throw res.payload as ServerErrorResponse;
      }
    } catch (e) {
      throw e;
    }
  };

  const getProblem = async (
    category: Partial<ProblemProps>[keyof ProblemProps]
  ) => {
    try {
      if (!category) return;
      setIsPageLoading(true);
      if (category === 'random') {
        const res = await getRandomProblem();
        console.log(res);
      } else {
        const randomType = getRandomProblemType();
        if (randomType === ProblemCategoryType.MAQ) {
          const res = await getMAQbyCategoryApi(category);
          if (res.ok) {
            setCurrentQuestionWithType({
              ...(res.payload as ProblemInfoMAQ),
              problemType: ProblemCategoryType.MAQ,
            } as QuestionType);
            return res.payload as ProblemInfoMAQ;
          }
          throw res.payload as ServerErrorResponse;
        } else {
          const res = await getSAQbyCategoryApi(category);
          if (res.ok) {
            setCurrentQuestionWithType({
              ...(res.payload as ProblemInfoSAQ),
              problemType: ProblemCategoryType.SAQ,
            } as QuestionType);
            return res.payload as ProblemInfoSAQ;
          }
          throw res.payload as ServerErrorResponse;
        }
      }
    } catch (e) {
      console.log(e);
      if ((e as ServerErrorResponse).ecode === Ecode.E0406) {
        setToastIcon(ToastType.error);
        setToastDescription(EcodeMessage(Ecode.E0406));
        setToastOpen(true);
        setSelectedAnswer(null);
        setCurrentQuestionWithType(null);
        await getProblem(category);
        return;
      }
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleNextButton = async () => {
    if (!problemAnswer) return;
    setCurrentQuestionWithType(null);
    setProblemAnswer(null);
    setSelectedAnswer(null);
    await getProblem(category);
    return;
  };

  const sendAnswerButton = async (id: string, answer: string) => {
    if (!currentQuestionWithType) return;
    setIsLoading(true);
    try {
      if (currentQuestionWithType.problemType === ProblemCategoryType.MAQ) {
        const res = await sendMAQAnswerApi(id, answer);
        console.log(res);
        setProblemAnswer(res.payload as SendMAQAnswerRes);
        setUser({
          ...user,
          userScore: (res.payload as SendMAQAnswerRes).userScore,
        } as UserInfo);
      } else {
        const res = await sendSAQAnswerApi(id, answer);
        console.log(res);
        setProblemAnswer(res.payload as SendSAQAnswerRes);
        setUser({
          ...user,
          userScore: (res.payload as SendSAQAnswerRes).userScore,
        } as UserInfo);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    getProblem(category);
  }, []);

  return (
    <div className="flex h-full w-full justify-center px-[2%] md:px-0">
      <Toaster />
      {isPageLoading ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full max-w-[1200px] flex-col rounded-xl px-[2%] pb-[2%] pt-[1%] md:max-h-full md:min-h-[50vh]">
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
                    <button
                      disabled={problemAnswer === null}
                      className={`mr-1 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out md:mt-3 ${
                        problemAnswer === null
                          ? 'cursor-not-allowed bg-gray-400 opacity-50'
                          : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                      } text-white`}
                      onClick={async () => {
                        if (!currentQuestionWithType || !selectedAnswer) return;
                        await handleNextButton();
                      }}
                    >
                      <IoIosArrowForward
                        color="white"
                        className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                      />
                    </button>
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
                      className={`mr-1 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out md:mt-3 ${
                        selectedAnswer === null || isLoading
                          ? 'cursor-not-allowed bg-gray-400 opacity-50'
                          : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                      } text-white`}
                      onClick={async () => {
                        if (!currentQuestionWithType || !selectedAnswer) return;
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
        </div>
      )}
    </div>
  );
};
export default Problem;
