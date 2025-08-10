'use client';
import 'swiper/css';
import Card from './Card';
import Profile from './Profile';
import CheckList from './CheckList';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMyPage from '../model/myPageHook';
import Favorite from './Favorite';
import GrassChart from '@/feature/charts/ui/GassCalnerder';

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
    <div className="h-[100vh] w-full bg-black">
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
        <div className="z-1 flex h-[25vh] w-full flex-col px-6 pt-2">
          <Profile />
          <div className="custom-dotted-border flex justify-around text-[24px] font-bold text-white">
            {cardData.map((item, index) => (
              <Card key={index} count={item.count} label={item.label} />
            ))}
          </div>
          {/* <div className="mt-2 flex w-full gap-2">
            {Array.from({ length: 30 }).map((_, idx) => (
              <div key={idx} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div> */}
        </div>
        <div className="flex w-full flex-col gap-6 bg-black px-4 py-6 pb-[70px]">
          <div className="flex flex-col items-center gap-1">
            <label className="flex w-full font-pixel text-title-section font-bold text-white">
              My Activity
            </label>
            <GrassChart />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full items-center justify-between text-base font-bold md:text-lg">
              <span className="font-pixel text-title-section text-white">
                My Scraps
              </span>
              <div className="flex h-full items-center gap-1.5">
                <button
                  onClick={() => scrollByCard('left')}
                  className="text-white"
                >
                  ◀
                </button>
                <button
                  onClick={() => scrollByCard('right')}
                  className="text-white"
                >
                  ▶
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
            )}
          </div>
          <div className="flex flex-col">
            <span className="flex w-full font-pixel text-title-section font-bold text-white">
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
