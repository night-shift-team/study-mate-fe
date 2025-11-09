'use client';

import { SvgIcon } from '@mui/material';
import { UserRankingRes } from '../api';
import { useEffect } from 'react';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';

export const TopRankUser = ({
  user,
  levelIcon,
  heightClass,
  delayClass = '',
  rank,
}: {
  user: UserRankingRes['list'][number] | undefined;
  levelIcon: any;
  heightClass: string;
  delayClass?: string;
  rank: string;
}) => {
  const setPageLoader = pageLoaderStore.getState().setStatus;
  useEffect(() => {
    if (!user) return;
    setPageLoader('loaded');
  }, [user]);
  return (
    <div
      key={user?.loginId}
      className={`relative flex ${heightClass} w-[10rem] animate-fade-up justify-center ${delayClass}`}
    >
      <div className="flex flex-col items-center">
        <span className="text-[20px] text-black dark:text-white">{rank}</span>
        <SvgIcon
          component={levelIcon}
          inheritViewBox
          sx={{ width: 60, height: 60 }}
          className="mt-4"
        />
        <div className="text-[20px] text-black dark:text-white">
          {user?.nickname}
        </div>
        <div className="text-[20px] text-point-yellow">{user?.userScore}</div>
      </div>
    </div>
  );
};
