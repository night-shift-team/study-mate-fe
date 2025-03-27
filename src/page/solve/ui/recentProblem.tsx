'use client';
import { useState } from 'react';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import { getCategoriesIcon } from '../model/getCategoryIcons';
import Link from 'next/link';

const TempCategories = [
  {
    title: ProblemCategoryTitle.ALGORITHUM,
    content: '문제제목',
    link: '/',
    difficulty: 1,
  },
  {
    title: ProblemCategoryTitle.DB,
    content: '문제제목',
    link: '/',
    difficulty: 1,
  },
  {
    title: ProblemCategoryTitle.DESIGN,
    content: '문제제목',
    link: '/',
    difficulty: 1,
  },
  {
    title: ProblemCategoryTitle.NETWORK,
    content: '문제제목',
    link: '/',
    difficulty: 1,
  },
  {
    title: ProblemCategoryTitle.OS,
    content: '문제제목',
    link: '/',
    difficulty: 1,
  },
];

export const RecentProblem = () => {
  const [speed, setSpeed] = useState(15); // 기본 속도 설정

  const onStop = () => {
    setSpeed(20);
  };

  const onRun = () => {
    setSpeed(15);
  };

  return (
    <div className="w-full rounded-lg bg-black bg-opacity-20 p-4">
      <div
        className="slide_container"
        onMouseEnter={onStop}
        onMouseLeave={onRun}
      >
        <ul
          className="slide_wrapper flex"
          style={{
            animation: `marquee ${speed}s linear infinite`,
          }}
        >
          {[...TempCategories, ...TempCategories].map((item, index) => (
            <Link key={index} href={item.link}>
              <li className="mx-4">
                <div className="w-[40vh] rounded-lg bg-white p-2">
                  <div className="flex gap-2">
                    <div className="aspect-square flex h-[2rem] items-center justify-center rounded-full bg-red-200 md:h-[2.5rem] md:w-[3rem]">
                      {getCategoriesIcon(item.title)}
                    </div>
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex justify-between">
                        <h3 className="text-[0.7rem] font-bold">
                          {item.title}
                        </h3>
                        <span className="text-[0.7rem]">
                          난이도 : {item.difficulty}
                        </span>
                      </div>
                      <p className="text-[0.7rem]">{item.content}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .slide_container {
          overflow: hidden;
          position: relative;
        }

        .slide_wrapper {
          display: flex;
          flex-wrap: nowrap;
        }
      `}</style>
    </div>
  );
};
