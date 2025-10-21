'use client';
import { useEffect, useRef, useState } from 'react';
import {
  getQuestionFavoriteApi,
  getQuestionHistoryApi,
  QuestionFavoriteRes,
} from '../api';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';

import { Swiper as SwiperType } from 'swiper';
import { getUserRankingApi } from '@/page/rank/api';
import { userStore } from '@/shared/state/userStore/model';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';

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
  const [isFetched, setIsFetched] = useState(false);
  const setLoadingStatus = pageLoaderStore.getState().setStatus;

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
        <div className="relative aspect-1 w-6 md:w-8">
          {myRanking ? user?.userScore : ''}
        </div>
      ),
      label: 'Score',
    },
    { count: totalElements, label: 'Solved' },
  ];

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!swiperRef.current) return;
    if (direction === 'left') {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        userRanking(),
        userQuestionHistory(),
        userFavoriteApi(),
      ]);
    };
    fetchData().finally(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          setIsFetched(true);
        });
      }, 0);
    });
  }, []);

  useEffect(() => {
    console.log('isFetched changed:', isFetched);
    if (cardData[2].count) {
      setLoadingStatus('loaded');
    }
  }, [cardData[2].count]);

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
    setIsFetched,
    isFetched,
  };
};
export default useMyPage;
