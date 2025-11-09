'use client';
import {
  getProblemDetailInfoApi,
  ProblemDetailInfoRes,
} from '@/page/adminProblem/api';
import TestResultSolutionPage from '@/page/level_result_solution/ui';
import { getWithCache } from '@/shared/api/model/apiCacheHook';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';

const ScrapProblemDetail = () => {
  const params = useSearchParams();
  const problemId = params.get('problemId') ?? undefined;
  const [problemInfo, setProblemInfo] = useState<ProblemDetailInfoRes>();
  useEffect(() => {
    const getProblemInfo = async (problemId?: string) => {
      if (!problemId) return;
      try {
        const res = await getWithCache({
          key: `/cache/question-detail-${problemId}`,
          fetcher: async () => await getProblemDetailInfoApi(problemId),
          expires: 180 * 24 * 60 * 60 * 1000, // 180일
        });
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

  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    console.log('problemDetailInfo', problemInfo);

    if (problemInfo) {
      setPageLoader('loaded');
    }
  }, [problemInfo]);

  useLayoutEffect(() => {
    setPageLoader('loading');
  }, []);

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        {problemInfo && (
          <TestResultSolutionPage type="favorite" problemInfo={problemInfo} />
        )}
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default ScrapProblemDetail;
