'use client';

import React, { useState } from 'react';
import { csQuizQuestions } from '@/entities/test';
import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

const LevelTest = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // csQuizQuestions가 유효한지 확인
  if (!Array.isArray(csQuizQuestions) || csQuizQuestions.length === 0) {
    return <div>퀴즈 데이터를 불러오는 중...</div>;
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];

    if (currentQuestion < csQuizQuestions.length - 1) {
      setUserAnswers(newAnswers);
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 안전하게 정답 체크
      const correctCount = newAnswers.reduce((count, answer, index) => {
        // csQuizQuestions[index]가 존재하는지 확인
        if (
          !csQuizQuestions[index] ||
          typeof csQuizQuestions[index].correctAnswer === 'undefined'
        ) {
          return count;
        }
        return (
          count + (answer === csQuizQuestions[index].correctAnswer ? 1 : 0)
        );
      }, 0);

      router.push(
        `/testresult?correct=${correctCount}&total=${csQuizQuestions.length}&answers=${newAnswers.join(',')}`
      );
    }
  };

  // 현재 문제가 유효한지 확인
  const currentQuiz = csQuizQuestions[currentQuestion];
  if (!currentQuiz) {
    return <div>문제를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[90%] max-w-[700px] flex-col">
        <div className="h-[15%] w-full">
          <div className="flex w-full items-center justify-between">
            <span>문제. {currentQuestion + 1}</span>{' '}
            <span className="rounded-lg bg-[#F0EDD4] p-2">
              {currentQuestion + 1}/{csQuizQuestions.length}
            </span>
          </div>
          <div className="pb-2 pt-2">{currentQuiz.question}</div>
        </div>
        <div className="flex flex-col gap-4">
          {currentQuiz.options.map((option, index) => (
            <ChoiceItem
              key={index}
              text={option}
              onClick={() => handleAnswerSelect(index)}
              isSelected={selectedAnswer === index}
              isCorrect={showResult && index === currentQuiz.correctAnswer}
              showResult={showResult}
            />
          ))}
        </div>
        <div className="flex w-full justify-end">
          <button
            disabled={selectedAnswer === null}
            className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
              selectedAnswer === null
                ? 'cursor-not-allowed bg-gray-400 opacity-50'
                : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
            } text-white`}
            onClick={handleNextQuestion}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelTest;
