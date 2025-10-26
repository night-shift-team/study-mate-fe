import AnnouncementPage from '@/page/announcement/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';
import { getAllNoticeListRes } from '@/feature/notice/api';
import { Suspense } from 'react';
import { PageLoader } from '@/feature/spinner/ui/pageLoader';
import { _serverFetch } from '../api/v1/_serverFetch';

export const metadata = pageMetadata.announcement;
export const revalidate = 0;
const Announcement = async () => {
  const res = await _serverFetch<getAllNoticeListRes>({
    method: 'GET',
    path: '/api/v1/notice?page=0&limit=10',
  });

  console.log('final response', res.payload);
  return (
    <PageAnimationWrapper>
      <Suspense fallback={<PageLoader />}>
        <AnnouncementPage
          noticeList={
            'content' in res.payload &&
            (res.payload as getAllNoticeListRes).content
          }
        />
      </Suspense>
    </PageAnimationWrapper>
  );
};
export default Announcement;
