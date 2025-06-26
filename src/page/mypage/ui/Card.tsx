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
  if (label === '문제수') return 'text-[2.5vh]';
};
const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[8vh] w-[10rem] flex-col items-center rounded-xl bg-white p-2 shadow-md md:h-[12vh] md:gap-1 md:rounded-3xl md:pt-5">
      <div
        className={`flex items-center ${label === '문제수' ? 'gap-1' : 'gap-2'}`}
      >
        <span
          className={`flex items-center justify-center ${scaleImage(label)} text-[#FEA1A1]`}
        >
          {img}
        </span>
        <span
          className={`text-[1.8vh] text-gray-600 md:text-sm ${label === '문제수' ? 'text-[tracking-[-0.1em] md:tracking-tighter' : ''} `}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-[1.8vh] md:text-[1.2rem] ${label === '점수' ? 'text-[3vh]' : 'md: pt-0.5'}`}
      >
        {count}
      </span>
    </div>
  );
};

export default Card;
