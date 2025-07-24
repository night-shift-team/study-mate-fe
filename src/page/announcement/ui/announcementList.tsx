'use client';
import { Notice } from '@/feature/notice/api';

import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { NoticeList } from '@/shared/components/notice/NoticeList';

const AnnouncementList = ({ noticeDetail }: { noticeDetail: Notice }) => {
  const router = useRouter();

  const handleClick = () => {
    sessionStorage.setItem('currentNoticeData', JSON.stringify(noticeDetail));
    router.push(`${RouteTo.Announcement}/${noticeDetail.noticeId}`);
  };
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <NoticeList
        title={noticeDetail.noticeTitle}
        status={'공지'}
        createdAt={noticeDetail.displayStartTime.split('T')[0]}
        content={noticeDetail.noticeContent}
      />
    </div>
  );
};
export default AnnouncementList;
