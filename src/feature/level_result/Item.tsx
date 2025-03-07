import React from 'react';
import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { csQuizQuestions } from '@/entities/test';

interface ItemProps {
  index: number;
  userAnswer: number | null;
  onClick: (index: number, userAnswer: number | null) => void;
}

const Item: React.FC<ItemProps> = ({ index, userAnswer, onClick }) => {
  const isCorrect =
    userAnswer !== null && userAnswer === csQuizQuestions[index].correctAnswer;

  return (
    <div
      className="flex w-[100%] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-2 shadow-lg"
      onClick={() => onClick(index, userAnswer)} // 클릭 이벤트
    >
      <span>문제</span>
      {index + 1}
      {userAnswer !== null &&
        (isCorrect ? (
          <CircleCheck size={20} className="text-green-600" strokeWidth={2.5} />
        ) : (
          <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
        ))}
    </div>
  );
};

export default Item;
