import { SendMAQAnswerRes, SendSAQAnswerRes } from '@/page/solve/api';
import React from 'react';

interface ChoiceItemProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
}
interface ChoiceItemResultProps {
  index: number;
  text: string;
  userAnswer: string;
  problemAnswer: string;
}

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
  text,
  onClick,
  isSelected,
}) => {
  const getBackgroundClass = () => {
    return isSelected ? 'bg-[#F0EDD4]' : 'bg-[#D9D9D9]';
  };

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border p-2 shadow-lg hover:bg-[#F0EDD4] ${getBackgroundClass()}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export const ChoicedItemResult: React.FC<ChoiceItemResultProps> = ({
  index,
  text,
  userAnswer,
  problemAnswer,
}) => {
  const getBackgroundClass = () => {
    if (problemAnswer !== userAnswer && userAnswer === (index + 1).toString()) {
      return 'bg-red-200';
    }
    if (problemAnswer === (index + 1).toString()) {
      return 'bg-green-200';
    }
    return 'bg-gray-200';
  };

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border p-2 shadow-lg ${getBackgroundClass()}`}
    >
      <span>{text}</span>
    </div>
  );
};
