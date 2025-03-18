'use client';
import { csQuizQuestions } from '@/entities/test';
import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
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
  const [toastOpen, setToastOpen] = useState(false);

  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);
  const { user, setUser } = userStore();

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

        await getProblem(category);
        return;
      }
    }
  };

  const handleNextButton = async (id: string, answer: string) => {
    if (!currentQuestionWithType) return;
    try {
      if (currentQuestionWithType.problemType === ProblemCategoryType.MAQ) {
        const res = await sendMAQAnswerApi(id, answer);
        console.log(res);
        setUser({
          ...user,
          userScore: (res.payload as SendMAQAnswerRes).userScore,
        } as UserInfo);
        await getProblem(category);
      } else {
        const res = await sendSAQAnswerApi(id, answer);
        console.log(res);
        setUser({
          ...user,
          userScore: (res.payload as SendSAQAnswerRes).userScore,
        } as UserInfo);
        await getProblem(category);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    getProblem(category);
  }, []);

  return (
    <div className="flex h-full w-full justify-center">
      <Toaster />
      <div className="flex w-[90%] max-w-[1200px] flex-col rounded-2xl bg-white p-6 py-4">
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
          <div className="flex">{currentQuestionWithType?.questionTitle}</div>
          <MarkdownComponent
            markdown={currentQuestionWithType?.content ?? ''}
          />
        </div>
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
                    isSelected={selectedAnswer === index.toString()}
                    onClick={() => setSelectedAnswer((index + 1).toString())}
                  />
                );
              })
            : null}
          {currentQuestionWithType?.problemType === ProblemCategoryType.SAQ ? (
            <textarea
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="답을 입력해주세요"
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          ) : null}
        </div>
        <div className="flex w-full justify-end gap-x-[1rem]">
          <button
            disabled={selectedAnswer === null}
            className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
              selectedAnswer === null
                ? 'cursor-not-allowed bg-gray-400 opacity-50'
                : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
            } text-white`}
            onClick={async () => {
              if (!currentQuestionWithType || !selectedAnswer) return;
              await handleNextButton(
                currentQuestionWithType.id,
                selectedAnswer
              );
            }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Problem;
