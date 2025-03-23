import React, { JSX } from 'react';

interface CardProps {
  count: any;
  label: string;
  img: JSX.Element | undefined;
}

const Card: React.FC<CardProps> = ({ count, label, img }) => {
  return (
    <div className="flex h-[8vh] w-[100%] flex-col items-center justify-center rounded-xl bg-white p-2 shadow-md md:h-[15vh] md:gap-4 md:rounded-3xl">
      <div className="flex items-center gap-2">
        <span className="flexitems-center justify-center text-[2vh] text-[#FEA1A1]">
          {img}
        </span>
        <span className="text-[2vh] text-gray-600 md:text-base">{label}</span>
      </div>
      <span className="text-[2.5vh] font-bold md:text-2xl">{count}</span>
    </div>
  );
};

export default Card;
