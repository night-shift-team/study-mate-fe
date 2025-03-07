'use client';
import SolveProblem from '@/page/solve/ui';
import { useSearchParams } from 'next/navigation';

const SolveProblemPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  console.log('githubCode:', code);
  console.log('githubState:', state);
  return <SolveProblem />;
};
export default SolveProblemPage;
