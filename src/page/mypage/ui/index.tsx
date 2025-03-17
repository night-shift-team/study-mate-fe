'use client';

import Card from './Card';
import Profile from './Profile';
import { PiRankingLight } from 'react-icons/pi';
import { SlNote } from 'react-icons/sl';
import { LuBookCheck } from 'react-icons/lu';
import GrassChart from '@/feature/charts/GrassChart';
import CheckList from './CheckList';
import { useState } from 'react';

const Mypage = () => {
  const cardData = [
    { count: 100, label: '순위', img: <PiRankingLight /> },
    { count: 100, label: '점수', img: <SlNote /> },
    { count: 100, label: '체크한 문제', img: <LuBookCheck /> },
  ];

  const [tap, setTap] = useState('1');

  return (
    <div className="flex h-screen w-screen flex-col items-center md:px-[5%] md:pt-10">
      <div className="relative h-[20vh] w-full flex-col items-center justify-center bg-[#FEA1A1] px-4 py-4 md:rounded-t-3xl">
        <Profile />

        <div className="mt-2 grid w-[100%] grid-cols-2 justify-items-center gap-2 md:absolute md:left-[20%] md:top-[60%] md:mt-0 md:flex md:flex-1 md:gap-4">
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

      <div className="flex h-[80vh] w-full flex-col gap-2 bg-pointcolor-yogurt px-4 py-2 pt-[80px] md:pt-[10%]">
        <div className="mt-[6vh] h-1/2 max-w-full sm:mt-0 md:flex md:gap-3">
          <button className="mb-2 w-[10%] text-nowrap text-[2vh] font-bold text-[#ECCDB4]">
            활동기록
          </button>
          <GrassChart />
        </div>
        <div className="h-1/2 max-w-full md:flex md:gap-3">
          <div className="flex w-[10%] gap-4 md:flex-col">
            <button
              onClick={() => setTap('1')}
              className={`mb-2 text-nowrap text-[2vh] font-bold ${
                tap === '1' ? 'text-[#ECCDB4]' : 'text-gray-300'
              }`}
            >
              풀이한 문제
            </button>
            <button
              onClick={() => setTap('2')}
              className={`mb-2 text-nowrap text-[2vh] font-bold ${
                tap === '2' ? 'text-[#ECCDB4]' : 'text-gray-300'
              }`}
            >
              체크한 문제
            </button>
          </div>

          {tap === '1' && <CheckList title="1" />}
          {tap === '2' && <CheckList title="2" />}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
