'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useGrassChart from '../model/grassChartHook';

const getColorByCount = (count: number) => {
  if (count === 0) return 'bg-grass border border-white';
  if (count <= 2) return 'bg-grass-100';
  if (count <= 4) return 'bg-grass-200';
  if (count <= 7) return 'bg-grass-300';
  if (count <= 10) return 'bg-grass-400';

  return 'bg-grass-500';
};

const GrassChart = () => {
  const { stats } = useGrassChart();

  const [currentDate, setCurrentDate] = useState(dayjs());

  if (!stats) return <Spinner />;

  const year = currentDate.year();
  const month = currentDate.month();
  const startOfMonth = dayjs(new Date(year, month, 1));
  const daysInMonth = startOfMonth.daysInMonth();
  const startWeekday = startOfMonth.day();
  const paddedStart = startWeekday === 0 ? 6 : startWeekday - 1;

  const daysArray = Array.from(
    { length: paddedStart + daysInMonth },
    (_, i) => {
      if (i < paddedStart) return null;
      const day = i - paddedStart + 1;
      const date = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
      const stat = stats.find((s) => s.solveDay === date);
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
        <span className="font-pixel text-[20px] font-semibold">
          {currentDate.format('MMMM YYYY')}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          >
            ◀
          </button>

          <button
            onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
            disabled={isCurrentMonth}
            className={isCurrentMonth ? 'cursor-not-allowed text-gray-800' : ''}
          >
            ▶
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-3 grid grid-cols-7 text-center text-xs font-bold text-white">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 달력 날짜 셀 */}
      <div className="aspect-square grid h-auto w-full grid-cols-7 gap-0 text-center text-sm">
        {daysArray.map((cell, idx) =>
          cell ? (
            <div
              key={idx}
              className={`flex h-[48px] items-center justify-center rounded-full ${cell.count === 0 ? 'text-white' : 'text-black'} transition-colors ${getColorByCount(
                cell.count
              )}`}
            >
              {cell.count > 0 ? cell.count : '0'}
            </div>
          ) : (
            <div key={idx} className="aspect-square" />
          )
        )}
      </div>
    </div>
  );
};

export default GrassChart;
