'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper CSS 가져오기
import { Fragment, useLayoutEffect, useState } from 'react';
import { Notice } from '@/feature/notice/api';
import { getNoticeList } from '../model/getNoticeList';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import NoticeBG from '@/assets/noticeBg.svg';

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
    <div
      className="relative mx-[-1.5rem] flex h-[10rem] w-[calc(100%+2.5rem)] md:mx-[-2.5rem] md:h-[22rem] md:w-[calc(100%+5rem)]"
      style={{
        backgroundImage: `url(${NoticeBG.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
      }}
    >
      <div className="absolute h-full w-[clamp(100%-8rem,70%-3rem,70%-3rem)] [left:clamp(8rem,30%,30%)] md:my-10 md:h-[16rem] md:w-[30rem] md:rounded-2xl md:[left:clamp(22rem,30%,50%)]">
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
          className="h-full w-full md:rounded-2xl" // 전체 너비
        >
          {noticeList.map((notice, index) => (
            <SwiperSlide
              key={index}
              className="relative mb-8 md:rounded-2xl"
              style={{
                // backgroundImage: `url(${notice.noticeImage})`,
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
                <p className="pb-5 font-parkdahyun text-2xl font-black text-gray-600">
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
      </div>
    </div>
  );
};
