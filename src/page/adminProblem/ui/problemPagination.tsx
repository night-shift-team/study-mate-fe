import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

interface ProblemPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  paginationSize: number;
}

const ProblemPagination = ({
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
export default ProblemPagination;
