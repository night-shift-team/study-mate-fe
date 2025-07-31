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
import { Swiper as SwiperType } from 'swiper';
import { getUserRankingApi } from '@/page/rank/api';
import { userStore } from '@/shared/state/userStore/model';

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
          return;
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
          return;
        }
      }
      throw res.payload;
    } catch (error) {
      console.log(error);
    }
  };

  const userFavoriteApi = async () => {
    try {
      const res = await getQuestionFavoriteApi(0, 12);
      if (res.ok) {
        if (Array.isArray(res.payload)) {
          setFavoriteList(res.payload as QuestionFavoriteRes[]);
          return;
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

  const getRankInfo = (myRanking: number) => {
    if (myRanking === 1) return 'st';
    if (myRanking === 2) return 'nd';
    if (myRanking === 1) return 'rd';
    return 'th';
  };

  const cardData = [
    {
      count: (!myRanking ? '-' : myRanking) + getRankInfo(myRanking ?? 0),
      label: 'Rank',
    },
    {
      count: (
        <div className="relative aspect-1 w-6 md:w-8">{user?.userScore}</div>
      ),
      label: 'Score',
    },
    { count: totalElements, label: 'Sloved' },
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
