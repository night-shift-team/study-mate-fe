'use client';
import { Pagination, PaginationItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import useProblemPagination from '../model/problemPaginationHook';
import { useDarkMode } from '@/feature/darkMode/model/isDarkMode';

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
  const { isDarkMode } = useDarkMode();
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
              sx={{
                fontFamily: 'PixelOperator',
                fontSize: '20px',
                fontWeight: 'bold',
                color: isDarkMode ? '#fff' : '#000', // 기본 흰색
                '&.Mui-selected': {
                  color: '#FFA500', // 선택된 페이지 주황색
                  backgroundColor: 'transparent', // 배경 투명
                },
                '&.Mui-disabled': {
                  opacity: 0.4, // 비활성화 화살표
                },
              }}
            />
          )}
          sx={{
            '& .MuiPagination-ul': {
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              gap: '5px',
            },
          }}
        />
      ) : null}
    </>
  );
};
