'use client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import { IoSearch } from 'react-icons/io5';
import { csQuizQuestions, QuizQuestion } from '@/entities/test';
import ProblemPagination from './problemPagination';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import AuthHoc from '@/shared/auth/model/authHoc';
import {
  GetAdminMAQ,
  getAdminMAQListApi,
  GetAdminMAQListRes,
  GetAdminSAQ,
  getAdminSAQListApi,
  GetAdminSAQListRes,
} from '../api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ProblemCategoryType } from '@/shared/constants/problemInfo';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

type CurrentFilter = '최신 순' | '오래된 순';
export type Problem = GetAdminMAQ | GetAdminSAQ;

const NewManageProlem = () => {
  const PAGE_LIMIT = 10;
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [totalProblemCount, setTotalProblemCount] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const [problemType, setProblemType] = useState<ProblemCategoryType>(
    ProblemCategoryType.MAQ
  );
  const prevProblemList = useRef(problemList);
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>('최신 순');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getProblemList = async (
    problemType: ProblemCategoryType,
    page: number,
    limit: number
  ) => {
    try {
      setIsLoading(true);
      if (problemType === ProblemCategoryType.MAQ) {
        const res = await getAdminMAQListApi(page - 1, limit);
        if (res.ok) {
          setProblemList((res.payload as GetAdminMAQListRes).content);
          setSelectedProblem((res.payload as GetAdminMAQListRes).content[0]);
          prevProblemList.current = (res.payload as GetAdminMAQListRes).content;
          setTotalProblemCount((res.payload as GetAdminMAQListRes).totalPages);
        }
        throw res.payload as ServerErrorResponse;
      }
      if (problemType === ProblemCategoryType.SAQ) {
        const res = await getAdminSAQListApi(page - 1, limit);
        if (res.ok) {
          setProblemList((res.payload as GetAdminSAQListRes).content);
          setSelectedProblem((res.payload as GetAdminSAQListRes).content[0]);
          prevProblemList.current = (res.payload as GetAdminSAQListRes).content;
          setTotalProblemCount((res.payload as GetAdminSAQListRes).totalPages);
        }
        throw res.payload as ServerErrorResponse;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const storeSelectedProblem = (problem: Problem) => {
    if (problem) {
      sessionStorage.setItem('selectedProblemInfo', JSON.stringify(problem));
    }
  };

  useEffect(() => {
    getProblemList(problemType, currentPage, PAGE_LIMIT);
  }, [problemType, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [problemType]);

  return (
    <div className="relative flex h-full w-full flex-col p-4 md:flex-row md:gap-6 md:p-10 md:pb-10">
      <span className="absolute left-4 right-10 top-3 flex w-20 items-center justify-center whitespace-nowrap rounded-xl border bg-gray-200 p-2 text-sm md:left-auto md:top-4">
        문제 생성
      </span>
      <div className="mt-6 flex h-full w-full flex-col md:w-[60%]">
        <span className="flex w-full justify-center text-[1.4rem]">
          문제 관리
        </span>
        <div className="mt-4 flex w-full justify-center">
          <ProblemTypeSelectionComponent
            problemType={problemType}
            setProblemType={setProblemType}
          />
        </div>
        <div className="mt-4 flex w-full justify-between">
          <ProblemFilterComponent
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <ProblemSearchComponent />
        </div>
        <div className="mt-2 flex min-h-[35rem] w-full flex-shrink-0 flex-col overflow-auto scrollbar-hide">
          {isLoading ? (
            <Spinner />
          ) : (
            problemList.map((problem, index) => {
              return (
                <div
                  key={index}
                  className="box-shadow-sm mt-2 flex h-[2.5rem] w-full flex-shrink-0 items-center justify-between rounded-xl border bg-gray-300 p-1.5 px-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md md:mt-3 md:h-[2.8rem]"
                  onClick={(e) => {
                    setSelectedProblem(problem);
                  }}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs hover:cursor-pointer hover:underline md:text-base">
                    {problem.questionTitle}
                  </span>
                  <div className="flex h-full w-20 flex-shrink-0 gap-1 text-xs">
                    <Link
                      href={RouteTo.AdminManagementProblemUpdate}
                      className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        storeSelectedProblem(problem);
                      }}
                    >
                      수정
                    </Link>
                    <Link
                      href={'#'}
                      className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        storeSelectedProblem(problem);
                      }}
                    >
                      삭제
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <ProblemPagination
            page={currentPage}
            setPage={setCurrentPage}
            paginationSize={totalProblemCount}
          />
        </div>
      </div>
      <div className="mt-6 flex h-full w-full flex-col md:w-[40%]">
        <span className="flex w-full justify-center text-[1.4rem]">
          {' '}
          Preview
        </span>
        <div className="relative mt-4 flex max-h-[42rem] min-h-[35rem] w-full flex-col rounded-2xl bg-gray-200 p-6 md:h-full">
          <span className="text-lg font-bold">Title</span>
          <span className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {isLoading
              ? null
              : selectedProblem
                ? selectedProblem.questionTitle
                : (problemList[0]?.questionTitle ?? '')}
          </span>
          <span className="mt-4 text-lg font-bold">Contents</span>
          <div className="h-[75%] min-h-[10rem] w-full border border-black bg-white">
            {isLoading ? null : (
              <MarkdownComponent
                markdown={
                  selectedProblem
                    ? selectedProblem.content
                    : (problemList[0]?.content ?? '')
                }
              />
            )}
          </div>
          <div className="absolute bottom-4 left-0 flex w-full justify-center">
            <Link
              href={RouteTo.AdminManagementProblemDetail}
              className="flex items-center justify-center rounded-xl px-3 pb-1 pt-2 text-sm hover:bg-gray-100 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedProblem) storeSelectedProblem(selectedProblem);
              }}
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthHoc(NewManageProlem);

const ProblemTypeSelectionComponent = ({
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

const ProblemSearchComponent = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextEnter = (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.type === 'click' || ('key' in e && e.key === 'Enter')) {
      //TODO: 검색 api 호출
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
        onKeyDown={handleSearchTextEnter}
        className="h-full w-full rounded-md border-2 px-1 text-xs"
      />
    </div>
  );
};

const ProblemFilterComponent = ({
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
