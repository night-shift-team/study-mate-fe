'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper CSS 가져오기

export const NoticeComponent = () => {
  const notices = ['1', '2', '3'];

  return (
    <div className="flex w-full items-center justify-center">
      {/* Swiper 섹션 */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1} // 한 번에 하나의 슬라이드 보여주기
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-[100%]" // 전체 너비
      >
        {notices.map((notice, index) => (
          <SwiperSlide
            key={index}
            className="mb-8 rounded-lg bg-white p-6 shadow-md"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-800">공지사항</h2>
            <p className="text-gray-600">{notice}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
