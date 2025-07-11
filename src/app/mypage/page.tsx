import Mypage from '@/page/mypage/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';
import React from 'react';

export const metadata = pageMetadata.mypage;

const page = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <Mypage />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default page;
