'use client';
import SolveProblem from '@/page/solve/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';
import React from 'react';

const SolveProblemPage = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <SolveProblem />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};
export default SolveProblemPage;
