'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper CSS 가져오기
import { Fragment, useLayoutEffect, useState } from 'react';
import { Notice } from '@/feature/notice/api';
import { getNoticeList } from '../model/getNoticeList';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

export const NoticeComponent = () => {
  const [noticeList, setNoticeList] = useState<Notice[]>([]);

  useLayoutEffect(() => {
    const noticeListString: string | null =
      sessionStorage.getItem('validNoticeList');

    if (!noticeListString && noticeList.length === 0) {
      getNoticeList().then((list) => {
        if (list) {
          setNoticeList(list.sort((a, b) => a.noticeId - b.noticeId));
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

  return (
    <div className="mt-2 flex w-full items-center justify-center">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1} // 한 번에 하나의 슬라이드 보여주기
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="h-[6rem] w-[100%] md:h-[24rem]" // 전체 너비
      >
        {noticeList.map((notice, index) => (
          <SwiperSlide
            key={index}
            className="relative mb-8 rounded-2xl bg-pointcolor-beigebrown"
            style={{
              backgroundImage: `url(${notice.backgroundImage})`,
              objectPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPositionY: 'center',
            }}
          >
            <Link
              className="absolute h-full w-full p-6"
              href={`${RouteTo.Announcement}/${notice.noticeId}`}
            >
              <p className="text-sm font-black text-gray-600">
                {notice.noticeTitle}
              </p>
              <p className="hidden text-xs text-gray-600 md:block">
                {notice.noticeContent}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
