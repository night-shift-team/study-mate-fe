'use client';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import SolveSolutionPage from '@/page/solve/ui/solveSolutionPage';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { useSearchParams } from 'next/navigation';
import { useLayoutEffect, useMemo, useState } from 'react';

const SolveSolution = () => {
  const searchParams = useSearchParams();

  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const problemInfo = useMemo(() => {
    const problemData = searchParams.get('problemInfo');
    const userData = searchParams.get('userAnswer');
    console.log('problemData:', problemData, 'userData:', userData);
    if (!problemData) return null;
    try {
      const solutionData = JSON.parse(decodeURIComponent(problemData));
      setUserAnswer(userData);
      return solutionData as ProblemDetailInfoRes;
    } catch (e) {
      console.error('Failed to parse problemInfo:', e);
      return null;
    }
  }, [searchParams]);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);
  const getPageLoader = pageLoaderStore((s) => s.status);

  useLayoutEffect(() => {
    setPageLoader('loading');
    console.log('page loader status:', getPageLoader);
  }, []);

  useLayoutEffect(() => {
    console.log('ProblemInfo', problemInfo);

    if (!problemInfo) return;
    setPageLoader('loaded');
  }, [problemInfo]);

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <SolveSolutionPage
          solutionData={problemInfo}
          userAnswer={userAnswer ?? undefined}
        />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default SolveSolution;
