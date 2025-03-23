'use client';

import Card from './Card';
import Profile from './Profile';
import { PiRankingLight } from 'react-icons/pi';
import { SlNote } from 'react-icons/sl';
import { LuBookCheck } from 'react-icons/lu';
import GrassChart from '@/feature/charts/GrassChart';
import CheckList from './CheckList';
import { useEffect, useState } from 'react';
import { userStore } from '@/state/userStore';
import { getUserRankingApi, getQuestionHistoryApi } from '../api';

const Mypage = () => {
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const { user } = userStore();
  const [myRanking, setMyRanking] = useState<number | null>(null);

  // useEffect(() => {
  //   console.log('현재 로그인한 유저 정보:', user);
  // }, [user]);

  useEffect(() => {
    userRanking();
    userQuestionHistory();
  }, []);

  // console.log('questionHistory', questionHistory);

  const userRanking = async () => {
    try {
      const res = await getUserRankingApi(0, 12); // 예제: 1페이지, 10개 제한
      console.log(' userRanking res', res);
      if (res.ok) {
        if (res.payload && 'myRanking' in res.payload) {
          setMyRanking(res.payload.myRanking);
        } else {
          console.error(res.payload);
        }
      } else {
        console.error('API 요청 실패', res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userQuestionHistory = async () => {
    try {
      const res = await getQuestionHistoryApi(12);
      if (res.ok) {
        if (res.payload && 'content' in res.payload) {
          setQuestionHistory(res.payload.content);
        } else {
          console.error(res.payload);
        }
      } else {
        console.error('API 요청 실패', res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log('유저정보', user);

  const userScore = user?.userScore ?? 0;
  const userHistoryLength = questionHistory.length;

  const cardData = [
    {
      count: (myRanking !== null ? myRanking : '-') + '등',
      label: '순위',
      img: <PiRankingLight />,
    },
    { count: userScore, label: '점수', img: <SlNote /> },
    { count: userHistoryLength, label: '풀이한 문제', img: <LuBookCheck /> },
  ];

  const [tap, setTap] = useState('1');

  //       <div className="relative flex h-[30vh] w-full flex-col items-center justify-center bg-[#FEA1A1] px-4 py-4 md:rounded-t-3xl">

  return (
    <div className="flex h-screen w-screen flex-col items-center md:px-[5%] md:pt-10">
      <div className="flex h-[30vh] w-full flex-col items-center justify-between bg-[#FEA1A1] px-4 py-4 md:flex-row md:rounded-t-3xl">
        <Profile />

        <div className="flex w-[70%] gap-4">
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
      <div className="flex h-[70vh] w-full flex-col gap-4 bg-pointcolor-yogurt px-4 py-6 md:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <button className="text-[2vh] font-bold text-[#ECCDB4] md:text-[1.5vw]">
            활동기록
          </button>
          <GrassChart />
        </div>

        {/* 탭 및 체크 리스트 */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* 탭 버튼 */}
          <div className="flex justify-center gap-4 md:flex-col">
            <button
              onClick={() => setTap('1')}
              className={`text-[2vh] font-bold ${
                tap === '1' ? 'text-[#ECCDB4]' : 'text-gray-400'
              } md:text-[1.2vw]`}
            >
              풀이한 문제
            </button>
          </div>
          <div className="flex-1">
            <CheckList title="1" questionHistory={questionHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
