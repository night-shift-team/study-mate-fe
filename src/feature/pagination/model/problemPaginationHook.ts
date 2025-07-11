'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useProblemPagination = (setPage: Dispatch<SetStateAction<number>>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return { isClient, handleChange };
};
export default useProblemPagination;
