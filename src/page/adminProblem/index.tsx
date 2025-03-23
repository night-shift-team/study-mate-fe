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

export type CurrentFilter = '최신 순' | '오래된 순';
export type Problem = GetAdminMAQ | GetAdminSAQ;

const ManageProlemPage = () => {
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
          return;
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
    getProblemList(problemType, currentPage, PAGE_LIMIT);
  }, [problemType, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [problemType]);

  return (
    <div className="relative flex h-full w-full flex-col p-4 md:px-10 md:pb-10">
      <Link
        href={RouteTo.AdminManagementProblemCreate}
        className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl border bg-gray-200 p-2 text-sm hover:cursor-pointer hover:border-2 hover:border-blue-400 hover:bg-blue-200"
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
        <div className="flex h-full w-full flex-col pt-20 md:w-[40%]">
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
    </div>
  );
};
export default AuthHoc(ManageProlemPage);
