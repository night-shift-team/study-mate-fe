'use client';
import { GetLevelTestResultRes } from '@/page/level_test/api';

import ButtonPixel from '@/shared/button/buttonPixel';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import LevelTestCategoryProblems from './categoryProblems';
import ResultSummary from './resultSummary';
import useTestResultContent from '../model/testResultHook';
import { PageLoader } from '@/feature/spinner/ui/pageLoader';
import { useEffect, useState } from 'react';
import { UserAnswerWithId } from '@/page/level_test/model/levelTestHook';

export interface ResultData extends GetLevelTestResultRes {
  userAnswers: number[];
}

const TestResultPage = () => {
  const { questionInfos, resultData } = useTestResultContent();
  const [userAnswers, setUserAnswers] = useState<UserAnswerWithId[]>([]);
  const correct = resultData?.correctQuestions.length ?? 0;
  const total = resultData?.requestedQuestionCount ?? 1;

  const rate =
    resultData?.percentileScore ?? Number(((correct / total) * 100).toFixed(2));

  const problemListsArray = Object.entries(questionInfos).map(
    ([key, value]) => ({
      id: key,
      ...value,
    })
  );
  const correctIds = new Set(resultData?.correctQuestions ?? []);
  const wrongIds = new Set(resultData?.wrongQuestions ?? []);

  const getUserSolveHistory = () => {
    const userLevelTestSolveHistory = sessionStorage.getItem(
      'levelTestUserAnswersWithId'
    );
    if (!userLevelTestSolveHistory) return;
    try {
      const userAnswersWithId: UserAnswerWithId[] = JSON.parse(
        userLevelTestSolveHistory
      );
      return userAnswersWithId;
    } catch (e) {
      console.log(e);
      return;
    }
  };
  useEffect(() => {
    setUserAnswers(getUserSolveHistory() ?? []);
  }, []);

  if (problemListsArray.length === 0) {
    return <PageLoader size="lg" />;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-4 py-5 scrollbar-hide">
      {/* <TestResultContent /> */}
      <span className="text-title-page">Result</span>
      <ResultSummary correct={correct} total={total} rate={rate} />
      <LevelTestCategoryProblems
        correctIds={correctIds}
        wrongIds={wrongIds}
        problemsIdWithTitle={problemListsArray}
        userAnswers={userAnswers}
      />
      <Link href={RouteTo.Home}>
        <ButtonPixel status="default">Go to Home</ButtonPixel>
      </Link>
    </div>
  );
};

export default TestResultPage;
