'use client';
import { userStore } from '@/shared/state/userStore/model';
import CharacterImage from '@public/assets/icons/character/Lv1.svg';
import { SvgIcon } from '@mui/material';
import Polygon from '@public/assets/icons/button/check/Polygon.svg';
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
    <div className="flex w-full flex-col text-white md:hidden">
      <div className="font-pixel text-[40px] font-bold">{user?.nickname}!</div>
      <div className="flex justify-between gap-2 p-8p">
        <div className="flex flex-col gap-2">
          <span>현재 보유 포인트</span>
          <span>성장한 만큼, 즐기세요!</span>
          <Link href={RouteTo.Store}>
            <span className="flex items-center gap-2 font-pixel text-[16px] font-bold">
              Go to store
              <SvgIcon
                className="h-[15px] w-[15px]"
                component={Polygon}
                inheritViewBox
                sx={{ width: '15px', height: '15px' }}
              />
            </span>
          </Link>

          <div className="flex items-center gap-2 text-point-yellow">
            <span className="font-pixel text-[24px] font-bold">Today:</span>{' '}
            {todaySolveTotal} 문제 완료
          </div>
        </div>
        <div>
          <SvgIcon
            className="h-[100px] w-[100px]"
            component={CharacterImage}
            inheritViewBox
            sx={{ width: '100px', height: '100px' }}
          />
        </div>
      </div>
    </div>
  );
};
