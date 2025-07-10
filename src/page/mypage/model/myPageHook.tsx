import { userStore } from '@/shared/state/userStore';
import { useEffect, useRef, useState } from 'react';
import {
  getQuestionFavoriteApi,
  getQuestionHistoryApi,
  QuestionFavoriteRes,
} from '../api';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import {
  Cloud_IMG,
  Dust_IMG,
  Grain_IMG,
  Peddle_IMG,
  Range_IMG,
  Rock_IMG,
  Star_IMG,
  Strom_IMG,
} from './img';
import Image from 'next/image';
import { LuBookCheck } from 'react-icons/lu';
import { PiRankingLight } from 'react-icons/pi';
import { SlNote } from 'react-icons/sl';
import { Swiper as SwiperType } from 'swiper';
import { getUserRankingApi } from '@/page/rank/api';

const useMyPage = () => {
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const user = userStore.getState().user;
  const swiperRef = useRef<SwiperType | null>(null);
  const [myRanking, setMyRanking] = useState<number>();
  const [totalElements, setTotalElements] = useState<number>();
  const [favoriteList, setFavoriteList] = useState<QuestionFavoriteRes[]>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpProblemDetail, setPopupProblemDetail] =
    useState<ProblemDetailInfoRes | null>(null);

  useEffect(() => {
    userRanking();
    userQuestionHistory();
    userFavoriteApi();
  }, []);

  const userRanking = async () => {
    try {
      const res = await getUserRankingApi(0, 12); // 예제:
      if (res.ok) {
        if (res.payload && 'myRanking' in res.payload) {
          setMyRanking(res.payload.myRanking);
        }
      }
      throw res.payload;
    } catch (error) {
      console.log(error);
    }
  };

  const userQuestionHistory = async () => {
    try {
      const res = await getQuestionHistoryApi(100, 100000);
      if (res.ok) {
        if (res.payload && 'content' in res.payload) {
          setQuestionHistory(res.payload.content);
          setTotalElements(res.payload.totalElements);
        }
      }
      throw res.payload;
    } catch (error) {
      console.error(error);
    }
  };

  const userFavoriteApi = async () => {
    try {
      const res = await getQuestionFavoriteApi(0, 12);
      if (res.ok) {
        if (Array.isArray(res.payload)) {
          setFavoriteList(res.payload as QuestionFavoriteRes[]);
        }
      }
      throw res.payload;
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreTierInfo = (score: number) => {
    if (score >= 256000) return { img: Star_IMG };
    if (score >= 128000) return { img: Strom_IMG };
    if (score >= 32000) return { img: Cloud_IMG };
    if (score >= 16000) return { img: Range_IMG };
    if (score >= 8000) return { img: Rock_IMG };
    if (score >= 4000) return { img: Peddle_IMG };
    if (score >= 2000) return { img: Grain_IMG };
    if (score >= 1000) return { img: Dust_IMG };
    return { img: Dust_IMG };
  };

  const cardData = [
    {
      count: (!myRanking ? '-' : myRanking) + '등',
      label: '순위',
      img: <PiRankingLight />,
    },
    {
      count: (
        <div className="relative aspect-1 w-6 md:w-8">
          {user ? (
            <Image
              src={getScoreTierInfo(user.userScore ?? 0).img}
              alt="Score Tier"
              onError={(e) => (e.currentTarget.src = Dust_IMG)}
              fill
            />
          ) : null}
        </div>
      ),
      label: '점수',
      img: <SlNote />,
    },
    { count: totalElements, label: '문제수', img: <LuBookCheck /> },
  ];

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!swiperRef.current) return;
    if (direction === 'left') {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  return {
    cardData,
    favoriteList,
    popUpProblemDetail,
    setPopupProblemDetail,
    questionHistory,
    scrollByCard,
    isPopupOpen,
    setIsPopupOpen,
    swiperRef,
  };
};
export default useMyPage;
