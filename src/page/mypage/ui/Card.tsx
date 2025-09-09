import React from 'react';
import { CardProps } from '../model/userInfoCard';

const Card: React.FC<CardProps> = ({ count, label }) => {
  return (
    <div className="flex w-[120px] flex-col items-center font-pixel text-body-primary font-bold text-black dark:text-white">
      <span>{label}</span>
      <span>{count}</span>
    </div>
  );
};

export default Card;
