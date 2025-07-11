'use client';
import { CurrentFilter } from '@/page/adminProblem/ui';
import { Dispatch, SetStateAction, useState } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';

export const ProblemFilter = ({
  currentFilter,
  setCurrentFilter,
}: {
  currentFilter: CurrentFilter;
  setCurrentFilter: Dispatch<SetStateAction<CurrentFilter>>;
}) => {
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  return (
    <div
      className={`flex h-8 w-28 rounded-lg ${isFilterClicked ? 'pointer-events-none' : 'hover:bg-gray-200'}`}
    >
      <div className="pointer-events-none flex h-full w-full">
        <button
          className="pointer-events-auto relative flex h-full w-full items-center gap-2 px-2"
          disabled={true}
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
                <span className="text-xs">{'최신 순' as CurrentFilter}</span>
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
        </button>
      </div>
    </div>
  );
};
