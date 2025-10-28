import { pageMetadata } from '@/pageMetadata';

import { Suspense } from 'react';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { PageLoader } from '@/feature/spinner/ui/pageLoader';
import AnnouncementServerFetchWrapper from '@/page/announcement/ui/serverFetchWrapper';

export const metadata = pageMetadata.announcement;

const Announcement = () => {
  return (
    <PageAnimationWrapper>
      <Suspense fallback={<PageLoader />}>
        <AnnouncementServerFetchWrapper />
      </Suspense>
    </PageAnimationWrapper>
  );
};
export default Announcement;
