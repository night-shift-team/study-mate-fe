'use client';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import SolveSolutionPage from '@/page/solve/ui/solveSolutionPage';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const SolveSolution = () => {
  const searchParams = useSearchParams();

  let userAnswer;
  const problemInfo = useMemo(() => {
    const problemData = searchParams.get('problemInfo');
    const userData = searchParams.get('userAnswer');
    if (!problemData) return null;
    try {
      const solutionData = JSON.parse(decodeURIComponent(problemData));
      userAnswer = userData;
      return solutionData as ProblemDetailInfoRes;
    } catch (e) {
      console.error('Failed to parse problemInfo:', e);
      return null;
    }
  }, [searchParams]);

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <SolveSolutionPage solutionData={problemInfo} userAnswer={userAnswer} />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default SolveSolution;
