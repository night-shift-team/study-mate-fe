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
  //답안 저장 배열
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // 답 선택 로직
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    // 현재 답안을 저장
    setUserAnswers((prev) => [...prev, selectedAnswer!]);

    if (currentQuestion < csQuizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 마지막 답안을 포함한 최종 답안 배열
      const submitAnswer = [...userAnswers, selectedAnswer!];
      const correctCount = submitAnswer.reduce((count, answer, index) => {
        return (
          count + (answer === csQuizQuestions[index].correctAnswer ? 1 : 0)
        );
      }, 0);

      // answers 파라미터 추가하여 사용자의 답안도 전달
      router.push(
        `/testresult?correct=${correctCount}&total=${csQuizQuestions.length}&answers=${submitAnswer.join(',')}`
      );
    }
  };

  const currentQuiz = csQuizQuestions[currentQuestion];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[90%] max-w-[700px] flex-col">
        <div className="h-[15vh] w-full">
          <div className="flex w-full items-center justify-between">
            <span>문제. {currentQuestion + 1}</span>{' '}
            <span className="rounded-lg bg-[#F0EDD4] p-2">
              {currentQuestion + 1}/{csQuizQuestions.length}
            </span>
          </div>
          <div className="p-5">{currentQuiz.question}</div>
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
