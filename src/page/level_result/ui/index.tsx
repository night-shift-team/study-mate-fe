'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DonutChart } from '@/feature/charts/DonutChart';
import Item from '@/feature/level_result/Item';
import { csQuizQuestions } from '@/entities/test';
import Popup from '@/feature/level_result/popup';
import PulseLoader from 'react-spinners/PulseLoader';
import { GetLevelTestResultRes } from '@/page/level_test/api';
import { userStore } from '@/state/userStore';
import { UserInfo } from '@/shared/constants/userInfo';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Button from '@/components/buttons';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const TEMP_PROBLEM_DETTAIL = {
  questionId: 'e6c4a124-b55b-4e3e-a9c5-fe74f00d71b3',
  questionTitle: 'Test Question Title_ALGORITHUM_MAQ-18',
  content: 'Test Question Content_ALGORITHUM_MAQ-18',
  difficulty: 19,
  options:
    '["Choice 1 for question 18", "Choice 2 for question 18", "Choice 3 for question 18", "Choice 4 for question 18"]',
  category: 'ALGORITHUM_MAQ',
  answer: 'TEMP_3',
  answerExplanation: 'TEMP_Test Question Content ExplainationALGORITHUM_MAQ-18',
};

interface ResultData extends GetLevelTestResultRes {
  userAnswers: number[];
}

const LevelResult = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ResultContent />
    </div>
  );
};

export default LevelResult;

const ResultContent = () => {
  const { setUser } = userStore();
  const [problemLists, setProblemLists] = useState<
    { no: number; id: string }[]
  >([]);

  const router = useRouter();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const userAnswers = useRef<
    {
      no: number;
      id: string;
      userAnswer: string;
      answer: string;
      explanation: string;
    }[]
  >(null);

  useEffect(() => {
    if (problemLists.length === 0 && resultData === null) {
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
      return;
    }
    if (problemLists.length && resultData) {
      const userAnswersWithProblemNoByASC = problemLists.map((problem) => {
        return {
          no: problem.no,
          id: problem.id,
          answer: TEMP_PROBLEM_DETTAIL.answer,
          explanation: TEMP_PROBLEM_DETTAIL.answerExplanation,
          userAnswer: resultData.userAnswers[problem.no - 1].toString() ?? '-1',
        };
      });
      userAnswers.current = userAnswersWithProblemNoByASC;
      setUser({
        ...userStore.getState().user,
        userScore: resultData.yourInitScore,
      } as UserInfo);
    }
  }, [problemLists, resultData]);

  const correctCount = resultData?.correctQuestions.length;
  const totalQuestions = resultData?.requestedQuestionCount;
  const incorrectCount = resultData?.wrongQuestions.length;

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

  const [popup, setPopup] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<null | {
    index: number;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }>(null);

  const handleOpenPopup = (
    index: number,
    userAnswer: {
      no: number;
      id: string;
      userAnswer: string;
      answer: string;
      explanation: string;
    } | null
  ) => {
    const userData = userAnswers.current?.find((value) => value.no === index);
    setSelectedQuestion({
      index: index,
      userAnswer: userAnswer?.userAnswer ?? '-1',
      correctAnswer: userData?.answer ?? '',
      explanation: TEMP_PROBLEM_DETTAIL.answerExplanation,
    });
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedQuestion(null);
  };

  if (!resultData) {
    return <Spinner size="xl" />;
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
        <div className="scrollbar-none grid h-[40vh] grid-cols-1 gap-2 overflow-y-scroll rounded-lg border border-gray-200 bg-gray-200 p-3 shadow-inner sm:grid-cols-2">
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
                onClick={() =>
                  handleOpenPopup(
                    index,
                    userAnswers.current?.find(
                      (value) => value.id === problem.id
                    ) ?? null
                  )
                } // 유저 답변 전달
              />
            );
          })}
        </div>
      </div>

      <Button
        size="sm"
        className="underline-offset-[3px] hover:bg-black/10 hover:underline"
        onClick={() => router.push(RouteTo.Home)}
      >
        홈으로
      </Button>

      {popup && selectedQuestion && (
        <Popup
          index={selectedQuestion.index}
          userAnswer={parseInt(selectedQuestion.userAnswer)}
          correctAnswer={selectedQuestion.correctAnswer}
          explanation={selectedQuestion.explanation}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
