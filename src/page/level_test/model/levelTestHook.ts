import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { levelTestCaching } from './levelTestCaching';
import { getLevelTestResultApi, GetLevelTestResultRes } from '../api';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const useLevelTest = () => {
  const router = useRouter();
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  // const [levelTestLists, setLevelTestLists] = useState<ProblemInfoLevelTest[]>(
  //   []
  // );
  // const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isGetResultApiLoading, setIsGetResultApiLoading] =
    useState<boolean>(false);

  const { data: levelTestLists = [], isLoading: isPageLoading } =
    levelTestCaching();

  useEffect(() => {
    if (levelTestLists.length > 0) {
      const questionList = levelTestLists.map((item, index) => ({
        no: index + 1,
        id: item.id,
      }));
      sessionStorage.setItem(
        'levelTestListWithNo',
        JSON.stringify(questionList)
      );
    }
  }, [levelTestLists]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const getLevelTestResult = async (updateAnswer: number[]) => {
    try {
      const reqData = updateAnswer.map((answer, index) => ({
        id: levelTestLists[index].id,
        answer: answer.toString() as '1' | '2' | '3' | '4',
      }));
      const res = await getLevelTestResultApi(reqData);
      if (!res.ok) throw res.payload as ServerErrorResponse;
      return res.payload as GetLevelTestResultRes;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionNo <= 0) return;
    setSelectedAnswer(userAnswers[currentQuestionNo - 1]);
    setCurrentQuestionNo((prev) => prev - 1);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;
    let updateAnswer: number[] = [];
    if (currentQuestionNo <= levelTestLists.length - 1) {
      if (!userAnswers[currentQuestionNo]) {
        updateAnswer = [...userAnswers, selectedAnswer];
        setUserAnswers(updateAnswer);
      } else {
        updateAnswer = [...userAnswers];
        updateAnswer[currentQuestionNo] = selectedAnswer;
        setUserAnswers(updateAnswer);
      }
      if (currentQuestionNo < levelTestLists.length - 1) {
        setSelectedAnswer(userAnswers[currentQuestionNo + 1] ?? null);
        setCurrentQuestionNo((prev) => prev + 1);
        setShowResult(false);
        return;
      }
    }
    // 마지막 문제일 경우
    try {
      setIsGetResultApiLoading(true);
      const res = await getLevelTestResult(updateAnswer);
      const userData = { ...res, userAnswers: updateAnswer };
      sessionStorage.setItem('levelTestResult', JSON.stringify(userData));
      router.push(RouteTo.LevelTestResult);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isPageLoading,
    isStarted,
    setIsStarted,
    currentQuestionNo,
    levelTestLists,
    isGetResultApiLoading,
    selectedAnswer,
    showResult,
    handleAnswerSelect,
    handlePrevQuestion,
    handleNextQuestion,
  };
};
export default useLevelTest;
