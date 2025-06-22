import React from 'react';
import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { csQuizQuestions } from '@/entities/test';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  onClick: (index: number, userAnswer: string | null) => void;
  userAnswer?: string | null;
  title?: string;
}

const Item: React.FC<ItemProps> = ({
  index,
  isCorrectAnswer,
  title,
  onClick,
}) => {
  return (
    <div
      className="flex h-[30px] w-[100%] cursor-pointer items-center gap-2 rounded-lg border bg-white shadow-lg"
      onClick={() => onClick(index, '2')} // 클릭 이벤트
    >
      <div className="w-8 pl-4">
        {
          // userAnswer !== null &&
          isCorrectAnswer ? (
            <CircleCheck
              size={20}
              className="text-green-600"
              strokeWidth={2.5}
            />
          ) : (
            <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
          )
        }
      </div>
      <span className="pl-2">문제</span>
      {index + 1}
      <div>{title}</div>
    </div>
  );
};

export default Item;
