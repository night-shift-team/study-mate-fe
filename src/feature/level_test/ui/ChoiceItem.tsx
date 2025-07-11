import React from 'react';
import useChoiceItem from '../model/choiceItemHook';

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
  const { getChoiceItemBg } = useChoiceItem(undefined, undefined, isSelected);

  return (
    <div
      className={`flex h-auto w-[100%] cursor-pointer items-center rounded-md border border-goldBorder p-2 shadow-md hover:bg-pointcolor-beigebrown ${getChoiceItemBg()}`}
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
  const { getChoiceItemResultBg } = useChoiceItem(
    problemAnswer,
    userAnswer,
    undefined,
    index
  );

  return (
    <div
      className={`flex h-auto w-[100%] items-center rounded-md border border-goldBorder p-2 shadow-md ${getChoiceItemResultBg()}`}
    >
      <span>{text}</span>
    </div>
  );
};
