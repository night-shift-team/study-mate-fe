'use client';
import { Problem } from '@/page/adminProblem/ui';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import { Dispatch, SetStateAction } from 'react';
import useProblemSearch from '../model/problemSearchHook';
import { IoSearch } from 'react-icons/io5';

export const ProblemSearch = ({
  problemType,
  setProblemList,
  setCurrentPage,
  setTotalProblemCount,
  setProblemListStatus,
  searchText,
  setSearchText,
  setIsLoading,
}: {
  problemType: ProblemCategoryType;
  setProblemList: Dispatch<SetStateAction<Problem[]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setTotalProblemCount: Dispatch<SetStateAction<number>>;
  setProblemListStatus: Dispatch<SetStateAction<'latest' | 'search'>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleSearchTextEnter } = useProblemSearch(
    problemType,
    setProblemList,
    setCurrentPage,
    setTotalProblemCount,
    setProblemListStatus,
    searchText,
    setSearchText,
    setIsLoading
  );

  return (
    <div className="flex h-8 w-36 items-center overflow-y-auto scrollbar-hide">
      <div
        className="flex aspect-1 h-full justify-center rounded-md border-2 hover:cursor-pointer active:cursor-grabbing"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          handleSearchTextEnter(e);
        }}
      >
        <IoSearch className="aspect-1 h-full" />
      </div>
      <input
        type="text"
        placeholder="문제 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={async (e) => {
          await handleSearchTextEnter(e);
        }}
        className="h-full w-full rounded-md border-2 px-1 text-xs"
      />
    </div>
  );
};
