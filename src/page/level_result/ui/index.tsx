'use client';

import { Suspense, useEffect, useState } from 'react'; // Suspense import 추가
import { useSearchParams } from 'next/navigation';
import { DonutChart } from '@/feature/charts/DonutChart';
import Item from '@/feature/level_result/Item';
import { csQuizQuestions } from '@/entities/test';
import PulseLoader from 'react-spinners/PulseLoader';
import { GetLevelTestResultRes } from '@/page/level_test/api';

const ResultContent = () => {
  const [problemLists, setProblemLists] = useState<
    { no: number; id: string }[]
  >([]);
  const [resultData, setResultData] = useState<GetLevelTestResultRes | null>(
    null
  );

  useEffect(() => {
    const problems = sessionStorage.getItem('levelTestListWithNo');
    if (problems) {
      try {
        setProblemLists(JSON.parse(problems));
      } catch (e) {
        console.log(e);
      }
    }

    const storedData = sessionStorage.getItem('levelTestResult');
    if (storedData) {
      try {
        setResultData(JSON.parse(storedData));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const correctCount = resultData?.correctQuestions.length;
  const totalQuestions = resultData?.requestedQuestionCount;
  const incorrectCount = resultData?.wrongQuestions.length;
  const userAnswers = resultData?.correctQuestions.concat(
    resultData?.wrongQuestions
  );

  const calculateLevel = (correct: number, total: number) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 90) return 'Lv.3';
    if (percentage >= 70) return 'Lv.2';
    return 'Lv.1';
  };

  const data = [
    { name: 'Correct', value: correctCount ?? 0 },
    { name: 'incorrect', value: incorrectCount ?? 0 },
  ];
  if (!resultData) {
    return <PulseLoader />;
  }
  return (
    <div className="flex w-full max-w-[700px] flex-col items-center justify-around gap-6 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:flex-row">
      <div className="flex w-[100%] flex-col items-center space-y-4">
        <div className="text-center">
          <span className="text-sm font-medium text-gray-500">
            당신의 테스트 결과
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {calculateLevel(correctCount ?? 0, totalQuestions ?? 1)}
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
        <div className="grid h-[40vh] grid-cols-1 gap-2 overflow-y-scroll rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-inner sm:grid-cols-2">
          {problemLists.map((problem, index) => {
            return (
              <Item
                key={index}
                index={index}
                isCorrectAnswer={
                  resultData?.correctQuestions.find(
                    (value) => value === problem.id
                  )
                    ? true
                    : false
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LevelResult = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ResultContent />
    </div>
  );
};

export default LevelResult;
