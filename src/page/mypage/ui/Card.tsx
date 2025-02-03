import React, { JSX } from 'react';

interface CardProps {
  count: number;
  label: string;
  img: JSX.Element | undefined;
}

const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[8vh] w-[100%] flex-col items-center justify-center rounded-xl bg-white p-3 shadow-md md:h-[100px] md:w-[25%] md:p-4">
      <div className="flex items-center gap-2">
        <span className="flexitems-center justify-center text-[2vh] text-[#FEA1A1]">
          {img}
        </span>
        <span className="text-[2vh] text-gray-600 md:text-base">{label}</span>
      </div>
      <span className="text-[2.5vh] font-bold md:text-3xl">{count}</span>
    </div>
  );
};

export default Card;
