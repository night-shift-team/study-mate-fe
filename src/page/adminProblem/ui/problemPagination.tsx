import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

interface ProblemPaginationProps {
  currentPage: number;
  LAST_PAGE: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
const PAGE_SIZE = 3;

const ProblemPagination = ({ data }: { data: ProblemPaginationProps }) => {
  const [currentPageListCount, setCurrentPageListCount] = useState<number>(0);
  const [initPageNum, setInitPageNum] = useState<number>(
    PAGE_SIZE * currentPageListCount + 1
  );

  useEffect(() => {
    setInitPageNum(PAGE_SIZE * currentPageListCount + 1);
  }, [currentPageListCount]);

  return (
    <Pagination>
      {/* 이전 페이지로 이동 */}
      <button
        disabled={data.currentPage <= 3}
        className={`${data.currentPage <= 3 ? 'bg-none hover:cursor-default' : 'cursor-pointer'}`}
        onClick={() => {
          data.setCurrentPage((currentPageListCount - 1) * PAGE_SIZE + 1);
          setCurrentPageListCount((prev) => prev - 1);
        }}
      >
        <PaginationPrevious />
      </button>

      {/* 페이지 목록 */}
      {initPageNum &&
        Array.from({ length: PAGE_SIZE }).map((_, index) => {
          return (
            <Fragment key={index}>
              {index + currentPageListCount * PAGE_SIZE < data.LAST_PAGE ? (
                <PaginationContent
                  key={index}
                  onClick={() => {
                    data.setCurrentPage(index + initPageNum);
                  }}
                  className={`${data.currentPage === index + initPageNum ? 'bg-gray-200' : ''} `}
                >
                  {index + initPageNum}
                </PaginationContent>
              ) : (
                <Fragment key={index}></Fragment>
              )}
            </Fragment>
          );
        })}

      {/* ... 표기 */}
      {currentPageListCount < Math.floor(data.LAST_PAGE / PAGE_SIZE) ? (
        <PaginationEllipsis />
      ) : (
        <></>
      )}

      {/* 마지막 페이지 버튼 */}
      {currentPageListCount < Math.floor(data.LAST_PAGE / PAGE_SIZE) ? (
        <PaginationContent
          onClick={() => {
            data.setCurrentPage(data.LAST_PAGE);
            setCurrentPageListCount(Math.floor(data.LAST_PAGE / PAGE_SIZE));
          }}
        >
          {data.LAST_PAGE}
        </PaginationContent>
      ) : (
        <></>
      )}

      <button
        disabled={
          currentPageListCount >= Math.floor(data.LAST_PAGE / PAGE_SIZE)
        }
        className={`${data.currentPage + 3 < data.LAST_PAGE ? 'bg-none hover:cursor-default' : 'cursor-pointer'}`}
        onClick={() => {
          data.setCurrentPage((currentPageListCount + 1) * PAGE_SIZE + 1);
          setCurrentPageListCount((prev) => prev + 1);
        }}
      >
        <PaginationNext />
      </button>
    </Pagination>
  );
};
export default ProblemPagination;
