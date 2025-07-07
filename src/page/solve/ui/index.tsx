'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { getCategoriesIcon } from '../model/getCategoryIcons';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import { NoticeComponent } from './notice';
import { useLayoutEffect, useState } from 'react';
import {
  getQuestionCategoryInfoApi,
  GetQuestionCategoryInfoRes,
  QuestionCategoryInfoDetail,
} from '../api';
import RandomIcon from '@public/assets/icons/categoryTitleIcon/randomIcon.svg';
import { SvgIcon } from '@mui/material';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Footer from '@/feature/footer/ui/Footer';

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
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getQuestionCategoryInfo();
  }, []);

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-between overflow-y-auto scrollbar-hide">
      <div className="flex w-full flex-col gap-4 px-[1rem] pb-[5rem] md:gap-6 md:px-[2.5rem]">
        <NoticeComponent />
        {/* <RecentProblem /> */}
        <div className="mt-6 flex flex-col gap-2 pt-2">
          <span className="text-center text-xl font-bold">CATEGORY</span>
          <span className="w-full text-center text-sm">
            관심 있는 카테고리를 선택하여 문제를 풀어보세요
          </span>
        </div>
        {!myTodaySolveData ? (
          <div className="pt-10">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid w-full place-items-center gap-[0.5rem] md:w-auto md:grid-flow-row md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
            {/* <hr className='md:hidden h-[1px] w-full border' /> */}
            <div className="flex h-[7rem] w-full min-w-[240px] flex-shrink-0 animate-fade-up md:h-[12rem] md:max-w-[480px]">
              <Link
                href={RouteTo.SolveRandom}
                className="relative flex w-full flex-col items-center justify-center p-2 px-4 transition-all duration-300 ease-in-out active:scale-[0.95] md:rounded-sm md:border md:p-4 md:pt-2.5 md:hover:translate-y-[-5px] md:hover:shadow-lg active:md:scale-100"
              >
                <div className="relative flex aspect-1 h-[2rem] items-center justify-center md:h-[3rem]">
                  <SvgIcon
                    component={RandomIcon}
                    inheritViewBox
                    sx={{ width: '100%', height: '100%' }}
                  />
                </div>
                <span className="text-[1.1rem] font-bold underline-offset-8 md:mt-3">
                  랜덤 문제 풀기
                </span>
                <span className="mt-1 text-xs text-gray-600 no-underline md:mt-3">{`모든 카테고리`}</span>
              </Link>
            </div>
            {myTodaySolveData.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`flex h-[9rem] w-full min-w-[240px] flex-shrink-0 border-t pt-[0.5rem] md:h-[12rem] md:border-hidden md:pt-0 ${'animate-fade-up ' + 'delay-' + String((index + 1) * 100)}`}
                >
                  <Link
                    href={`${RouteTo.Solve}/${category.categoryName}`}
                    className={`flex w-full flex-shrink-0 transition-all duration-300 ease-in-out active:scale-[0.97] md:rounded-sm md:border md:px-7 md:py-4 md:hover:translate-y-[-5px] md:hover:shadow-lg md:hover:inner-border active:md:scale-100`}
                  >
                    <div className="relative flex h-full w-full flex-col">
                      <div className="flex h-[4rem] items-center">
                        <div className="itmes-center relative flex aspect-1 h-full items-center justify-center">
                          {getCategoriesIcon(category.categoryName)}
                        </div>
                        <span
                          className="flex items-center text-lg font-bold md:mt-1 md:h-[2.5rem]"
                          style={{
                            letterSpacing:
                              category.categoryName.length > 20
                                ? '-0.06rem'
                                : '',
                          }}
                        >
                          {category.categoryName}
                        </span>
                      </div>
                      <span
                        className="-mt-1.5 ml-1 flex items-center text-[0.7rem] md:-mt-0.5 md:ml-1.5"
                        style={{
                          letterSpacing:
                            category.categoryName.length > 20 ? '-0.06rem' : '',
                        }}
                      >
                        {'기본적인 알고리즘 문제를 풀어보세요.'}
                      </span>
                      <div className="absolute bottom-7 flex h-2 w-full rounded-xl bg-gray-300 md:bottom-8">
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
                      </div>
                      <p className="absolute bottom-2 left-[50%] translate-x-[-50%] font-gmarketsans text-xs tracking-tighter md:bottom-0 md:text-sm md:tracking-normal">
                        {(
                          (category.userSolvingCount * 100) /
                          category.solvingLimit
                        ).toFixed(1) + '%'}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default AuthHoc(SolveProblem);
