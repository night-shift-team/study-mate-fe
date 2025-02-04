'use client';
import { csQuizQuestions } from '@/entities/test';
import { ChoiceItem } from '@/feature/level_test/ChoiceItem';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Problem = ({ category }: { category: string }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuiz = csQuizQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[90%] max-w-[700px] flex-col">
        <div className="h-[15vh] w-full">
          <div className="flex w-full items-center justify-between">
            <span>
              {decodeURIComponent(category)} 문제 {currentQuiz.id}
            </span>{' '}
            <span className="rounded-[5rem] bg-gray-100 px-4 py-2">
              응답 : {15}
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
            />
          ))}
        </div>
        <div className="flex w-full justify-between gap-x-[1rem]">
          <button className="mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-[#f9fbe7] transition-all duration-200 ease-in-out hover:border-gray-400">
            skip
          </button>
          <button
            disabled={selectedAnswer === null}
            className={`mt-4 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
              selectedAnswer === null
                ? 'cursor-not-allowed bg-gray-400 opacity-50'
                : 'bg-[#FEA1A1] hover:bg-[#fe8989] active:scale-95'
            } text-white`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Problem;
