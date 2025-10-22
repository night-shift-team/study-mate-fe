'use client';
import 'swiper/css';
import Card from './Card';
import Profile from './Profile';
import CheckList from './list/CheckList';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMyPage from '../model/myPageHook';
import Favorite from './Favorite';
import GrassChart from '@/feature/charts/ui/GassCalnerder';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useLayoutEffect } from 'react';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import RightTriangle from '@public/assets/icons/button/check/Polygon.svg';

const Mypage = () => {
  const {
    cardData,
    favoriteList,
    setPopupProblemDetail,
    questionHistory,
    scrollByCard,
    isPopupOpen,
    setIsPopupOpen,
    swiperRef,
    setIsFetched,
  } = useMyPage();

  const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    setPageLoader('loading');
    console.log('page loader status:', getPageLoader);
  }, []);

  return (
    <div className="relative flex h-full w-full overflow-y-auto scrollbar-hide">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[20vh] w-full flex-col px-6 pt-2">
          <Profile />
          <div className="custom-dotted-border flex justify-around border-black pb-4 text-[24px] font-bold dark:border-white dark:text-white">
            {cardData.map((item, index) => (
              <Card key={index} count={item.count} label={item.label} />
            ))}
          </div>
        </div>
        <div className="mt-[30px] flex w-full flex-col gap-6 px-4 py-6">
          <div className="flex flex-col items-center gap-1">
            <label className="flex w-full font-pixel text-title-section font-bold text-black dark:text-white">
              My Activity
            </label>
            <GrassChart setIsFetched={setIsFetched} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="mt-3 flex w-full items-center justify-between text-base font-bold md:text-lg">
              <span className="font-pixel text-title-section text-black dark:text-white">
                My Scraps
              </span>

              <Link href={RouteTo.MypageScrap}>
                <div className="flex h-full items-center gap-1.5 pr-4 text-button-1 text-black dark:text-white">
                  See more
                  <button
                    onClick={() => scrollByCard('right')}
                    className="aspect-1 w-[1.2cap]"
                  >
                    <RightTriangle className="fill-black dark:fill-white" />
                  </button>
                </div>
              </Link>
            </div>

            <Swiper
              spaceBetween={12}
              slidesPerView={'auto'}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="w-full"
            >
              {favoriteList &&
                favoriteList.map((item) => (
                  <SwiperSlide key={item.questionId} style={{ width: '200px' }}>
                    <Favorite
                      questionHistory={questionHistory}
                      title=""
                      favoriteList={[item]}
                      setPopupProblemDetail={setPopupProblemDetail}
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="mt-2 flex w-full flex-col">
            <span className="flex w-full font-pixel text-title-section font-bold text-black dark:text-white">
              Solution Archive
            </span>
            <CheckList title="1" questionHistory={questionHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
