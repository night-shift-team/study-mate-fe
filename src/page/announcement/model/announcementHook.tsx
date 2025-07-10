import {
  getAllNoticeListApi,
  getAllNoticeListRes,
  Notice,
} from '@/feature/notice/api';
import { getWithCache } from '@/shared/api/model/apiCacheHook';
import { useEffect, useState } from 'react';
import { AnnouncementType } from '../ui';

const useAnnouncement = () => {
  const [currentTab, setCurrentTab] = useState<AnnouncementType>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [announcementList, setAnnouncementList] = useState<Notice[]>();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const MAX_PAGE = 10;

  const getNoticeListByPage = async (page: number) => {
    setIsLoading(true);

    try {
      const res = await getWithCache({
        key: 'AnnouncementPage-getAllNoticeList',
        fetcher: async () => await getAllNoticeListApi(page - 1, MAX_PAGE),
        expires: 3 * 60 * 60 * 1000,
      }); // 3시간

      if (res.ok) {
        const noticeList = (res.payload as getAllNoticeListRes).content;
        setMaxPage((res.payload as getAllNoticeListRes).totalPages);
        setAnnouncementList(noticeList);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab === AnnouncementType.Anouncement) {
      getNoticeListByPage(page);
    } else {
      setAnnouncementList([]);
      setPage(1);
      setMaxPage(1);
    }
  }, [currentTab, page]);

  return {
    isLoading,
    setCurrentTab,
    announcementList,
    page,
    setPage,
    maxPage,
    currentTab,
  };
};
export default useAnnouncement;
