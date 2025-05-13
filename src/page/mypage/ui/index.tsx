'use client';

import Card from './Card';
import Profile from './Profile';
import { PiRankingLight } from 'react-icons/pi';
import { SlNote } from 'react-icons/sl';
import { LuBookCheck } from 'react-icons/lu';
import GrassChart from '@/feature/charts/GrassChart';
import CheckList from './CheckList';
import { Favorite } from './Favorite';
import { useEffect, useState } from 'react';
import { userStore } from '@/state/userStore';
import {
  getUserRankingApi,
  getQuestionHistoryApi,
  getQuestionFavoriteApi,
  QuestionFavoriteRes,
} from '../api';
import Image from 'next/image';
import {
  Dust_IMG,
  Grain_IMG,
  Peddle_IMG,
  Rock_IMG,
  Range_IMG,
  Cloud_IMG,
  Strom_IMG,
  Star_IMG,
  Universe_IMG,
} from '../../../../public/img';

const Mypage = () => {
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const { user } = userStore();
  const [myRanking, setMyRanking] = useState<number | null>(null);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [favoriteList, setFavoriteList] = useState<any[]>([]);

  useEffect(() => {
    userRanking();
    userQuestionHistory();
    userFavoriteApi();
  }, []);

  const userRanking = async () => {
    try {
      const res = await getUserRankingApi(0, 12); // 예제: 1페이지, 10개 제한
      console.log('rnaking res', res);
      if (res.ok) {
        if (res.payload && 'myRanking' in res.payload) {
          setMyRanking(res.payload.myRanking);
        } else {
          console.log(res.payload);
        }
      } else {
        console.log('API 요청 실패', res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userQuestionHistory = async () => {
    try {
      const res = await getQuestionHistoryApi(100, 100000);
      console.log('userQuestionHistory res', res);
      if (res.ok) {
        if (res.payload && 'content' in res.payload) {
          setQuestionHistory(res.payload.content);
          setTotalElements(res.payload.totalElements);
        } else {
          console.log(res.payload);
        }
      } else {
        console.error('API 요청 실패', res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const userFavoriteApi = async () => {
    try {
      const res = await getQuestionFavoriteApi(0, 10);
      console.log('즐겨찾기 API 응답:', res);
      if (res.ok) {
        if (Array.isArray(res.payload)) {
          setFavoriteList(res.payload as QuestionFavoriteRes[]);
        } else {
          console.error('예상치 못한 응답 구조:', res.payload);
        }
      } else {
        console.error('API 요청 실패', res);
      }
    } catch (error) {
      console.error(error);
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
      count: (myRanking !== null ? myRanking : '-') + '등',
      label: '순위',
      img: <PiRankingLight />,
    },
    {
      count: (
        <div className="relative aspect-1 w-6 md:w-8">
          <Image
            src={getScoreTierInfo(user?.userScore ?? 0).img}
            alt="Score Tier"
            fill
          />
        </div>
      ),
      label: '점수',
      img: <SlNote />,
    },
    { count: totalElements, label: '풀이한 문제', img: <LuBookCheck /> },
  ];

  return (
    <div className="z-1 h-full w-full overflow-y-auto scrollbar-hide md:w-[85%]">
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
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {}}
              className="flex w-full text-base font-bold md:text-lg"
            >
              스크랩 문제
            </button>
            <Favorite title="" favoriteList={favoriteList} />
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
