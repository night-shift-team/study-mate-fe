'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { CategoryGridContents } from './categoryGridContents';
import { userStore } from '@/state/userStore';
import { Fragment, useEffect } from 'react';
import { count } from 'console';
import { FaArrowRight, FaComputer } from 'react-icons/fa6';
import MultipleIcon from '@/assets/multipleIcon.png';
import SentenseIcon from '@/assets/sentenseIcon.png';
import Image from 'next/image';

type CategoryTitle =
  | 'Operating System'
  | 'Database'
  | 'Network'
  | 'Data Structure and Algorithm'
  | 'Javascript'
  | 'React'
  | 'Typescript'
  | 'Nextjs';
const TempCategories: { title: CategoryTitle; count: number }[] = [
  {
    title: 'Operating System',
    count: 152,
  },
  {
    title: 'Database',
    count: 152,
  },
  {
    title: 'Network',
    count: 15,
  },

  {
    title: `Data Structure and Algorithm`,
    count: 152,
  },
  {
    title: 'Javascript',
    count: 152,
  },
  {
    title: 'React',
    count: 152,
  },
  {
    title: 'Typescript',
    count: 152,
  },
  {
    title: 'Nextjs',
    count: 152,
  },
];
const getCategoriesIcon = (title: CategoryTitle) => {
  switch (title) {
    case 'Operating System':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'Database':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'Network':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case `Data Structure and Algorithm`:
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'Javascript':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'React':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'Typescript':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    case 'Nextjs':
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
    default:
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
  }
};
const getCategoriesLink = (title: CategoryTitle) => {
  switch (title) {
    case 'Operating System':
      return '/solve/OperatingSystem';
    case 'Database':
      return '/solve/Database';
    case 'Network':
      return '/solve/Network';
    case `Data Structure and Algorithm`:
      return '/solve/DataStructureAndAlgorithm';
    case 'Javascript':
      return '/solve/Javascript';
    case 'React':
      return '/solve/React';
    case 'Typescript':
      return '/solve/Typescript';
    case 'Nextjs':
      return '/solve/Nextjs';
    default:
      return '/solve/OperatingSystem';
  }
};

const SolveProblem = () => {
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center gap-5 overflow-auto px-[2.5rem] py-[3rem]">
      <div className="flex w-full flex-col">
        <span className="w-full text-start text-xl font-bold">
          나의 문제 풀기
        </span>
        <div className="mt-4 flex w-full gap-10 px-10">
          <div className="flex min-h-[8rem] w-[50%] min-w-[20rem] flex-col items-center justify-center rounded-xl bg-white shadow-md hover:cursor-pointer hover:inner-border">
            <div className="mt-6 flex aspect-1 w-[2.6rem] items-center justify-center rounded-full bg-[#3b82f6]/40">
              <Image
                src={MultipleIcon}
                alt="multipleIcon"
                width={20}
                height={20}
              />
            </div>
            <span className="mt-3 text-[1.1rem] font-bold">객관식</span>
            <span className="mt-3 text-sm text-gray-600">
              4개의 보기 중 정답을 선택하세요
            </span>
            <span className="mb-4 mt-3 text-xl font-bold text-[#3b82f6]">
              127 <span className="text-sm font-bold text-[#3b82f6]">문제</span>
            </span>
          </div>
          <div className="flex min-h-[8rem] w-[50%] min-w-[20rem] flex-col items-center justify-center rounded-xl bg-white shadow-md hover:cursor-pointer hover:inner-border">
            <div className="mt-6 flex aspect-1 w-[2.6rem] items-center justify-center rounded-full bg-[#f97316]/50">
              <Image
                src={SentenseIcon}
                alt="multipleIcon"
                width={20}
                height={20}
              />
            </div>
            <span className="mt-3 text-[1.1rem] font-bold">주관식</span>
            <span className="mt-3 text-sm text-gray-600">
              자유롭게 답안을 작성하세요
            </span>
            <span className="mb-4 mt-3 text-xl font-bold text-[#f97316]">
              127 <span className="text-sm font-bold text-[#f97316]">문제</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col gap-2 pt-2">
        <span className="w-full text-start text-xl font-bold">
          카테고리별 문제 풀기
        </span>
        <span className="text-stra w-full text-sm">
          관심 있는 카테고리를 선택하여 문제를 풀어보세요
        </span>
      </div>
      <div className="grid w-full place-items-center gap-5 md:grid-flow-col md:grid-cols-2 md:grid-rows-5 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-2">
        {TempCategories.map((category, index) => {
          return (
            <div
              key={index}
              className="relative h-[6rem] w-[100%] flex-shrink-0 rounded-xl bg-white px-4 pt-2.5 shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-2xl md:h-[12rem] md:w-[16rem] md:p-4"
            >
              <div className="itmes-center flex aspect-1 h-[2rem] items-center justify-center rounded-full bg-red-200 md:ml-1 md:mt-2 md:h-[2.5rem]">
                {getCategoriesIcon(category.title)}
              </div>
              <span
                className="mt-1 flex items-center font-bold md:ml-1 md:mt-4"
                style={{
                  letterSpacing: category.title.length > 20 ? '-0.05rem' : '',
                }}
              >
                {category.title}
              </span>
              <span
                className="flex items-center text-[0.7rem] md:ml-1 md:mt-2"
                style={{
                  letterSpacing: category.title.length > 20 ? '-0.05rem' : '',
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
              {/* <Link
              onClick={() => {}}
              href={getCategoriesLink(category.title)}
              className="absolute top-7 right-4 rounded-full bg-gray-400 p-2.5"
            >
              <FaArrowRight />
            </Link> */}
            </div>
          );
        })}
      </div>
      {/* <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-start gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="운영체제" count={152} />
            <CategoryGridContents title="데이터베이스" count={152} />
            <CategoryGridContents title="네트워크" count={152} />
            <CategoryGridContents title={`자료구조와\n알고리즘`} count={152} />
          </div>
        </div>
      </div>
      <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-end gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="Javascript" count={152} />
            <CategoryGridContents title="React" count={152} />
            <CategoryGridContents title="Nextjs" count={152} />
          </div>
        </div>
        <div className="flex h-full w-[25%] items-center justify-center px-[0.5rem] text-[3vh]">
          Frontend
        </div>
      </div> */}
    </div>
  );
};
export default AuthHoc(SolveProblem);
