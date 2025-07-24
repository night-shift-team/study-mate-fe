'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { getCategoriesIcon } from '../model/getCategoryIcons';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import RandomIcon from '@public/assets/icons/categoryTitleIcon/randomIcon.svg';
import { SvgIcon } from '@mui/material';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Footer from '@/feature/footer/ui/Footer';
import useSolveMainPage from '../model/solveMainPageHook';
import NoticeSection from './notice';
import { UserSection } from './userSection';
import Polygon from '@public/assets/icons/button/check/Polygon.svg';
import { TabBarComponent } from '@/shared/components/bar/TabBar';

const SolveMainPage = () => {
  const { myTodaySolveData } = useSolveMainPage();

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

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-between overflow-y-auto scrollbar-hide">
      <div className="flex w-full flex-col gap-4 px-[1rem] pb-[5rem] md:gap-6 md:px-[2.5rem]">
        <NoticeSection />
        <UserSection />
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-left font-pixel text-xl font-bold text-white md:text-2xl">
            Quiz Categories
          </span>
        </div>
        {!myTodaySolveData ? (
          <div className="pt-10">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid w-full place-items-center gap-[0.5rem] md:w-auto md:grid-flow-row md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
            <div className="hidden h-[7rem] w-full min-w-[240px] flex-shrink-0 animate-fade-up md:flex md:h-[12rem] md:max-w-[480px]">
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
                  className={`flex h-auto w-full min-w-[240px] flex-shrink-0 md:h-[12rem] md:border-hidden md:pt-0 ${'animate-fade-up ' + 'delay-' + String((index + 1) * 100)}`}
                >
                  <Link
                    href={`${RouteTo.Solve}/${category.categoryName}`}
                    className={`md: flex w-full flex-shrink-0 bg-point-purple/30 p-16p transition-all duration-300 ease-in-out active:scale-[0.97] md:rounded-sm md:border md:bg-transparent md:px-7 md:py-4 md:hover:translate-y-[-5px] md:hover:shadow-lg md:hover:inner-border active:md:scale-100`}
                  >
                    <div className="relative flex h-full w-full flex-col">
                      <div
                        className={`flex flex-col justify-start font-pixel md:text-black`}
                      >
                        {/* <div className="itmes-center relative hidden aspect-1 h-full items-center justify-center md:flex">
                          {getCategoriesIcon(category.categoryName)}
                        </div> */}
                        <div
                          className={`flex items-center gap-2 ${changeCategoryColor[category.categoryName]} md:font-pretandard md:text-black`}
                        >
                          <span
                            className="flex items-center text-[32px] font-bold md:mt-1 md:h-[2.5rem] md:text-[24px] md:font-medium"
                            style={{
                              letterSpacing:
                                category.categoryName.length > 20
                                  ? '-0.06rem'
                                  : '',
                            }}
                          >
                            {category.categoryName}
                          </span>
                          <span className="ml-2 flex text-[24px] font-bold md:hidden">
                            {category.userSolvingCount}/{category.solvingLimit}
                          </span>
                        </div>
                        <span
                          className="flex items-center text-[0.7rem] text-white"
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
                    <div className="flex items-center justify-center gap-2 font-pixel text-[16px] font-bold text-white md:hidden">
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
        )}
      </div>
      {/* <TabBarComponent /> */}
    </div>
  );
};
export default AuthHoc(SolveMainPage);
