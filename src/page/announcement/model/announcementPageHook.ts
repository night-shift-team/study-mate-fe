import {
  getAllNoticeListApi,
  getAllNoticeListRes,
  Notice,
} from '@/feature/notice/api';
import { useEffect, useState } from 'react';
import { AnnouncementType } from '../ui';

const useAnnouncementPage = (noticeList?: Notice[]) => {
  const [currentTab, setCurrentTab] = useState<AnnouncementType>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [announcementList, setAnnouncementList] = useState<
    Notice[] | undefined
  >(noticeList);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const MAX_PAGE = 10;

  const getNoticeListByPage = async (page: number) => {
    setIsLoading(true);

    try {
      console.log('Fetching notices for page:', page - 1, MAX_PAGE);
      const res = await getAllNoticeListApi(page - 1, MAX_PAGE);

      if (res.ok) {
        const noticeList = (res.payload as getAllNoticeListRes).content;
        console.log(noticeList, 'noticeList');

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
    if (!announcementList) {
      getNoticeListByPage(page);
    }
  }, []);

  useEffect(() => {
    if (currentTab === AnnouncementType.Anouncement && announcementList) {
      return;
    }

    if (currentTab === AnnouncementType.Anouncement) {
      getNoticeListByPage(page);
    } else {
      setAnnouncementList([]);
      setPage(1);
      setMaxPage(1);
    }
  }, [announcementList, currentTab, page]);

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
export default useAnnouncementPage;
