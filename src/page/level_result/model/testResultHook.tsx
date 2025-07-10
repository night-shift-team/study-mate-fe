import { getQuestionDetailApi } from '@/page/mypage/api';
import { userStore } from '@/shared/state/userStore';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { categoryGroups } from './categoryGroupsMeta';
import {
  getProblemDetailInfoApi,
  ProblemDetailInfoRes,
} from '@/page/adminProblem/api';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { ResultData } from '../ui';

const useTestResultContent = () => {
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

  return {
    data,
    calculateLevel,
    correctCount,
    totalQuestions,
    generateCategoryData,
    setSelectedCategoryKey,
    filteredProblems,
    questionInfos,
    resultData,
    popup,
    setPopup,
    router,
    handleOpenPopup,
    selectedQuestion,
    isLoading,
    handleClosePopup,
  };
};
export default useTestResultContent;
