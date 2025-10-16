'use client';
import {
  getProblemDetailInfoApi,
  ProblemDetailInfoRes,
} from '@/page/adminProblem/api';
import TestResultSolutionPage from '@/page/level_result_solution/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ScrapProblemDetail = () => {
  const params = useSearchParams();
  const problemId = params.get('problemId') ?? undefined;
  const [problemInfo, setProblemInfo] = useState<ProblemDetailInfoRes>();
  useEffect(() => {
    const getProblemInfo = async (problemId?: string) => {
      if (!problemId) return;
      try {
        const res = await getProblemDetailInfoApi(problemId);
        if (res.ok) {
          setProblemInfo(res.payload as ProblemDetailInfoRes);
          return;
        }
        throw res.payload;
      } catch (e) {
        console.log(e);
      }
    };
    console.log('problemId', problemId);
    getProblemInfo(problemId);
  }, [problemId]);
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        {problemInfo && (
          <TestResultSolutionPage
            type="favorite"
            problemInfo={problemInfo}
            userAnswer={undefined}
          />
        )}
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default ScrapProblemDetail;
