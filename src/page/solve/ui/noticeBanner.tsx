import {
  getAllNoticeListApi,
  getAllNoticeListRes,
  Notice,
  NoticeCategory,
} from '@/feature/notice/api';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';

const tempNotice: Notice = {
  noticeId: 1,
  noticeTitle: '환영합니다',
  noticeContent: '환영합니다',
  noticeCategory: NoticeCategory.GENERAL,
  backgroundImage: '',
  noticePurpose: '환영합니다',
  pulbisherName: '환영합니다',
  displayStartTime: '2023-08-01T00:00:00',
  displayEndTime: '2023-08-01T00:00:00',
  maintenanceStartTime: '2023-08-01T00:00:00',
  maintenanceEndTime: '2023-08-01T00:00:00',
};

const NoticeBanner = () => {
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNoticeList = async (noticeList: Notice[]) => {
    try {
      const res = await getAllNoticeListApi(0, 99999);
      if (res.ok) {
        noticeList.push(...(res.payload as getAllNoticeListRes).content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateNoticeList = async (
    noticeListString: string | null,
    noticeListObject: Notice[]
  ) => {
    // 세션스토리지에 없으면
    if (!noticeListString) {
      // api로 한번 확인하고 있으면 업데이트함
      await getNoticeList(noticeListObject);
      if (noticeListObject.length) {
        setCurrentNotice(noticeListObject[0] ?? tempNotice);
        setNextNotice(noticeListObject[1] ?? noticeListObject[0] ?? tempNotice);

        // 없으면 임시데이터 추가
      } else {
        setCurrentNotice(tempNotice);
        setNextNotice(tempNotice);
      }

      // 세션스토리지에 있으면 파싱해서 데이터 추가
    } else {
      const noticeData: Notice[] = JSON.parse(noticeListString);
      noticeListObject.push(...noticeData);
      setCurrentNotice(noticeData[0] ?? tempNotice);
      setNextNotice(noticeData[1] ?? noticeData[0] ?? tempNotice);
    }
  };
  useLayoutEffect(() => {
    const noticeListString: string | null =
      sessionStorage.getItem('validNoticeList');
    const noticeListObject = [] as Notice[];

    updateNoticeList(noticeListString, noticeListObject).then(() => {
      let i = 0;
      setCurrentNotice(noticeListObject[i]);
      setNextNotice(noticeListObject[(i + 1) % noticeListObject.length]); // 다음 공지사항 설정
      // 1. isAnimating true -> 처음 공지사항 그대로 위로 올라가고 넥스트도 그대로 위로 올라감 -> isAnimating false
      // 2. 500초 후, 처음 공지사항으로 바꾸고 다음 공지사항을 그 다음 걸로 바꿈

      const noticeInterval = setInterval(() => {
        // 애니메이션 준비
        setIsAnimating(true);
        if (!noticeListObject) return;

        setTimeout(() => {
          i = (i + 1) % noticeListObject.length; //* i를 순환하도록 설정
          setCurrentNotice(noticeListObject[i]);
          setNextNotice(noticeListObject[(i + 1) % noticeListObject.length]); // 다음 공지사항 설정
          setIsAnimating(false); // 애니메이션 종료
        }, 1000);
      }, 5000);

      return () => clearInterval(noticeInterval);
    });
  }, []);

  const noticeCategoryDisplayString = (
    category: NoticeCategory | undefined
  ) => {
    switch (category) {
      case NoticeCategory.GENERAL:
        return '공지';
      case NoticeCategory.URGENT:
        return '긴급';
      case NoticeCategory.EVENT:
        return '이벤트';
      case NoticeCategory.MAINTENANCE:
        return;
      default:
        return '';
    }
  };

  return (
    <div className="relative flex h-10 w-full flex-shrink-0 overflow-hidden bg-gray-800/80 px-[1rem] font-doodle text-white md:px-[2.5rem]">
      {/* 현재 공지사항 */}
      <Link
        href={
          currentNotice
            ? `${RouteTo.Announcement}/${currentNotice.noticeId}`
            : '#'
        }
      >
        <div
          className={`absolute flex h-full w-full items-center gap-1 text-ellipsis ${
            isAnimating
              ? '-translate-y-full transition-transform duration-300'
              : 'translate-y-0'
          }`}
        >
          <span>
            [{noticeCategoryDisplayString(currentNotice?.noticeCategory)}]
          </span>
          <span className="underline-offset-4 hover:cursor-pointer hover:underline">
            {currentNotice?.noticeTitle}
          </span>
        </div>
      </Link>
      {/* 다음 공지사항 */}
      <Link
        href={
          nextNotice ? `${RouteTo.Announcement}/${nextNotice.noticeId}` : '#'
        }
      >
        <div
          className={`absolute flex h-full w-full items-center gap-1 text-ellipsis ${
            isAnimating
              ? 'translate-y-0 transition-transform duration-300'
              : 'translate-y-full'
          }`}
        >
          <span>
            [{noticeCategoryDisplayString(currentNotice?.noticeCategory)}]
          </span>
          <span className="underline-offset-4 hover:cursor-pointer hover:underline">
            {nextNotice?.noticeTitle}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NoticeBanner;
