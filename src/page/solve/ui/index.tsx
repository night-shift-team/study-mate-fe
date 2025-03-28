'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { CategoryGridContents } from './categoryGridContents';
import { userStore } from '@/state/userStore';
import { Fragment, useEffect, useState } from 'react';
import { count } from 'console';
import {
  FaArrowRight,
  FaComputer,
  FaNetworkWired,
  FaDatabase,
  FaAlgolia,
} from 'react-icons/fa6';
import MultipleIcon from '@/assets/multipleIcon.png';
import SentenseIcon from '@/assets/sentenseIcon.png';
import Image from 'next/image';
import { getCategoriesIcon } from '../model/getCategoryIcons';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import { NoticeComponent } from './notice';
import { RecentProblem } from './recentProblem';
import NoticeBanner from './noticeBanner';
import {
  PopupConfirm,
  PopupNotice,
  PopupProblem,
} from '@/shared/popUp/ui/popupV2';

const TempCategories: { title: ProblemCategoryTitle; count: number }[] = [
  {
    title: ProblemCategoryTitle.ALGORITHUM,
    count: 152,
  },
  {
    title: ProblemCategoryTitle.DB,
    count: 152,
  },
  {
    title: ProblemCategoryTitle.DESIGN,
    count: 15,
  },
  {
    title: ProblemCategoryTitle.NETWORK,
    count: 152,
  },
  {
    title: ProblemCategoryTitle.OS,
    count: 152,
  },
];

const SolveProblem = () => {
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center gap-5 overflow-y-auto px-[2.5rem] pb-[2rem] scrollbar-hide">
      <div className="flex w-full flex-col gap-1">
        <NoticeBanner />
        <RecentProblem />
        <NoticeComponent />
      </div>
      <div className="mt-6 flex flex-col gap-2 pt-2">
        <span className="text-center text-xl font-bold">
          카테고리별 문제 풀기
        </span>
        <span className="text-stra w-full text-sm">
          관심 있는 카테고리를 선택하여 문제를 풀어보세요
        </span>
      </div>
      <div className="grid w-full place-items-center gap-5 md:w-auto md:grid-flow-row md:grid-cols-2 md:grid-rows-3 md:gap-10 lg:grid-cols-3 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-2">
        <Link
          href={RouteTo.SolveRandom}
          className="relative flex h-[6rem] w-[100%] min-w-[240px] flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white p-2 px-4 shadow-md transition-all duration-300 ease-in-out inner-border inner-border-pointcolor-beigebrown hover:translate-y-[-5px] hover:shadow-2xl md:h-[12rem] md:w-[16rem] md:p-4 md:pt-2.5"
        >
          <span className="text-[1.1rem] font-bold underline-offset-8 md:mt-3">
            랜덤 문제 풀기
          </span>
          <span className="mt-1 text-xs text-gray-600 no-underline md:mt-3">{`모든 카테고리`}</span>
          <span className="hidden text-xs text-gray-600 no-underline md:mt-1 md:block">
            {`4 선택지 또는 주관식`}
          </span>
          <span className="mt-1 text-lg font-bold text-[#3b82f6] no-underline md:mb-4 md:mt-3">
            127 <span className="text-xs font-bold text-[#3b82f6]">문제</span>
          </span>
        </Link>
        {TempCategories.map((category, index) => {
          return (
            <Link
              href={RouteTo.Solve + '/' + category.title}
              key={index}
              className="relative h-[6rem] w-[100%] min-w-[240px] flex-shrink-0 rounded-xl bg-white px-4 pt-2.5 shadow-md transition-all duration-300 ease-in-out inner-border inner-border-pointcolor-beigebrown hover:translate-y-[-5px] hover:shadow-2xl md:h-[12rem] md:w-[16rem] md:p-4"
            >
              <div className="itmes-center flex aspect-1 h-[2rem] items-center justify-center rounded-full bg-red-200 md:ml-1 md:mt-2 md:h-[2.5rem]">
                {getCategoriesIcon(category.title)}
              </div>
              <span
                className="mt-1 flex items-center font-bold md:ml-1 md:mt-4"
                style={{
                  letterSpacing: category.title.length > 20 ? '-0.06rem' : '',
                }}
              >
                {category.title}
              </span>
              <span
                className="flex items-center text-[0.7rem] md:ml-1 md:mt-2"
                style={{
                  letterSpacing: category.title.length > 20 ? '-0.06rem' : '',
                }}
              >
                {'기본적인 알고리즘 문제를 풀어보세요.'}
              </span>
              <div className="absolute right-5 top-5 h-2 w-[50%] rounded-xl bg-gray-300 md:relative md:inset-0 md:ml-1 md:mt-2 md:flex md:w-full">
                <div
                  className={`absolute z-[1] flex h-2 rounded-xl bg-blue-400`}
                  style={{
                    width: ((category.count * 100) / 500).toFixed(1) + '%',
                  }}
                ></div>
              </div>
              <p className="absolute right-5 top-8 text-xs tracking-tighter md:static md:ml-1 md:mt-2 md:pt-0.5 md:text-sm md:tracking-normal">
                진행률 : {((category.count * 100) / 500).toFixed(1) + '%'}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default AuthHoc(SolveProblem);
