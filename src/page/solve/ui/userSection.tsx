'use client';
import { userStore } from '@/shared/state/userStore/model';
import CharacterImage from '@public/assets/icons/character/Lv1.svg';
import { SvgIcon } from '@mui/material';
import Polygon from '@public/assets/icons/button/check/Polygon.svg';
import DarkPolygon from '@public/assets/icons/button/check/DarkPolygon.svg';

import useSolveMainPage from '../model/solveMainPageHook';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Link from 'next/link';

export const UserSection = () => {
  const { myTodaySolveData } = useSolveMainPage();

  let todaySolveTotal = 0;

  for (const category of myTodaySolveData ?? []) {
    todaySolveTotal += category.userSolvingCount;
  }

  const { user } = userStore.getState();
  return (
    <div className="flex w-full flex-col text-black dark:text-white">
      <div className="font-pixel text-[40px] font-bold">{user?.nickname}!</div>
      <div className="flex justify-between gap-2 p-16p">
        <div className="flex flex-col">
          <span className="text-[18px]">현재 보유 포인트</span>
          <span className="mt-8p text-[16px]">성장한 만큼, 즐기세요!</span>
          <Link href={RouteTo.Store}>
            <span className="flex items-center gap-2 font-pixel text-[20px] font-bold">
              Go to store
              <span className="relative h-[15px] w-[15px]">
                <SvgIcon
                  inheritViewBox
                  component={
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? Polygon
                      : DarkPolygon
                  }
                  sx={{ width: '15px', height: '15px' }}
                />
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-point-yellow">
            <span className="font-pixel text-[24px] font-bold">Today:</span>{' '}
            {todaySolveTotal} 문제 완료
          </div>
        </div>
        <div>
          <SvgIcon
            className="h-[120px] w-[120px]"
            component={CharacterImage}
            inheritViewBox
            sx={{ width: '120px', height: '120px' }}
          />
        </div>
      </div>
    </div>
  );
};
