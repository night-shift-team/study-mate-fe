'use client';
import CountUp from 'react-countup';
import { useEffect, useRef } from 'react';

const ResultSummary = ({
  correct,
  total,
  rate,
}: {
  correct: number;
  total: number;
  rate: number;
}) => {
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const fillBarRef = useRef<HTMLDivElement>(null);
  const decreaseBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!fillBarRef.current || !decreaseBarRef.current) return;
      fillBarRef.current.style.left = `${rate >= 99 ? 99 : rate + 1}%`;
      fillBarRef.current.style.width = `${rate >= 99 ? 100 - rate : 100 - rate - 1}%`;
      decreaseBarRef.current.style.width = `${rate}%`;
    }, 200);
    return () => clearTimeout(id);
  }, [rate]);

  return (
    <div className="flex shrink-0 flex-col">
      <span ref={percentTextRef} className="mt-6 text-[96px] leading-none">
        <CountUp
          start={0}
          end={rate < 0 || rate > 100 ? 0 : rate}
          duration={5}
          delay={0.2}
        />
        %
      </span>
      <div className="relative mt-1 flex h-1 w-full rounded-[2px]">
        {rate < 0 || rate > 100 ? null : (
          <>
            <div
              ref={fillBarRef}
              className={`absolute left-0 top-0 h-1 w-full rounded-[2px] bg-white`}
              style={{ transition: 'all 3000ms cubic-bezier(0, 0, 0, 1)' }}
            />
            <div
              ref={decreaseBarRef}
              className="absolute left-0 top-0 h-1 w-0 rounded-[2px] bg-point-orange"
              style={{ transition: 'all 3000ms cubic-bezier(0, 0, 0, 1)' }}
            />
          </>
        )}
      </div>
      <span className="mt-3 text-[20px] font-bold leading-[1.15] text-point-orange">
        Correct: {correct}/{total}
      </span>
      <span className="text-[20px] font-bold leading-[1.15]">
        Incorrect: {total - correct}/{total}
      </span>
    </div>
  );
};
export default ResultSummary;
