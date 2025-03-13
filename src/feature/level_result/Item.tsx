import React from 'react';
import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { csQuizQuestions } from '@/entities/test';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  userAnswer?: string;
}

const Item: React.FC<ItemProps> = ({ index, isCorrectAnswer }) => {
  return (
    <div className="flex w-[100%] items-center justify-center gap-2 rounded-lg bg-white p-2 shadow-lg">
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
