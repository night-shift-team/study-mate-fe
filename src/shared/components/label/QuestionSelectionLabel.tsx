'use client';

import Image from 'next/image';
import {
  OnIcon,
  WrongIcon,
  OffIcon,
  CorrectIcon,
  OpenIcon,
} from '@public/assets/icons/button';
import { useState } from 'react';

type LabelStatus = 'on' | 'off' | 'correct' | 'wrong' | 'open';

interface LabelButtonProps {
  label: string;
  status?: LabelStatus;
}

const getIcon = (status: LabelStatus) => {
  switch (status) {
    case 'on':
      return <Image src={OnIcon} alt="On Icon" width={18} height={18} />;
    case 'off':
      return <Image src={OffIcon} alt="Off Icon" width={18} height={18} />;
    case 'open':
      return <Image src={OpenIcon} alt="Off Icon" width={18} height={18} />;
    case 'correct':
      return (
        <Image src={CorrectIcon} alt="Correct Icon" width={18} height={18} />
      );
    case 'wrong':
      return <Image src={WrongIcon} alt="Wrong Icon" width={18} height={18} />;
    default:
      return null;
  }
};

export const QuestionSelectionLabel = ({
  label,
  status = 'off',
}: LabelButtonProps) => {
  const [currentStatus, setCurrentStatus] = useState<LabelStatus>(status);

  const baseClasses =
    'flex items-center justify-between p-16p rounded-16p font-medium transition-colors min-w-[320px] text-[12px]';

  const statusClasses = {
    on: 'bg-black border-2 border-point-orange text-white',
    off: 'bg-black text-white',
    open: 'bg-black text-white',
    correct: 'bg-success-50 text-white border border-success',
    wrong: 'bg-error-50 text-white border border-error',
  };

  const handleClick = () => {
    if (currentStatus === 'off') {
      setCurrentStatus('on');
    } else if (currentStatus === 'on') {
      setCurrentStatus('off');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${statusClasses[currentStatus]}`}
    >
      <span>{label}</span>
      {getIcon(currentStatus)}
    </button>
  );
};
