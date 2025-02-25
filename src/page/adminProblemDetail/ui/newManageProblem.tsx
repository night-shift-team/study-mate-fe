'use client';
import { useState } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import { IoSearch } from 'react-icons/io5';
import {
  PaginationNext,
  Pagination,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationContent,
} from '@/components/ui/pagination';
import ProblemPagination from './problemPagination';

type CurrentFilter = '최신 순' | '오래된 순';

const ProblemList = [
  { id: 1, title: '문제1', date: '2023-01-01' },
  { id: 2, title: '문제2', date: '2023-01-02' },
  { id: 3, title: '문제3', date: '2023-01-03' },
  { id: 4, title: '문제4', date: '2023-01-04' },
  { id: 5, title: '문제5', date: '2023-01-05' },
];
const NewManageProlem = () => {
  const [problemList, setProblemList] = useState(
    ProblemList ?? Array.from({ length: 5 })
  );
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>('최신 순');
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const LAST_PAGE = 10;
  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto p-4 scrollbar-hide">
      <span className="flex w-full justify-center text-[1.4rem]">
        문제 관리
      </span>
      <span className="absolute left-4 top-3 flex w-20 items-center justify-center whitespace-nowrap rounded-xl border bg-gray-200 p-2 text-sm">
        문제 생성
      </span>
      <div className="mt-8 flex w-full flex-col">
        <div className="flex w-full justify-between">
          <ProblemFilterComponent />
          <ProblemSearchComponent />
        </div>
        {ProblemList.map((problem, index) => {
          return (
            <div
              key={index}
              className="mt-2 flex h-[2.5rem] w-full items-center justify-between rounded-xl border bg-gray-300 p-1.5 px-3"
              onClick={(e) => {
                setSelectedProblem(problem.id);
              }}
            >
              <span className="hover:cursor-pointer hover:underline">
                {problem.id} {problem.title} {problem.date}
              </span>
              <div className="flex h-full w-20 gap-1 text-xs">
                <div
                  className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('child');
                  }}
                >
                  수정
                </div>
                <div
                  className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  삭제
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-4 flex w-full justify-center">
          <ProblemPagination
            data={{ currentPage, LAST_PAGE, setCurrentPage }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="mt-8 flex w-full justify-center text-[1.4rem]">
          {' '}
          Preview
        </span>
        <div className="relative mt-4 flex h-[33rem] w-full flex-col rounded-2xl bg-gray-200 p-6">
          <span className="text-lg font-bold">Title</span>
          <span className="mt-2 text-xs">
            {
              '다음 중 객체지향 프로그래밍의 4가지 주요 특징에 포함되지 않는 것은?'
            }
          </span>
          <span className="mt-4 text-lg font-bold">Contents</span>
          <div className="h-[60%] w-full border border-black">
            {'//TODO: MarkDown insert'}
          </div>
          <div className="absolute bottom-4 left-0 flex w-full justify-center">
            <span className="flex items-center justify-center rounded-xl px-3 pb-1 pt-2 text-sm hover:bg-gray-100 hover:underline">
              자세히 보기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewManageProlem;

const ProblemSearchComponent = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="flex h-8 w-36 items-center overflow-y-auto scrollbar-hide">
      <div className="flex aspect-1 h-full justify-center rounded-md border-2">
        <IoSearch className="aspect-1 h-full" />
      </div>
      <input
        type="text"
        placeholder="문제 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="h-full w-full rounded-md border-2 px-1 text-xs"
      />
    </div>
  );
};

const ProblemFilterComponent = () => {
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>('최신 순');
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  return (
    <div
      className={`flex h-8 w-28 rounded-lg ${isFilterClicked ? 'pointer-events-none' : 'hover:bg-gray-200'}`}
    >
      <div className="pointer-events-none flex h-full w-full">
        <div
          className="pointer-events-auto relative flex h-full w-full items-center gap-2 px-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsFilterClicked(!isFilterClicked);
          }}
        >
          <LuArrowDownUp width={'calc(h-full)'} height={'100%'} />
          <span className="text-xs">{currentFilter}</span>
          {isFilterClicked ? (
            <div className="absolute -bottom-1 left-0 flex h-[4.5rem] w-full translate-y-full flex-col items-center justify-center rounded-xl border bg-white">
              <div
                className="flex h-1/2 w-full cursor-pointer items-center gap-2 border-b px-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentFilter('최신 순');
                  setIsFilterClicked(false);
                }}
              >
                <LuArrowDownUp width={'calc(h-full)'} height={'80%'} />
                <span className="text-xs">{'최근 순' as CurrentFilter}</span>
              </div>
              <div
                className="flex h-1/2 w-full cursor-pointer items-center gap-2 px-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentFilter('오래된 순');
                  setIsFilterClicked(false);
                }}
              >
                <LuArrowDownUp width={'calc(h-full)'} height={'80%'} />
                <span className="text-xs">{'오래된 순' as CurrentFilter}</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
