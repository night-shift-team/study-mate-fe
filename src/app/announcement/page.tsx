'use client';
import {
  getAllNoticeListApi,
  getAllNoticeListRes,
  GetValidnoticeListRes,
  Notice,
} from '@/feature/notice/api';
import { useEffect, useState } from 'react';

enum AnnouncementType {
  Anouncement,
  Event,
}

const AnnouncementPage = () => {
  const [currentTab, setCurrentTab] = useState<AnnouncementType>(0);

  const getNoticeList = (currentTab: AnnouncementType) => {
    if (currentTab === AnnouncementType.Anouncement) {
      return [] as Notice[];
    }
    return [] as Notice[];
  };

  const [announcementList, setAnnouncementList] = useState<Notice[]>(
    getNoticeList(currentTab)
  );
  const [page, setPage] = useState(0);
  const MAX_PAGE = 10;

  const getNoticeListByPage = async (page: number) => {
    try {
      const res = await getAllNoticeListApi(page, MAX_PAGE);
      if (res.ok) {
        const noticeList = (res.payload as getAllNoticeListRes).content;
        setAnnouncementList(noticeList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (announcementList.length === 0) {
      const storedAnnouncementList = sessionStorage.getItem('validNoticeList');
      if (storedAnnouncementList) {
        try {
          setAnnouncementList(JSON.parse(storedAnnouncementList) as Notice[]);
        } catch (e) {
          console.log(e);
          setAnnouncementList([] as Notice[]);
        }
      } else {
        getNoticeListByPage(page);
      }
    }
  }, []);

  useEffect(() => {
    //TODO: tab에 따라 공지사항 리스트를 변경
  }, [currentTab]);

  return (
    <div className="flex h-full w-full flex-col p-20">
      <span className="font-jalnan text-3xl">News</span>
      <div className="flex h-full w-full flex-col gap-4 md:gap-6">
        <div className="flex h-full w-full pt-4">
          {/* Announcement , Event Tab */}
          <div className="flex w-[8rem] flex-col gap-3 p-2">
            <button
              onClick={() => setCurrentTab(AnnouncementType.Anouncement)}
              className={`py-1 text-center text-lg font-bold ${currentTab === AnnouncementType.Anouncement ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
            >
              공지사항
            </button>
            <button
              onClick={() => setCurrentTab(AnnouncementType.Event)}
              className={`py-1 text-center text-lg font-bold ${currentTab === AnnouncementType.Event ? 'bg-pointcolor-beigebrown/50 shadow-sm' : ''} rounded-xl`}
            >
              이벤트
            </button>
          </div>
          <div className="flex h-full w-full flex-col gap-4 px-3 py-1">
            {announcementList.map((announcement) => {
              return (
                <div
                  key={announcement.noticeId}
                  className="group flex h-[4rem] w-full items-center justify-between gap-0.5 rounded-xl border bg-white p-3 px-4 shadow-md transition-colors duration-500 hover:cursor-pointer hover:bg-pointcolor-beigebrown"
                >
                  <div className="space-x-1 font-bold">
                    <span>[공지]</span>
                    <span>Title</span>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:font-semibold group-hover:text-white">
                    2023.10.01
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnnouncementPage;
