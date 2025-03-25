'use client';

import React, { useEffect, useState } from 'react';
import { csQuizQuestions } from '@/entities/test';
import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import {
  getLevelTestQuestionsApi,
  getLevelTestResultApi,
  GetLevelTestResultReq,
  GetLevelTestResultRes,
} from '../api';
import {
  ProblemInfoLevelTest,
  ProblemInfoMAQ,
} from '@/shared/constants/problemInfo';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import PulseLoader from 'react-spinners/PulseLoader';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import AuthHoc from '@/shared/auth/model/authHoc';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type ChoiceAttrs = Pick<
  ProblemInfoMAQ,
  'choice1' | 'choice2' | 'choice3' | 'choice4'
>;

const LevelTest = () => {
  const router = useRouter();
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const [levelTestLists, setLevelTestLists] = useState<ProblemInfoLevelTest[]>(
    []
  );
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isGetResultApiLoading, setIsGetResultApiLoading] =
    useState<boolean>(false);

  const getLevelTestQuestions = async () => {
    try {
      const res = await getLevelTestQuestionsApi();
      if (res.ok) {
        setLevelTestLists(res.payload as ProblemInfoLevelTest[]);
        setIsPageLoading(false);
        return res.payload;
      }
      throw res.payload;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  useEffect(() => {
    getLevelTestQuestions()
      .then((list) => {
        const problemListWithNo = (list as ProblemInfoLevelTest[]).map(
          (item, index) => {
            return {
              no: index + 1,
              id: item.id,
            };
          }
        );
        sessionStorage.setItem(
          'levelTestListWithNo',
          JSON.stringify(problemListWithNo)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const getLevelTestResult = async (updateAnswer: number[]) => {
    try {
      const reqData = updateAnswer.map((answer, index) => ({
        id: levelTestLists[index].id,
        answer: answer.toString() as '1' | '2' | '3' | '4',
      }));
      const res = await getLevelTestResultApi(reqData);
      if (!res.ok) throw res.payload as ServerErrorResponse;
      return res.payload as GetLevelTestResultRes;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionNo <= 0) return;
    setSelectedAnswer(userAnswers[currentQuestionNo - 1]);
    setCurrentQuestionNo((prev) => prev - 1);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;
    let updateAnswer: number[] = [];
    if (currentQuestionNo <= levelTestLists.length - 1) {
      if (!userAnswers[currentQuestionNo]) {
        updateAnswer = [...userAnswers, selectedAnswer];
        setUserAnswers(updateAnswer);
      } else {
        updateAnswer = [...userAnswers];
        updateAnswer[currentQuestionNo] = selectedAnswer;
        setUserAnswers(updateAnswer);
      }
      if (currentQuestionNo < levelTestLists.length - 1) {
        setSelectedAnswer(userAnswers[currentQuestionNo + 1] ?? null);
        setCurrentQuestionNo((prev) => prev + 1);
        setShowResult(false);
        return;
      }
    }
    // 마지막 문제일 경우
    try {
      setIsGetResultApiLoading(true);
      const res = await getLevelTestResult(updateAnswer);
      const userData = { ...res, userAnswers: updateAnswer };
      sessionStorage.setItem('levelTestResult', JSON.stringify(userData));
      router.push(RouteTo.LevelTestResult);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-[2%] md:px-[10%]">
      {isPageLoading ? (
        <Spinner size="xl" />
      ) : (
        <div className="flex h-full w-full max-w-[1200px] items-center justify-center rounded-xl px-[2%] py-[2%] md:max-h-[80%] md:min-h-[50vh] md:border md:border-pointcolor-sand md:shadow-lg">
          <div className="flex h-full w-full flex-col gap-4 pb-4 md:pb-0">
            <div className="flex w-full items-center justify-between">
              <span className="pl-2">문제 {currentQuestionNo + 1}</span>{' '}
              <button className="rounded-lg bg-pointcolor-beigebrown p-2 hover:cursor-auto">
                {currentQuestionNo + 1}/{levelTestLists.length ?? 1}
              </button>
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

export default AuthHoc(LevelTest);
