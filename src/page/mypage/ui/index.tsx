'use client';
import 'swiper/css';
import Card from './Card';
import Profile from './Profile';
import GrassChart from '@/feature/charts/GrassChart';
import CheckList from './CheckList';

import Arrow from '@public/assets/icons/mypage/check_arrow.svg';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SvgIcon } from '@mui/material';
import useMyPage from '../model/myPageHook';
import Favorite from './Favorite';

const Mypage = () => {
  const {
    cardData,
    favoriteList,
    popUpProblemDetail,
    setPopupProblemDetail,
    questionHistory,
    scrollByCard,
    isPopupOpen,
    setIsPopupOpen,
    swiperRef,
  } = useMyPage();

  return (
    <div className="z-1 h-full w-full outline-none scrollbar-hide md:w-[85%]">
      {isPopupOpen && popUpProblemDetail && (
        <PopupProblem
          size="md"
          questionTitle={popUpProblemDetail.questionTitle}
          difficulty={popUpProblemDetail.difficulty}
          content={popUpProblemDetail.content}
          answer={popUpProblemDetail.answer}
          explanation={popUpProblemDetail.answerExplanation}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
      <div className="flex flex-col items-center">
        <div className="z-1 flex h-[25vh] w-full flex-col items-center bg-[#77a46d] px-6 pt-2 md:flex-row md:justify-between md:gap-4 md:rounded-t-3xl md:py-6">
          <Profile />
          <div className="flex w-[100%] justify-center gap-4 pt-2 md:max-w-[60%] md:justify-end md:pt-0">
            {cardData.map((item, index) => (
              <Card
                key={index}
                count={item.count}
                label={item.label}
                img={item.img}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 px-4 py-6 md:border md:px-8">
          <div className="flex flex-col gap-4">
            <label className="flex w-full text-base font-bold md:text-lg">
              활동 기록
            </label>
            <GrassChart />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full items-center justify-between text-base font-bold md:text-lg">
              <span>스크랩 문제</span>
              <div className="flex h-full items-center gap-1.5">
                <button
                  onClick={() => scrollByCard('left')}
                  className="flex h-8 w-8 items-center justify-center rounded-[50%] bg-[#FEBA73] md:h-[40px] md:w-[40px]"
                >
                  <SvgIcon
                    component={Arrow}
                    inheritViewBox
                    sx={{ width: '55%', height: '55%' }}
                  />
                </button>
                <button
                  onClick={() => scrollByCard('right')}
                  className="flex h-8 w-8 items-center justify-center rounded-[50%] bg-[#FEBA73] md:h-[40px] md:w-[40px]"
                >
                  <SvgIcon
                    component={Arrow}
                    inheritViewBox
                    sx={{ width: '55%', height: '55%' }}
                    className="rotate-180 transform"
                  />
                </button>
              </div>
            </div>

            {typeof favoriteList === 'undefined' ? (
              <Spinner size="md" />
            ) : (
              <Swiper
                spaceBetween={12}
                slidesPerView={'auto'}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="w-full"
              >
                {favoriteList.map((item) => (
                  <SwiperSlide key={item.questionId} style={{ width: '320px' }}>
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
            )}
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {}}
              className="flex w-full text-base font-bold md:text-lg"
            >
              풀이한 문제
            </button>
            <CheckList title="1" questionHistory={questionHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
