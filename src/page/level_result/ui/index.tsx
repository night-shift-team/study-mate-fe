'use client';

import { useEffect, useRef, useState } from 'react';
import { DonutChart } from '@/feature/charts/DonutChart';
import Item from '@/feature/level_result/Item';
import Popup from '@/feature/level_result/popup';
import { GetLevelTestResultRes } from '@/page/level_test/api';
import { userStore } from '@/state/userStore';
import { UserInfo } from '@/shared/constants/userInfo';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Button from '@/components/buttons';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import {
  getProblemDetailInfoApi,
  ProblemDetailInfoRes,
} from '@/page/adminProblem/api';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Category } from './category';
import { getQuestionDetailApi } from '@/page/mypage/api';

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
  const [questionTitles, setQuestionTitles] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (problemLists.length === 0 && resultData === null) {
      const problems = sessionStorage.getItem('levelTestListWithNo');
      console.log('problems', problems);
      if (problems) {
        try {
          console.log(JSON.parse(problems));
          setProblemLists(JSON.parse(problems));
        } catch (e) {
          console.log(e);
        }
      }

      const storedData = sessionStorage.getItem('levelTestResult');

      if (storedData) {
        try {
          console.log(JSON.parse(storedData));
          setResultData(JSON.parse(storedData));
        } catch (e) {
          console.log(e);
        }
      }
      return;
    }
    if (problemLists.length && resultData) {
      setUser({
        ...userStore.getState().user,
        userScore: resultData.yourInitScore,
      } as UserInfo);
    }
  }, [problemLists, resultData]);

  useEffect(() => {
    if (problemLists.length === 0) return;

    const fetchTitles = async () => {
      const map: Record<string, string> = {};
      await Promise.all(
        problemLists.map(async (problem) => {
          const res = await getQuestionDetailApi(problem.id);
          if (res.ok && res.payload) {
            // 예: payload에 questionTitle 필드가 있다고 가정
            map[problem.id] = (
              res.payload as { questionTitle: string }
            ).questionTitle;
          } else {
            map[problem.id] = '제목 없음';
          }
        })
      );
      setQuestionTitles(map);
    };

    fetchTitles();
  }, [problemLists]);

  console.log(questionTitles, 'questionTitles');
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
    id: string;
    title: string;
    content: string;
    userAnswer: number;
    correctAnswer: string;
    explanation: string;
  }>(null);

  const handleOpenPopup = async (index: number, id: string) => {
    const problemInfo = await getProblemDetailInfo(id);
    if (!problemInfo) {
      setPopup(false);
      return;
    }
    setSelectedQuestion({
      index,
      id,
      title: problemInfo.questionTitle,
      content: problemInfo.content,
      userAnswer: resultData?.userAnswers[index] ?? NaN,
      correctAnswer: problemInfo.answer,
      explanation: problemInfo.answerExplanation,
    });
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedQuestion(null);
  };

  const getProblemDetailInfo = async (id: string) => {
    try {
      const res = await getProblemDetailInfoApi(id);
      if (res.ok) {
        return res.payload as ProblemDetailInfoRes;
      }
      throw res.payload as ServerErrorResponse;
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(problemLists.map((p) => p.id));

  if (!resultData) {
    return <Spinner size="xl" />;
  }
  return (
    <div className="flex h-full w-full max-w-[1200px] flex-col items-center gap-6 overflow-y-scroll rounded-2xl bg-pointcolor-yogurt p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scrollbar-hide md:justify-center">
      <div className="flex w-[100%] flex-col md:h-auto md:flex-row">
        <div className="flex aspect-1 w-[100%] flex-col items-center space-y-4">
          <div className="flex h-full w-full justify-center pt-6 md:p-[20%]">
            <DonutChart
              data={data}
              level={calculateLevel(correctCount ?? 0, totalQuestions ?? 1)}
              correctAnswer={correctCount}
              wrongAnswer={totalQuestions}
            />
          </div>
        </div>
        <Category />
        <div className="flex w-full flex-col justify-center space-y-2">
          <span className="flex justify-center text-lg font-extrabold text-gray-500 md:w-[30rem]">
            문제풀이
          </span>
          <div className="grid grid-cols-1 gap-0.5 overflow-auto rounded-lg border-pointcolor-beigebrown bg-white p-0.5 md:h-[36vh] md:w-[15rem]">
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
                  onClick={async () => {
                    setPopup(true);
                    await handleOpenPopup(index, problem.id);
                  }} // 유저 답변 전달
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button
        size="lg"
        className="mb-2 flex w-full underline-offset-[3px] hover:bg-black/10 hover:underline md:mb-0 md:w-[20rem]"
        onClick={() => router.push(RouteTo.Home)}
      >
        홈으로
      </Button>

      {popup && (
        <Popup
          index={selectedQuestion?.index}
          title={selectedQuestion?.title}
          content={selectedQuestion?.content}
          userAnswer={selectedQuestion?.userAnswer}
          correctAnswer={selectedQuestion?.correctAnswer}
          explanation={selectedQuestion?.explanation}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
