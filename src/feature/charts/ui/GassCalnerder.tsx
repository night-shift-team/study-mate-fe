'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import dayjs from 'dayjs';
import useGrassChart from '../model/grassChartHook';
import { SolveStats } from '@/page/mypage/api';

const GrassChart = ({
  setIsFetched,
}: {
  setIsFetched: Dispatch<SetStateAction<boolean>>;
}) => {
  const { stats } = useGrassChart(setIsFetched);
  const [currentDate, setCurrentDate] = useState(dayjs());

  if (!stats) return null;

  const year = currentDate.year();
  const month = currentDate.month();
  const startOfMonth = dayjs(new Date(year, month, 1));
  const daysInMonth = startOfMonth.daysInMonth();
  const startWeekday = startOfMonth.day();
  const paddedStart = startWeekday === 0 ? 6 : startWeekday - 1;

  // solveDay는 날짜임. YYYY-MM-DD 형식의 문자열
  const historyDatesMap = new Map<string, SolveStats>(
    stats.map((stat) => [stat.solveDay, stat])
  );

  const daysArray = Array.from(
    { length: paddedStart + daysInMonth },
    (_, i) => {
      if (i < paddedStart) return null;
      const day = i - paddedStart + 1;
      const date = dayjs(new Date(year, month, day));
      const stat = historyDatesMap.has(date.format('YYYY-MM-DD'))
        ? historyDatesMap.get(date.format('YYYY-MM-DD'))
        : null;
      return {
        day,
        count: stat?.solveCount || 0,
        date,
      };
    }
  );

  const isCurrentMonth = currentDate.isSame(dayjs(), 'month');

  return (
    <div className="w-full max-w-sm text-white">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-pixel text-[20px] font-semibold text-black dark:text-white">
          {currentDate.format('MMMM YYYY')}
        </span>
        <div className="flex items-center gap-2 text-black dark:text-white">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          >
            ◀
          </button>

          <button
            onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
            disabled={isCurrentMonth}
            className={
              isCurrentMonth
                ? 'cursor-not-allowed text-gray-400 dark:text-gray-800'
                : ''
            }
          >
            ▶
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-3 grid grid-cols-7 text-center text-xs font-bold text-black dark:text-white">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 달력 날짜 셀 */}
      <div className="aspect-square grid h-auto w-full grid-cols-7 gap-2 text-center text-sm">
        {daysArray.map((cell, idx) =>
          cell ? (
            <div
              key={idx}
              className={`flex h-[45px] w-[45px] items-center justify-center rounded-full transition-colors ${getColorByCount(
                cell.count
              )} ${cell.count > 0 ? 'text-black' : 'text-gray-500 dark:text-gray-300'}`}
            >
              {cell.count > 0 ? cell.count : ''}
            </div>
          ) : (
            <div
              key={idx}
              className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-dashed border-gray-400/50 dark:border-white/30"
            />
          )
        )}
      </div>
    </div>
  );
};

export default GrassChart;

const getColorByCount = (count: number) => {
  if (count === 0)
    return 'bg-transparent border border-gray-400/70 dark:border-white/50';
  if (count <= 10) return 'bg-grass-100';
  if (count <= 20) return 'bg-grass-300';
  if (count <= 40) return 'bg-grass-400';
  if (count > 40) return 'bg-grass-500';

  return 'bg-transparent border border-gray-400/70 dark:border-white/50';
};
