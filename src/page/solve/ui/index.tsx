'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { SvgIcon } from '@mui/material';
import useSolveMainPage from '../model/solveMainPageHook';
import { UserSection } from './userSection';
import Polygon from '@public/assets/icons/button/check/Polygon.svg';
import { useEffect, useLayoutEffect } from 'react';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';

const SolveMainPage = () => {
  const { myTodaySolveData } = useSolveMainPage();
  const setPageLoader = pageLoaderStore((s) => s.setStatus);
  const getPageLoader = pageLoaderStore((s) => s.status);

  const changeCategoryName: Record<string, string> = {
    ALGORITHUM: '알고리즘',
    NETWORK: '네트워크',
    OS: '운영체제',
    DB: '데이터베이스',
  };
  const changeCategoryColor: Record<string, string> = {
    ALGORITHUM: 'text-point-pink',
    NETWORK: 'text-point-cyan',
    OS: 'text-success',
    DB: 'text-point-orange',
  };
  useLayoutEffect(() => {
    setPageLoader('loading');
    console.log('page loader status:', getPageLoader);
  }, []);

  useEffect(() => {
    if (!myTodaySolveData) return;
    setPageLoader('loaded');
  }, [myTodaySolveData]);

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-between overflow-y-auto scrollbar-hide">
      <div className="flex w-full flex-col gap-4 px-[1rem] pb-[5rem]">
        {/* <NoticeSection /> */}
        <UserSection />
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-left font-pixel text-[24px] font-bold text-black dark:text-white">
            Quiz Categories
          </span>
        </div>

        <div className="grid w-full place-items-center gap-[0.5rem] pb-[2rem]">
          {myTodaySolveData &&
            myTodaySolveData.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`flex h-auto w-full min-w-[240px] flex-shrink-0 ${'animate-fade-up ' + 'delay-' + String((index + 1) * 100)}`}
                >
                  <Link
                    href={`${RouteTo.Solve}/${category.categoryName}`}
                    className={`md: flex w-full flex-shrink-0 bg-[#451E81] p-16p transition-all duration-300 ease-in-out active:scale-[0.97] dark:bg-point-purple/30`}
                  >
                    <div className="relative flex h-full w-full flex-col">
                      <div className={`flex flex-col justify-start font-pixel`}>
                        <div
                          className={`flex items-center gap-2 ${changeCategoryColor[category.categoryName]}`}
                        >
                          <span
                            className="flex items-center text-[32px] font-bold"
                            style={{
                              letterSpacing:
                                category.categoryName.length > 20
                                  ? '-0.06rem'
                                  : '',
                            }}
                          >
                            {category.categoryName}
                          </span>
                          <span className="ml-2 flex text-[24px] font-bold">
                            {category.userSolvingCount}/{category.solvingLimit}
                          </span>
                        </div>
                        <span
                          className="flex items-center text-[16px] text-white"
                          style={{
                            letterSpacing:
                              category.categoryName.length > 20
                                ? '-0.06rem'
                                : '',
                          }}
                        >
                          오늘 {changeCategoryName[category.categoryName]}{' '}
                          실력은?
                        </span>
                      </div>

                      {/* <div className="absolute bottom-7 hidden h-2 w-full rounded-xl bg-gray-300 md:bottom-8 md:flex">
                        <div
                          className={`z-[1] flex h-2 rounded-xl bg-[#faca77]`}
                          style={{
                            width:
                              (
                                (category.userSolvingCount * 100) /
                                category.solvingLimit
                              ).toFixed(1) + '%',
                          }}
                        ></div>
                      </div> */}

                      {/* <p className="absolute bottom-2 left-[50%] hidden translate-x-[-50%] font-gmarketsans text-xs tracking-tighter md:bottom-0 md:flex md:text-sm md:tracking-normal">
                        {(
                          (category.userSolvingCount * 100) /
                          category.solvingLimit
                        ).toFixed(1) + '%'}
                      </p> */}
                    </div>
                    <div className="flex items-center justify-center gap-2 font-pixel text-[20px] font-bold text-white">
                      START
                      <SvgIcon
                        className="h-[15px] w-[15px]"
                        component={Polygon}
                        inheritViewBox
                        sx={{ width: '15px', height: '15px' }}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      {/* <TabBarComponent /> */}
    </div>
  );
};
export default AuthHoc(SolveMainPage);
