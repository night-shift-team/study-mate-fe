'use client';
import { Pagination, PaginationItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import useProblemPagination from '../model/problemPaginationHook';

interface ProblemPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  paginationSize: number;
}

export const ProblemPagination = ({
  page,
  setPage,
  paginationSize,
}: ProblemPaginationProps) => {
  const { isClient, handleChange } = useProblemPagination(setPage);

  return (
    <>
      {isClient ? (
        <Pagination
          count={paginationSize}
          size="medium"
          page={page}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              disabled={
                paginationSize === 0 ||
                (page === 1 &&
                  (item.type === 'next' || item.type === 'previous')) ||
                (page === paginationSize && item.type === 'next')
              }
            />
          )}
        />
      ) : null}
    </>
  );
};
