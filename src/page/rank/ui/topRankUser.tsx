'use client';

import { SvgIcon } from '@mui/material';

export const TopRankUser = ({
  user,
  levelIcon,
  heightClass,
  delayClass = '',
  rank,
}: {
  user: any;
  levelIcon: any;
  heightClass: string;
  delayClass?: string;
  rank: string;
}) => {
  if (!user) return null;

  return (
    <div
      className={`relative flex ${heightClass} w-[10rem] animate-fade-up justify-center ${delayClass}`}
    >
      <div className="flex flex-col items-center">
        <span className="text-[20px]">{rank}</span>
        <SvgIcon
          component={levelIcon}
          inheritViewBox
          sx={{ width: 60, height: 60 }}
          className="mt-4"
        />
        <div className="text-[20px]">{user.nickname}</div>
        <div className="text-[20px] text-point-yellow">{user.userScore}</div>
      </div>
    </div>
  );
};
