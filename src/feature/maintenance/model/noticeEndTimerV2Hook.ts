'use client';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

const useNoticeEndTimerV2 = (endDate: Date) => {
  const currentTime = Date.now();
  const [date, setDate] = useState(
    endDate.getTime() - currentTime <= 0 ? 0 : endDate.getTime() - currentTime
  );
  const days = Math.floor(date / (1000 * 60 * 60 * 24));
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((date % (1000 * 60)) / 1000);

  const router = useRouter();

  useLayoutEffect(() => {
    if (date <= 0) {
      router.refresh();
      return;
    }
    const decreaseRemainTimeInterval = setInterval(() => {
      setDate((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(decreaseRemainTimeInterval);
    };
  }, []);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
export default useNoticeEndTimerV2;
