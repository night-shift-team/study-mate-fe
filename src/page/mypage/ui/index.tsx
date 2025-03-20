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
import {
  getUserRankingApi,
  getQuestionHistoryApi,
  QuestionHistoryRes,
} from '../api';

const Mypage = () => {
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const { user } = userStore();
  const [myRanking, setMyRanking] = useState<number | null>(null);

  useEffect(() => {
    console.log('현재 로그인한 유저 정보:', user);
  }, [user]);

  useEffect(() => {
    userRanking();
    userQuestionHistory();
  }, []);

  console.log('questionHistory', questionHistory);

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
      console.log(' userQuestionHistory res', res);
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

  const userScore = user?.userScore ?? 0;
  const userHistoryLength = questionHistory.length;

  const cardData = [
    { count: myRanking + '등', label: '순위', img: <PiRankingLight /> },
    { count: userScore, label: '점수', img: <SlNote /> },
    { count: userHistoryLength, label: '풀이한 문제', img: <LuBookCheck /> },
  ];

  const [tap, setTap] = useState('1');

  return (
    <div className="flex h-screen w-screen flex-col items-center md:px-[5%] md:pt-10">
      <div className="relative flex h-[30vh] w-full flex-col items-center justify-center bg-[#FEA1A1] px-4 py-4 md:rounded-t-3xl">
        <Profile />

        <div className="mt-4 grid w-full max-w-md grid-cols-3 justify-items-center gap-10 md:absolute md:grid-cols-3">
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

      {/* 하단 활동 기록 및 탭 섹션 */}
      <div className="flex h-[70vh] w-full flex-col gap-4 bg-pointcolor-yogurt px-4 py-6 md:px-8">
        {/* 활동 기록 */}
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
