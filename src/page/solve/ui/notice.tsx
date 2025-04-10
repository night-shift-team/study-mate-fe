'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper CSS 가져오기
import { useLayoutEffect, useState } from 'react';
import { Notice } from '@/feature/notice/api';
import { getNoticeList } from '../model/getNoticeList';

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
        className="h-[24rem] w-[100%]" // 전체 너비
      >
        {noticeList.map((notice, index) => (
          <SwiperSlide
            key={index}
            className="mb-8 rounded-lg bg-pointcolor-beigebrown p-6 shadow-md"
            style={{
              backgroundImage: `url(${notice.backgroundImage})`,
              objectPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPositionY: 'center',
            }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Welcome</h2>
            <p className="text-gray-600">{notice.noticeTitle}</p>
            <p className="text-gray-600">{notice.noticeContent}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
