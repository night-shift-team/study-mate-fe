import { useEffect, useRef, useState } from 'react';
import { CurrentFilter, Problem } from '../ui';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import {
  getAdminMAQListApi,
  GetAdminMAQListRes,
  getAdminSAQListApi,
  GetAdminSAQListRes,
} from '../api';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { getProblemListBySearch } from '@/feature/adminProblem/model/getProblemListBySearch';
export const PAGE_LIMIT = 10;
const useManageProblem = () => {
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

  return {
    totalProblemCount,
    selectedProblem,
    problemType,
    setProblemType,
    setSelectedProblem,
    searchText,
    setSearchText,
    setTotalProblemCount,
    currentFilter,
    setCurrentFilter,
    problemList,
    setProblemList,
    problemListStatus,
    setProblemListStatus,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    storeSelectedProblem,
  };
};
export default useManageProblem;
