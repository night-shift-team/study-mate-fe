'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect,  } from 'react';
import SolveProblem from '@/page/solveProblem/ui';

const SolveProblemPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedData = localStorage.getItem('githubAuthData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData.authInfo);
    
    }
  }, [searchParams]);

  return <SolveProblem />;
};

export default SolveProblemPage;
