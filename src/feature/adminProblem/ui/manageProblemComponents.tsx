import { CurrentFilter, Problem } from '@/page/adminProblem';
import { ProblemCategoryType } from '@/shared/constants/problemInfo';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { LuArrowDownUp } from 'react-icons/lu';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { Pagination } from '@mui/material';
import {
  GetAdminMAQListRes,
  GetAdminSAQListRes,
  searchAdminMAQListApi,
  searchAdminSAQListApi,
} from '@/page/adminProblem/api';

interface ProblemPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  paginationSize: number;
}

export const ProblemTypeSelectionComponent = ({
  problemType,
  setProblemType,
}: {
  problemType: ProblemCategoryType;
  setProblemType: Dispatch<SetStateAction<ProblemCategoryType>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (problemType: ProblemCategoryType) => {
    setProblemType(problemType);
    setIsOpen(false);
  };

  const problemTypes = [
    { name: '객관식', value: ProblemCategoryType.MAQ },
    { name: '주관식', value: ProblemCategoryType.SAQ },
  ];

  return (
    <div className="flex w-full max-w-sm justify-center">
      {/* Select Button */}
      <button
        type="button"
        className={`relative h-[2.5rem] w-[8rem] rounded-lg border bg-white px-3 py-2 text-left text-gray-900 shadow-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {problemType === ProblemCategoryType.MAQ ? '객관식' : '주관식'}
        <UnfoldMoreRoundedIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 mt-[2.5rem] max-h-60 w-[8rem] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {problemTypes.map((pType) => (
            <li
              key={pType.name}
              className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
                problemType === pType.value ? 'bg-blue-100 text-blue-900' : ''
              }`}
              onClick={() => handleSelect(pType.value)}
            >
              {pType.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ProblemSearchComponent = ({
  problemType,
  setProblemList,
}: {
  problemType: ProblemCategoryType;
  setProblemList: Dispatch<SetStateAction<Problem[]>>;
}) => {
  const [searchText, setSearchText] = useState('');

  const getProblemListBySearch = async (searchText: string) => {
    try {
      if (problemType === ProblemCategoryType.MAQ) {
        const res = await searchAdminMAQListApi(0, 999, searchText);
        if (res.ok) {
          console.log(res.payload);
          setProblemList((res.payload as GetAdminMAQListRes).content);
        }
      }
      if (problemType === ProblemCategoryType.SAQ) {
        const res = await searchAdminSAQListApi(0, 999, searchText);
        if (res.ok) {
          console.log(res.payload);
          setProblemList((res.payload as GetAdminSAQListRes).content);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchTextEnter = async (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.type === 'click' || ('key' in e && e.key === 'Enter')) {
      await getProblemListBySearch(searchText);
      //TODO: 조회 후 로직 처리 필요
      console.log(searchText);
    }
  };

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

export const ProblemFilterComponent = ({
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

export const ProblemPagination = ({
  page,
  setPage,
  paginationSize,
}: ProblemPaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Pagination
      count={paginationSize}
      size="medium"
      page={page}
      onChange={handleChange}
    />
  );
};
