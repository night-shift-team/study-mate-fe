import React, { JSX } from 'react';

interface CardProps {
  count: number;
  label: string;
  img: JSX.Element | undefined;
}

const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[70px] w-[100%] flex-col items-center justify-center rounded-xl bg-white p-3 shadow-md md:h-[100px] md:w-[25%] md:p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center text-xl text-[#FEA1A1] md:h-8 md:w-8 md:text-2xl">
          {img}
        </span>
        <span className="text-sm text-gray-600 md:text-base">{label}</span>
      </div>
      <span className="text-2xl font-bold md:text-3xl">{count}</span>
    </div>
  );
};

export default Card;
