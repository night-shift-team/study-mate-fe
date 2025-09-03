'use client';
import SolveSolutionPage from '@/page/solve/ui/solveSolutionPage';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const SolveSolution = () => {
  const searchParams = useSearchParams();

  const problemInfo = useMemo(() => {
    const raw = searchParams.get('problemInfo');
    if (!raw) return null;
    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch (e) {
      console.error('Failed to parse problemInfo:', e);
      return null;
    }
  }, [searchParams]);

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <SolveSolutionPage solutionData={problemInfo} />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default SolveSolution;
