'use client';
import { useEffect, useRef, useState } from 'react';

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
} from './api';

import { ProblemCategoryType } from '@/shared/constants/problemInfo';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import {
  ProblemFilterComponent,
  ProblemPagination,
  ProblemSearchComponent,
  ProblemTypeSelectionComponent,
} from '@/feature/adminProblem/ui/manageProblemComponents';
import { getProblemListBySearch } from '@/feature/adminProblem/model/getProblemListBySearch';

export type CurrentFilter = '최신 순' | '오래된 순';
export type Problem = GetAdminMAQ | GetAdminSAQ;
export const PAGE_LIMIT = 10;

const ManageProlemPage = () => {
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
  const [problemListStatus, setProblemListStatus] = useState<
    'latest' | 'search'
  >('latest');
  const [searchText, setSearchText] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

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
          prevProblemList.current = (res.payload as GetAdminMAQListRes).content;
          setTotalProblemCount((res.payload as GetAdminMAQListRes).totalPages);
          return;
        }
        throw res.payload as ServerErrorResponse;
      }
      if (problemType === ProblemCategoryType.SAQ) {
        const res = await getAdminSAQListApi(page - 1, limit);
        if (res.ok) {
          setProblemList((res.payload as GetAdminSAQListRes).content);
          prevProblemList.current = (res.payload as GetAdminSAQListRes).content;
          setTotalProblemCount((res.payload as GetAdminSAQListRes).totalPages);
          return;
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
    if (shouldFetch) {
      console.log(currentPage);
      setIsLoading(true);
      if (problemListStatus === 'latest') {
        getProblemList(problemType, currentPage, PAGE_LIMIT).finally(() => {
          setIsLoading(false);
          setShouldFetch(false);
          setSelectedProblem(null);
        });
      }
      if (problemListStatus === 'search') {
        getProblemListBySearch(problemType, searchText, currentPage).finally(
          () => {
            setIsLoading(false);
            setShouldFetch(false);
            setSelectedProblem(null);
          }
        );
      }
    }
  }, [shouldFetch, problemType]);

  useEffect(() => {
    setIsLoading(true);
    if (problemListStatus === 'latest') {
      getProblemList(problemType, currentPage, PAGE_LIMIT).finally(() => {
        setIsLoading(false);
        setSelectedProblem(null);
      });
    }
    if (problemListStatus === 'search') {
      getProblemListBySearch(problemType, searchText, currentPage).finally(
        () => {
          setIsLoading(false);
          setSelectedProblem(null);
        }
      );
    }
  }, [currentPage]);

  useEffect(() => {
    // 문제 타입 변경 시 초기값으로 설정
    setCurrentPage(1);
    setProblemListStatus('latest');
    setShouldFetch(true);
  }, [problemType]);

  console.log(problemList);

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto p-4 scrollbar-hide md:px-10 md:pb-10">
      <Link
        href={RouteTo.AdminManagementProblemCreate}
        className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl border bg-pointcolor-sand p-2 text-sm shadow-sm hover:cursor-pointer hover:inner-border hover:inner-border-pointcolor-beigebrown"
      >
        <span>문제 생성</span>
      </Link>
      <div className="flex h-full w-full flex-col gap-6 md:flex-row">
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
            <ProblemSearchComponent
              problemType={problemType}
              setProblemList={setProblemList}
              setCurrentPage={setCurrentPage}
              setTotalProblemCount={setTotalProblemCount}
              setProblemListStatus={setProblemListStatus}
              searchText={searchText}
              setSearchText={setSearchText}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="mt-2 flex min-h-[33rem] w-full flex-shrink-0 flex-col overflow-auto scrollbar-hide">
            {isLoading ? (
              <Spinner />
            ) : (
              problemList.map((problem, index) => {
                return (
                  <div
                    key={index}
                    className="box-shadow-sm mt-2 flex h-[2.5rem] w-full flex-shrink-0 items-center justify-between rounded-xl border bg-white p-1.5 px-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md md:h-[2.8rem]"
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
                        className="flex h-full w-1/2 items-center justify-center rounded-md border hover:cursor-pointer hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          storeSelectedProblem(problem);
                        }}
                      >
                        수정
                      </Link>
                      <button
                        disabled={true}
                        className="flex h-full w-1/2 items-center justify-center rounded-md border bg-gray-200 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          storeSelectedProblem(problem);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex w-full justify-center py-4">
            <ProblemPagination
              page={currentPage}
              setPage={setCurrentPage}
              paginationSize={totalProblemCount}
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col py-10 md:w-[40%] md:pt-20">
          <span className="flex w-full justify-center text-[1.4rem]">
            {' '}
            Preview
          </span>
          <div className="relative mt-4 flex max-h-[39rem] min-h-[35rem] w-full flex-col rounded-2xl border bg-white p-6 md:h-full">
            <span className="text-lg font-bold">Title</span>
            <span className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
              {isLoading
                ? null
                : selectedProblem
                  ? selectedProblem.questionTitle
                  : (problemList[0]?.questionTitle ?? '')}
            </span>
            <span className="mt-4 text-lg font-bold">Contents</span>
            <div className="mt-1 h-[75%] min-h-[10rem] w-full rounded-3xl border bg-white">
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
    </div>
  );
};
export default AuthHoc(ManageProlemPage);
