'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoriesIcon } from '../model/getCategoryIcons';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import {
  ProblemCategory,
  ProblemCategoryTitle,
} from '@/shared/constants/problemInfo';
import { NoticeComponent } from './notice';
import { RecentProblem } from './recentProblem';
import NoticeBanner from './noticeBanner';
import { useLayoutEffect, useState } from 'react';
import {
  getQuestionCategoryInfoApi,
  GetQuestionCategoryInfoRes,
  QuestionCategoryInfoDetail,
} from '../api';

interface ProblemCategoryInfo
  extends Omit<
    QuestionCategoryInfoDetail,
    'categoryOriginName' | 'categoryViewName'
  > {
  categoryName: ProblemCategoryTitle;
}

const SolveProblem = () => {
  const [myTodaySolveData, setMyTodaySolveData] =
    useState<ProblemCategoryInfo[]>();

  const getQuestionCategoryInfo = async () => {
    try {
      const res = await getQuestionCategoryInfoApi();
      if (res.ok) {
        const data = (res.payload as GetQuestionCategoryInfoRes).detail;
        const convertedData: ProblemCategoryInfo[] = [];
        data.map((category) => {
          const isTrue = convertedData.findIndex(
            (item) =>
              item.categoryName ===
              (category.categoryOriginName.split(
                '_'
              )[0] as ProblemCategoryTitle)
          );
          if (isTrue >= 0) {
            convertedData[isTrue].userSolvingCount += category.userSolvingCount;
            convertedData[isTrue].solvingLimit += category.solvingLimit;
          } else {
            convertedData.push({
              categoryName: category.categoryOriginName.split(
                '_'
              )[0] as ProblemCategoryTitle,
              userSolvingCount: category.userSolvingCount,
              solvingLimit: category.solvingLimit,
            });
          }
        });
        setMyTodaySolveData(convertedData);
      }
    } catch (e) {}
  };

  useLayoutEffect(() => {
    getQuestionCategoryInfo();
  }, []);

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center gap-5 overflow-y-auto pb-[2rem] scrollbar-hide">
      <div className="z-1 flex w-full flex-col gap-1">
        {/* <NoticeBanner /> */}
      </div>
      <div className="flex w-full flex-col gap-4 px-[1.5rem] md:gap-6 md:px-[2.5rem]">
        <NoticeComponent />
        {/* <RecentProblem /> */}
        <div className="mt-6 flex flex-col gap-2 pt-2">
          <span className="text-center text-xl font-bold">
            카테고리별 문제 풀기
          </span>
          <span className="w-full text-center text-sm">
            관심 있는 카테고리를 선택하여 문제를 풀어보세요
          </span>
        </div>
        <div className="grid w-full place-items-center gap-[1.1rem] md:w-auto md:grid-flow-row md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
          <Link
            href={RouteTo.SolveRandom}
            className="relative flex h-[7rem] w-[100%] min-w-[240px] flex-shrink-0 flex-col items-center justify-center border-t p-2 px-4 transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg md:h-[12rem] md:w-full md:max-w-[480px] md:rounded-sm md:border md:p-4 md:pt-2.5"
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
          {myTodaySolveData &&
            myTodaySolveData.map((category, index) => {
              return (
                <Link
                  href={`${RouteTo.Solve}/${category.categoryName}`}
                  key={index}
                  className="h-[8rem] w-[100%] min-w-[240px] flex-shrink-0 border-t px-4 pt-2.5 transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg hover:inner-border md:h-[12rem] md:w-full md:rounded-sm md:border md:px-7 md:py-4"
                >
                  <div className="relative flex h-full w-full flex-col">
                    <div className="mt-2 flex h-[2rem] items-center gap-2 md:ml-1 md:mt-2 md:h-[2.5rem]">
                      <div className="itmes-center flex aspect-1 h-full items-center justify-center rounded-full bg-[#ffb26b]">
                        {getCategoriesIcon(category.categoryName)}
                      </div>
                      <span
                        className="flex items-center text-lg font-bold md:ml-1"
                        style={{
                          letterSpacing:
                            category.categoryName.length > 20 ? '-0.06rem' : '',
                        }}
                      >
                        {category.categoryName}
                      </span>
                    </div>
                    <span
                      className="ml-1 mt-1.5 flex items-center text-[0.7rem] md:ml-1.5 md:mt-2"
                      style={{
                        letterSpacing:
                          category.categoryName.length > 20 ? '-0.06rem' : '',
                      }}
                    >
                      {'기본적인 알고리즘 문제를 풀어보세요.'}
                    </span>
                    <div className="absolute bottom-7 flex h-2 w-full rounded-xl bg-gray-300 md:bottom-6">
                      <div
                        className={`z-[1] flex h-2 rounded-xl bg-[#ff9f68]`}
                        style={{
                          width:
                            (
                              (category.userSolvingCount * 100) /
                              category.solvingLimit
                            ).toFixed(1) + '%',
                        }}
                      ></div>
                    </div>
                    <p className="absolute bottom-2 right-2 text-xs tracking-tighter md:bottom-0 md:text-sm md:tracking-normal">
                      진행률 :{' '}
                      {(
                        (category.userSolvingCount * 100) /
                        category.solvingLimit
                      ).toFixed(1) + '%'}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default AuthHoc(SolveProblem);
