'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper CSS 가져오기
import { Fragment, useLayoutEffect, useState } from 'react';
import {
  getValidNoticeListApi,
  GetValidnoticeListRes,
  Notice,
} from '@/feature/notice/api';
import { getNoticeList } from '../model/getNoticeList';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { getWithCache } from '@/entities/apiCacheHook';

export const NoticeComponent = () => {
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
        setNoticeList(noticeList.sort((a, b) => a.noticeId - b.noticeId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    const noticeListString: string | null =
      sessionStorage.getItem('validNoticeList');

    if (!noticeListString && noticeList.length === 0) {
      getValidNoticeList();
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
    <div className="relative mx-[-1.5rem] flex h-[10rem] w-[calc(100%+2.5rem)] flex-shrink-0 bg-main-notice bg-[length:150%] bg-[10%_center] bg-no-repeat md:mx-[-2.5rem] md:h-[22rem] md:w-[calc(100%+5rem)] md:bg-cover md:bg-left">
      <div className="flex h-full w-full">
        {noticeList.length ? (
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
            className="relative h-full w-full animate-fade-up" // 전체 너비
          >
            {noticeList.map((notice, index) => (
              <SwiperSlide key={index}>
                <Link
                  className="absolute h-full w-[clamp(100%-8rem,70%-3rem,70%-3rem)] border-black pt-4 [left:clamp(8rem,30%,30%)] md:h-full md:w-[clamp(20rem,50%,40rem)] md:rounded-2xl md:pt-12 md:[left:clamp(22rem,30%,50%)]"
                  href={`${RouteTo.Announcement}/${notice.noticeId}`}
                >
                  <p className="font-parkdahyun text-2xl font-black text-gray-600 md:pb-4">
                    Notice
                  </p>
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
