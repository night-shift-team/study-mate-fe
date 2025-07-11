import React from 'react';
import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import Arrow from '@public/assets/icons/leveltest/Arrow 8.svg';
import { SvgIcon } from '@mui/material';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  onClick: (index: number, userAnswer: string | null) => void;
  userAnswer?: string | null;
  title?: string;
  number: number;
}

const Item: React.FC<ItemProps> = ({
  index,
  isCorrectAnswer,
  title,
  number,
  onClick,
}) => {
  return (
    <div
      className="h-auto w-[100%] cursor-pointer flex-col gap-2 rounded-lg bg-white py-3 shadow-lg md:flex md:border-none md:px-4"
      onClick={() => onClick(index, '2')}
    >
      <div className="flex w-full items-center justify-around md:justify-between">
        <div className="flex items-center gap-1">
          <div className="w-3">
            {isCorrectAnswer ? (
              <CircleCheck
                size={20}
                className="text-green-600"
                strokeWidth={2.5}
              />
            ) : (
              <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
            )}
          </div>
          <span className="pl-2 font-semibold">문제 {number}</span>
        </div>

        <span className="flex h-auto w-[20px] md:hidden">
          <SvgIcon
            inheritViewBox
            component={Arrow}
            sx={{ width: '100%', height: '100%' }}
          />
        </span>
      </div>

      <div className="hidden text-sm md:flex">{title}</div>
    </div>
  );
};

export default Item;
