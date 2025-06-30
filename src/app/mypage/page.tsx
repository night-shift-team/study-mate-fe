import Mypage from '@/page/mypage/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';

import React from 'react';

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
