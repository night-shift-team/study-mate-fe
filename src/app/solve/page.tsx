'use client';
import SolveProblemPage from '@/page/solve/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import React from 'react';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.solve;

const SolveProblem = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <SolveProblemPage />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};
export default SolveProblem;
