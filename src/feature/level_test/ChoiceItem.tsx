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
    return isSelected ? 'bg-pointcolor-beigebrown' : 'bg-pointcolor-yogurt';
  };

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border border-goldBorder p-2 shadow-md hover:bg-pointcolor-beigebrown ${getBackgroundClass()}`}
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
    console.log(problemAnswer, index + 1);
    if (problemAnswer !== userAnswer && userAnswer === (index + 1).toString()) {
      return 'bg-wrongRed';
    }
    if (problemAnswer === (index + 1).toString()) {
      return 'bg-correctGreen';
    }
    return 'bg-pointcolor-yogurt';
  };

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border border-goldBorder p-2 shadow-md ss${getBackgroundClass()}`}
    >
      <span>{text}</span>
    </div>
  );
};
