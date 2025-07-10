import {
  getValidNoticeListApi,
  GetValidnoticeListRes,
  Notice,
  NoticeCategory,
} from '@/feature/notice/api';
import { getWithCache } from '@/shared/api/model/apiCacheHook';
import { useLayoutEffect, useState } from 'react';

const useNoticeSection = () => {
  const [noticeList, setNoticeList] = useState<Notice[]>([]);

  const getValidNoticeList = async () => {
    try {
      const res = await getWithCache({
        key: 'NoticeComponent-getValidNoticeList',
        fetcher: async () => await getValidNoticeListApi(),
        expires: 3 * 60 * 60 * 1000, // 3시간
      });
      if (res.ok) {
        const noticeList = (res.payload as GetValidnoticeListRes)
          .displayNotices;
        const sortedNoticeList = noticeList.sort(
          (a, b) => a.noticeId - b.noticeId
        );
        setNoticeList(sortedNoticeList);
        return sortedNoticeList;
      }
      return [] as Notice[];
    } catch (e) {
      console.log(e);
      return [] as Notice[];
    }
  };

  useLayoutEffect(() => {
    const noticeListString: string | null =
      sessionStorage.getItem('validNoticeList');

    if (!noticeListString && noticeList.length === 0) {
      getValidNoticeList().then((sortedNoticeList) => {
        // 임시 노티스 데이터 추가
        if (!sortedNoticeList.length) {
          const tempNotice: Notice[] = [
            {
              noticeId: 0,
              noticeTitle: '환영합니다',
              noticeContent:
                'StudyMate에 오신 것을 환영합니다! 다양한 문제를 풀고, 레벨 테스트를 통해 자신의 실력을 확인해보세요.',
              noticeCategory: NoticeCategory.GENERAL,
              noticePurpose: 'WELCOME',
              pulbisherName: 'system',
              backgroundImage: '',
              displayStartTime: '',
              displayEndTime: '',
              maintenanceStartTime: '',
              maintenanceEndTime: '',
            },
          ];
          setNoticeList(tempNotice);
        }
      });
    }

    if (noticeListString && noticeList.length === 0) {
      try {
        const noticeListObject: Notice[] = JSON.parse(noticeListString);
        setNoticeList(noticeListObject);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return { noticeList };
};
export default useNoticeSection;
