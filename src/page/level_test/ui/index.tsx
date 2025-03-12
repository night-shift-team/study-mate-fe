'use client';

import React, { useEffect, useState } from 'react';
import { csQuizQuestions } from '@/entities/test';
import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import { getLevelTestQuestionsApi } from '../api';
import { ProblemInfoMAQ } from '@/shared/constants/problemInfo';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import PulseLoader from 'react-spinners/PulseLoader';

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

  const [levelTestLists, setLevelTestLists] = useState<ProblemInfoMAQ[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getLevelTestQuestions = async () => {
    try {
      const res = await getLevelTestQuestionsApi();
      if (res.ok) {
        setLevelTestLists(res.payload as ProblemInfoMAQ[]);
        setIsLoading(false);
        return res.payload;
      }
      throw res.payload;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLevelTestQuestions();
  }, []);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const getLevelTestResult = async () => {
    //TODO: level test result api call
  };

  const handlePrevQuestion = () => {
    if (currentQuestionNo <= 0) return;
    setCurrentQuestionNo((prev) => prev - 1);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...userAnswers, selectedAnswer];
    if (currentQuestionNo < csQuizQuestions.length - 1) {
      setUserAnswers(newAnswers);
      setCurrentQuestionNo((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 안전하게 정답 체크
      // const correctCount = newAnswers.reduce((count, answer, index) => {
      //   // csQuizQuestions[index]가 존재하는지 확인
      //   if (
      //     !csQuizQuestions[index] ||
      //     typeof csQuizQuestions[index].correctAnswer === 'undefined'
      //   ) {
      //     return count;
      //   }
      //   return (
      //     count + (answer === csQuizQuestions[index].correctAnswer ? 1 : 0)
      //   );
      // }, 0);
      // router.push(
      //   `/testresult?correct=${correctCount}&total=${csQuizQuestions.length}&answers=${newAnswers.join(',')}`
      // );
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {isLoading ? (
        <PulseLoader />
      ) : (
        <div className="flex w-[90%] max-w-[700px] flex-col">
          <div className="h-[15vh] w-full">
            <div className="flex w-full items-center justify-between">
              <span>문제. {currentQuestionNo + 1}</span>{' '}
              <IconButton
                bgColor={'#F0EDD4'}
                rounded={'lg'}
                className="p-2 hover:cursor-auto"
              >
                {currentQuestionNo + 1}/{levelTestLists.length ?? 1}
              </IconButton>
            </div>
            <div className="p-5">
              {levelTestLists[currentQuestionNo].description}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {Array.from(
              {
                length: Object.keys(levelTestLists[currentQuestionNo]).filter(
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
                  onClick={() => handleAnswerSelect(index)}
                  isSelected={selectedAnswer === index}
                  showResult={showResult}
                />
              );
            })}
          </div>
          <div className="flex w-full justify-end gap-4 border">
            <button
              disabled={currentQuestionNo <= 0}
              className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                currentQuestionNo <= 0
                  ? 'cursor-not-allowed bg-gray-400 opacity-50'
                  : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
              } text-white`}
              onClick={handlePrevQuestion}
            >
              <FaArrowLeft />
            </button>
            <button
              disabled={selectedAnswer === null}
              className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                selectedAnswer === null
                  ? 'cursor-not-allowed bg-gray-400 opacity-50'
                  : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
              } text-white`}
              onClick={handleNextQuestion}
            >
              {currentQuestionNo === levelTestLists.length ? (
                <PiPaperPlaneTilt size={25} />
              ) : (
                <FaArrowRight />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelTest;
