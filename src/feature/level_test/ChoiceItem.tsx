import React from 'react';

interface ChoiceItemProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
}

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
  text,
  onClick,
  isSelected,
  //   isCorrect,
  showResult,
}) => {
  const getBackgroundClass = () => {
    if (!showResult) return isSelected ? 'bg-[#F0EDD4]' : 'bg-[#D9D9D9]';
  };

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border p-2 shadow-lg hover:bg-[#F0EDD4] ${getBackgroundClass()}`}
      onClick={!showResult ? onClick : undefined}
    >
      {text}
    </div>
  );
};
