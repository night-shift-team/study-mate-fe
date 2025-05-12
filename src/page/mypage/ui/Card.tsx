'use client';
import React, { JSX } from 'react';

interface CardProps {
  count: any;
  label: string;
  img: JSX.Element | undefined;
}

const scaleImage = (label: string) => {
  if (label === '순위') return 'text-[2.8vh]';
  if (label === '점수') return 'text-[2.1vh]';
  if (label === '풀이한 문제') return 'text-[2.5vh]';
};
const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[8vh] w-[10rem] flex-col items-center rounded-xl bg-white p-2 shadow-md md:h-[12vh] md:gap-2 md:rounded-3xl md:pt-5">
      <div
        className={`flex items-center ${label === '풀이한 문제' ? 'gap-1' : 'gap-2'}`}
      >
        <span
          className={`flex items-center justify-center ${scaleImage(label)} text-[#FEA1A1]`}
        >
          {img}
        </span>
        <span
          className={`text-[1.9vh] text-gray-600 md:text-sm ${label === '풀이한 문제' ? 'tracking-tighter' : ''} `}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-[2vh] font-bold md:p-0 ${label === '점수' ? 'text-[3vh] md:pt-1.5' : 'pt-0.5 md:p-0.5'}`}
      >
        {count}
      </span>
    </div>
  );
};

export default Card;
