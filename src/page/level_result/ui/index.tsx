'use client';

import { GetLevelTestResultRes } from '@/page/level_test/api';
import TestResultContent from './testResultContent';
import CountUp from '@/feature/CountUp/CountUp';

export interface ResultData extends GetLevelTestResultRes {
  userAnswers: number[];
}

const TestResultPage = () => {
  const correct = 16;
  const total = 20;
  const rate: number = Number(((correct / total) * 100).toFixed(2));

  return (
    <div className="flex h-full w-full flex-col px-4 py-5">
      {/* <TestResultContent /> */}
      <span className="text-title-page">Result</span>
      <span className="mt-6 text-[96px] leading-none">
        <CountUp
          from={0}
          to={rate < 0 || rate > 100 ? 0 : rate}
          direction="up"
          delay={0.2}
          duration={1}
        />
        %
      </span>
      <div className="relative mt-2 flex h-1 w-full rounded-[2px]">
        {rate < 0 || rate > 100 ? null : (
          <>
            <div
              className={`absolute left-0 top-0 h-1 w-full rounded-[2px] bg-white transition-all duration-1000 ease-in-out`}
              style={{
                left: String(rate >= 99 ? 99 : rate + 1) + '%',
                width: String(rate >= 99 ? 100 - rate : 100 - rate - 1) + '%',
              }}
            />
            <div
              className="absolute left-0 top-0 h-1 w-0 rounded-[2px] bg-point-orange transition-all duration-1000 ease-in-out"
              style={{ width: String(rate) + '%' }}
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

export default TestResultPage;
