import { getAllNoticeListRes } from '@/feature/notice/api';
import AnnouncementPage from '.';
import { _bffFetch } from '@/app/api/v1/_serverFetch';

const AnnouncementServerFetchWrapper = async () => {
  const res = await _bffFetch<getAllNoticeListRes>({
    method: 'GET',
    path: '/api/v1/notice?page=0&limit=10',
    requestConfig: {
      cache: 'force-cache',
    },
  });

  console.log('Announcement Page called', res.payload);

  return (
    <AnnouncementPage
      noticeList={
        'content' in res.payload && (res.payload as getAllNoticeListRes).content
      }
    />
  );
};
export default AnnouncementServerFetchWrapper;
