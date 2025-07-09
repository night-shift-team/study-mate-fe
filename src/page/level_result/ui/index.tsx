'use client';

import { useEffect, useState } from 'react';
import { DonutChart } from '@/feature/charts/DonutChart';
import Item from '@/feature/level_result/Item';
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
import { categoryGroups } from '../constants';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';

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
  const setUser = userStore.getState().setUser;
  const [problemLists, setProblemLists] = useState<
    { no: number; id: string }[]
  >([]);

  const router = useRouter();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [questionInfos, setQuestionInfos] = useState<
    Record<string, { title: string; category: string }>
  >({});
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('ALGORITHUM');

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
      setUser({
        ...userStore.getState().user,
        userScore: resultData.yourInitScore,
      } as UserInfo);
    }
  }, [problemLists, resultData]);

  useEffect(() => {
    if (problemLists.length === 0) return;

    const fetchInfos = async () => {
      const map: Record<string, { title: string; category: string }> = {};
      await Promise.all(
        problemLists.map(async (problem) => {
          const res = await getQuestionDetailApi(problem.id);
          if (res.ok && res.payload) {
            const { questionTitle, category } = res.payload as {
              questionTitle: string;
              category: string;
            };
            map[problem.id] = { title: questionTitle, category };
          } else {
            map[problem.id] = { title: '제목 없음', category: 'UNKNOWN' };
          }
        })
      );
      setQuestionInfos(map);
    };

    fetchInfos();
  }, [problemLists]);

  const generateCategoryData = () => {
    return categoryGroups.map((group) => {
      const filtered = problemLists.filter(
        (p) =>
          questionInfos[p.id] &&
          group.types.includes(questionInfos[p.id].category)
      );

      const correct = filtered.filter((p) =>
        resultData?.correctQuestions.includes(p.id)
      ).length;

      return {
        key: group.key,
        title: group.title,
        correct,
        total: filtered.length,
        color: group.color,
        border: group.border,
        text: group.text,
      };
    });
  };

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
    setSelectedQuestion(null);
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

  const filteredProblems = problemLists.filter((problem) => {
    const info = questionInfos[problem.id];

    if (!info) return false;

    const group = categoryGroups.find((g) => g.key === selectedCategoryKey);

    return group?.types.includes(info.category);
  });

  const isLoading = Object.keys(questionInfos).length > 0;

  if (!isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <div className="flex h-full w-full max-w-[1200px] flex-col items-center gap-6 overflow-y-scroll rounded-2xl bg-pointcolor-yogurt p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scrollbar-hide md:justify-center">
      <div className="flex w-[100%] flex-col gap-6 md:h-auto md:flex-row">
        <div className="flex w-[100%] flex-col items-center space-y-4">
          <div className="flex h-full w-full justify-center pt-6 md:p-[8%]">
            <DonutChart
              data={data}
              level={calculateLevel(correctCount ?? 0, totalQuestions ?? 1)}
              correctAnswer={correctCount}
              wrongAnswer={totalQuestions}
            />
          </div>
        </div>

        <Category
          data={generateCategoryData()}
          onSelectCategory={setSelectedCategoryKey}
        />
        <div className="flex h-full w-full flex-col gap-5">
          <button className="hidden items-center justify-between rounded-md bg-[#FEBA73] p-3 text-white md:flex">
            자세히 보기
            {/* <div className="h-auto w-[40px]">
              <SvgIcon
                inheritViewBox
                component={Arrow}
                sx={{ width: '100%', height: '100%' }}
              />
            </div> */}
          </button>
          <div className="grid grid-cols-2 flex-col gap-[0.1rem] overflow-y-scroll rounded-lg bg-none p-0.5 scrollbar-hide md:flex md:h-[40vh] md:bg-white md:shadow-md">
            {filteredProblems.map((problem, index) => {
              const title = questionInfos[problem.id]?.title ?? '제목 없음';
              const number = problem.no;
              return (
                <Item
                  key={index}
                  index={index}
                  title={title}
                  number={number}
                  isCorrectAnswer={
                    resultData?.correctQuestions.includes(problem.id) ?? false
                  }
                  onClick={async () => {
                    setPopup(true);
                    await handleOpenPopup(index, problem.id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button
        size="lg"
        className="mb-2 flex w-full bg-[#FEBA73] text-white underline-offset-[3px] hover:bg-[#ffa442] md:mb-0 md:w-[20rem]"
        onClick={() => router.push(RouteTo.Home)}
      >
        홈으로
      </Button>

      {popup &&
        // <Popup
        //   index={selectedQuestion?.index}
        //   title={selectedQuestion?.title}
        //   content={selectedQuestion?.content}
        //   userAnswer={selectedQuestion?.userAnswer}
        //   correctAnswer={selectedQuestion?.correctAnswer}
        //   explanation={selectedQuestion?.explanation}
        //   onClose={handleClosePopup}
        // />
        (!selectedQuestion ? (
          <div className="fixed flex h-full w-full items-center justify-center bg-[#fdfbf3]/50 backdrop:blur-xl">
            <Spinner size="xl" />
          </div>
        ) : (
          <PopupProblem
            size="md"
            onClose={handleClosePopup}
            difficulty={selectedQuestion?.index.toString() ?? ''}
            questionTitle={selectedQuestion?.title ?? ''}
            content={selectedQuestion?.content ?? ''}
            answer={selectedQuestion?.correctAnswer ?? ''}
            explanation={selectedQuestion?.explanation ?? ''}
            userAnswer={selectedQuestion?.userAnswer?.toString() ?? ''}
          />
        ))}
    </div>
  );
};
