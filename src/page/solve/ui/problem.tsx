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
import useToast from '@/shared/toast/toast';
import { devNull } from 'os';
import { userStore } from '@/state/userStore';
import { Preahvihear } from 'next/font/google';
import { UserInfo } from '@/shared/constants/userInfo';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

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
  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);
  const { user, setUser } = userStore();

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
      //TODO: 문제 불러오기 실패시 처리
      if ((e as ServerErrorResponse).ecode === Ecode.E0406) {
        setToastDescription(EcodeMessage(Ecode.E0406));
        setToastOpen(true);
        setSelectedAnswer(null);
        setCurrentQuestionWithType(null);
        await getProblem(category);
        return;
      }
    } finally {
      setIsLoading(false);
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
    <div className="flex h-full w-full justify-center">
      <Toaster />
      <div className="flex w-[90%] max-w-[1200px] flex-col rounded-2xl bg-white p-8 py-6">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <span className="text-xl font-bold">
              {category.at(0)
                ? category.at(0)?.toUpperCase() + category.slice(1)
                : ''}{' '}
              문제
            </span>{' '}
            <span className="rounded-[5rem] bg-gray-100 px-4 py-2">
              레벨 {currentQuestionWithType?.difficulty}
            </span>
          </div>
          <div className="mt-1">{currentQuestionWithType?.questionTitle}</div>
          <MarkdownComponent
            markdown={currentQuestionWithType?.content ?? ''}
          />
        </div>

        {problemAnswer ? (
          <>
            <div className="mt-4 flex flex-col gap-4">
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
                      problemAnswer={(problemAnswer as SendMAQAnswerRes).answer}
                    />
                  );
                })
              ) : (
                <>
                  <textarea
                    className="w-full rounded-lg border"
                    value={selectedAnswer ?? ''}
                    readOnly
                  />
                  <div
                    className={`mt-12 flex w-full flex-col gap-2 rounded-xl p-4 inner-border-2 ${(problemAnswer as SendSAQAnswerRes).reflectedScore > 0 ? 'bg-green-200' : 'bg-red-200'}`}
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
              className={`flex w-full flex-col ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'mt-12' : 'mt-2'} gap-2 rounded-xl bg-white p-4 inner-border-2`}
            >
              <p className="text-sm text-gray-600">해설 : </p>
              <span>{problemAnswer.answerExplanation}</span>
            </div>
            <div className="flex w-full justify-end">
              {currentQuestionWithType ? (
                <button
                  disabled={problemAnswer === null}
                  className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                    problemAnswer === null
                      ? 'cursor-not-allowed bg-gray-400 opacity-50'
                      : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
                  } text-white`}
                  onClick={async () => {
                    if (!currentQuestionWithType || !selectedAnswer) return;
                    await handleNextButton();
                  }}
                >
                  <FaArrowRight />
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 flex flex-col gap-4">
              {currentQuestionWithType?.problemType === ProblemCategoryType.MAQ
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
                        isSelected={selectedAnswer === (index + 1).toString()}
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
            <div className="mt-2 flex w-full justify-end">
              {currentQuestionWithType ? (
                <button
                  disabled={selectedAnswer === null}
                  className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                    selectedAnswer === null || isLoading
                      ? 'cursor-not-allowed bg-gray-400 opacity-50'
                      : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
                  } text-white`}
                  onClick={async () => {
                    if (!currentQuestionWithType || !selectedAnswer) return;
                    await sendAnswerButton(
                      currentQuestionWithType.id,
                      selectedAnswer
                    );
                  }}
                >
                  {isLoading ? <Spinner /> : <PiPaperPlaneTilt size={25} />}
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Problem;
