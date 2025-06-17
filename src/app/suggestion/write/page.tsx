'use client';

import WritePage from '@/page/suggestion/ui/write';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const WriteSuggestionPage = () => {
  return (
    <PageAnimationWrapper>
      <div className="flex h-screen w-[90vw] max-w-[1100px] flex-col">
        <WritePage />
      </div>
    </PageAnimationWrapper>
  );
};
export default WriteSuggestionPage;
