'use client';
import AuthHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { CategoryGridContents } from './categoryGridContents';
import { userStore } from '@/state/userStore';
import { Fragment, useEffect } from 'react';
import { count } from 'console';
import { FaArrowRight, FaComputer } from 'react-icons/fa6';

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
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'Database':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'Network':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case `Data Structure and Algorithm`:
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'Javascript':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'React':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'Typescript':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    case 'Nextjs':
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
      );
    default:
      return (
        <FaComputer className="h-full w-fit items-center justify-center py-0.5" />
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
      {TempCategories.map((category, index) => {
        return (
          <div
            key={index}
            className="relative h-[6rem] w-[100%] flex-shrink-0 rounded-3xl border-2 p-4 shadow-md"
          >
            <div className="itmes-center flex h-[2rem] w-full gap-2">
              {getCategoriesIcon(category.title)}
              <span className="flex h-full items-center font-bold">
                {category.title}
              </span>
            </div>
            <p className="pt-0.5 text-sm">({category.count})</p>
            <Link
              onClick={() => {}}
              href={getCategoriesLink(category.title)}
              className="absolute bottom-3 right-4 rounded-full bg-gray-400 p-2.5"
            >
              <FaArrowRight />
            </Link>
          </div>
        );
      })}

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
