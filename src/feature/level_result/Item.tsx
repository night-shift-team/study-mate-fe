import React from 'react';
import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { csQuizQuestions } from '@/entities/test';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  onClick: (index: number, userAnswer: string | null) => void;
  userAnswer?: string | null;
}

const Item: React.FC<ItemProps> = ({ index, isCorrectAnswer, onClick }) => {
  return (
    <div
      className="flex w-[100%] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-2 shadow-lg"
      onClick={() => onClick(index, '2')} // 클릭 이벤트
    >
      <span>문제</span>
      {index + 1}
      {
        // userAnswer !== null &&
        isCorrectAnswer ? (
          <CircleCheck size={20} className="text-green-600" strokeWidth={2.5} />
        ) : (
          <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
        )
      }
    </div>
  );
};

export default Item;
