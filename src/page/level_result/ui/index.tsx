'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DonutChart } from '@/feature/charts/DonutChart';
import Item from '@/feature/level_result/Item';
import { csQuizQuestions } from '@/entities/test';
import Popup from '@/feature/level_result/popup';

const ResultContent = () => {
  const searchParams = useSearchParams();

  const correctCount = Number(searchParams.get('correct')) || 0;
  const totalQuestions =
    Number(searchParams.get('total')) || csQuizQuestions.length;
  const incorrectCount = totalQuestions - correctCount;
  const userAnswers = searchParams.get('answers')?.split(',').map(Number) || [];

  const calculateLevel = (correct: number, total: number) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 90) return 'Lv.3';
    if (percentage >= 70) return 'Lv.2';
    return 'Lv.1';
  };

  const data = [
    { name: 'Correct', value: correctCount },
    { name: 'incorrect', value: incorrectCount },
  ];

  const [popup, setPopup] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<null | {
    index: number;
    userAnswer: number | null;
    correctAnswer: number;
    explanation: string;
  }>(null);

  const handleOpenPopup = (index: number, userAnswer: number | null) => {
    const question = csQuizQuestions[index];
    setSelectedQuestion({
      index,
      userAnswer,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    });
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="flex w-full max-w-[700px] flex-col items-center justify-around gap-6 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:flex-row">
      <div className="flex w-[100%] flex-col items-center space-y-4">
        <div className="text-center">
          <span className="text-sm font-medium text-gray-500">
            당신의 테스트 결과
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {calculateLevel(correctCount, totalQuestions)}
          </h2>
          <p className="mt-1 text-gray-600">
            {correctCount}/{totalQuestions} 문제 정답
          </p>
        </div>
        <div className="w-full">
          <DonutChart data={data} />
        </div>
      </div>

      <div className="flex w-[100%] flex-col space-y-4">
        <span className="text-lg font-semibold text-gray-700">문제풀이</span>
        <div className="scrollbar-none grid h-[40vh] grid-cols-1 gap-2 overflow-y-scroll rounded-lg border border-gray-200 bg-gray-200 p-3 shadow-inner sm:grid-cols-2">
          {csQuizQuestions.map((item, index) => (
            <Item
              key={index}
              index={index}
              userAnswer={userAnswers[index] ?? null} // 유저의 답변 전달
              onClick={() => handleOpenPopup(index, userAnswers[index] ?? null)} // 유저 답변 전달
            />
          ))}
        </div>
      </div>

      {popup && selectedQuestion && (
        <Popup
          index={selectedQuestion.index}
          userAnswer={selectedQuestion.userAnswer}
          correctAnswer={selectedQuestion.correctAnswer}
          explanation={selectedQuestion.explanation}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

const LevelResult = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Suspense fallback={<div>결과를 불러오는 중...</div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
};

export default LevelResult;
