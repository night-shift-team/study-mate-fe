'use client';
import React, { JSX } from 'react';

interface CardProps {
  count: any;
  label: string;
  img: JSX.Element | undefined;
}

const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[8vh] w-[10rem] flex-col items-center justify-center rounded-xl bg-white p-2 shadow-md md:h-[12vh] md:gap-4 md:rounded-3xl">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center text-[2.5vh] text-[#FEA1A1]">
          {img}
        </span>
        <span className="text-[1.5vh] text-gray-600 md:text-base">{label}</span>
      </div>
      <span className="text-[2.3vh] font-bold">{count}</span>
    </div>
  );
};

export default Card;
