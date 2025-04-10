'use client';
import { useEffect, useState } from 'react';
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
    setSpeed(0);
  };

  const onRun = () => {
    setSpeed(15);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSpeed(5);
    }
  }, []);

  return (
    <div className="flex w-full rounded-lg bg-opacity-20 px-[0.3rem]">
      {/* <div className="flex items-center whitespace-nowrap bg-black bg-opacity-100 p-1 font-doodle text-xs font-bold tracking-wider text-white md:text-sm">
        📢 New
      </div> */}
      <div className="slide_container">
        <ul
          className="slide_wrapper flex"
          style={{
            animation: `marquee ${speed}s linear infinite`,
          }}
        >
          {[...TempCategories, ...TempCategories].map((item, index) => (
            <li key={index} className="mx-4">
              <div className="w-[20rem] rounded-lg bg-white p-1 px-1.5 inner-border inner-border-pointcolor-beigebrown md:pr-4">
                <div className="flex items-center justify-center gap-1">
                  <div className="flex aspect-1 h-[1.3rem] items-center justify-center rounded-full bg-red-200 md:h-[1.5rem]">
                    {getCategoriesIcon(item.title)}
                  </div>
                  <div className="flex w-full justify-between text-[0.55rem] md:text-[0.7rem]">
                    <div className="flex gap-1">
                      <h3 className="font-bold">[{item.title}]</h3>
                      <span>{item.content}</span>
                    </div>

                    <span>난이도 : {item.difficulty}</span>
                  </div>
                </div>
              </div>
            </li>
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
