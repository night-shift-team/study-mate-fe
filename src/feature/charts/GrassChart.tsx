'use client';
import React, { useEffect, useState } from 'react';
import {
  getSolveStatsApi,
  SolveStats,
  SolveStatsResponse,
} from '@/page/mypage/api';
import { Spinner } from '../spinner/ui/spinnerUI';

const GrassChart = () => {
  const [stats, setStats] = useState<SolveStats[]>();
  const [mapStats, setMapStats] = useState<{ [key: string]: number }>();

  // const grassSize = 1;  잔디 크기 (1rem = h-4)

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    const fetchSolveStats = async () => {
      try {
        const res = await getSolveStatsApi();
        if (res.ok && 'solveStats' in res.payload) {
          setStats(res.payload.solveStats);
        } else {
          console.error(res);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchSolveStats();
  }, []);

  const mapSolveStats = (solveStats: SolveStats[]) => {
    const mappedData: { [key: string]: number } = {};
    solveStats.forEach((stat) => {
      mappedData[stat.solveDay] = stat.solveCount;
    });
    return mappedData;
  };

  const getColorBySolveCount = (count: number) => {
    if (count === 0) return 'bg-[#ebedf0]';
    if (count >= 1 && count <= 3) return 'bg-[#9be9a8]';
    if (count >= 4 && count <= 7) return 'bg-[#40c463]';
    if (count >= 8 && count <= 12) return 'bg-[#30a14e]';
    return 'bg-[#216e39]';
  };

  // 현재 날짜 기준으로 1년 전 날짜 계산
  const getOneYearAgoDate = () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    return now.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
  };

  const getMonthLabels = (weekCountByToday: number) => {
    // 월초에 해당하는 주에만 월 표기

    const minusDate = new Date(weekCountByToday * 7 * 24 * 60 * 60 * 1000); // n * 7일

    // -n주가 몇월, 몇일인지 계산
    const getTargetMonth =
      new Date(Date.now() - minusDate.getTime()).getMonth() + 1;
    const getTargetDate = new Date(Date.now() - minusDate.getTime()).getDate();
    console.log(
      `-${weekCountByToday}주 : ${getTargetMonth}월 ${getTargetDate}일`
    );

    // -n주가 월초인지 계산
    const isMonthStartWeek = () => {
      if (getTargetDate >= 1 && getTargetDate <= 7) {
        return true;
      }
      return false;
    };
    if (isMonthStartWeek()) {
      return String(getTargetMonth) + '월';
    }
    return '';
  };

  useEffect(() => {
    if (stats) {
      setMapStats(mapSolveStats(stats));
    }
  }, [stats]);

  return (
    <>
      {stats ? (
        <div className="w-[100%] max-w-[1200px] animate-fade-up overflow-x-auto rounded-xl p-2 scrollbar-hide">
          <div className="min-w-[780px]">
            <div className="flex">
              {/* 동적 월 표시 */}
              <div
                className={`mb-2 ml-6 flex gap-[0.1rem] text-xs text-gray-600 md:gap-[0.2rem]`}
              >
                {Array(53) // 53주 기준
                  .fill(0)
                  .map((_, weekIndex) => (
                    <div
                      key={weekIndex}
                      className={`relative aspect-1 h-4 text-nowrap text-center`}
                    >
                      <span
                        className={`absolute ${getMonthLabels(weekIndex).length >= 3 ? '-left-1' : 'left-0'}`}
                      >
                        {getMonthLabels(weekIndex)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex">
              {/* 요일 표시 */}
              <div className="flex h-auto w-6 shrink-0 flex-col justify-between pr-1 text-xs text-gray-600">
                {/* {days.map((day, index) => (
                  <div key={index} className="h-3 pr-2 text-right">
                    {index % 2 === 0 ? day : ''}{' '}
                  </div>
                ))} */}
                <span className="text-nowrap">오늘</span>
              </div>

              {/* 잔디 그리드 */}
              <div className="flex gap-[0.2rem]">
                {Array(53) // 53주를 기준으로 생성
                  .fill(0)
                  .map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[0.2rem]">
                      {Array(7) // 7일을 기준으로 생성
                        .fill(0)
                        .map((_, dayIndex) => {
                          // 현재 날짜 계산
                          const currentDate = new Date(Date.now());
                          currentDate.setDate(
                            currentDate.getDate() - weekIndex * 7 - dayIndex
                          );

                          const dateString = currentDate
                            .toISOString()
                            .split('T')[0];
                          const solveCount = mapStats
                            ? (mapStats[dateString] ?? 0)
                            : 0;

                          return (
                            <div
                              key={dayIndex}
                              className={`aspect-1 h-4 rounded-sm transition-colors duration-100 hover:ring-1 hover:ring-gray-300 ${getColorBySolveCount(
                                solveCount
                              )}`}
                              title={`날짜: ${dateString}, 문제 풀이 수: ${solveCount}`}
                            />
                          );
                        })}
                    </div>
                  ))}
              </div>
            </div>

            {/* 범례 */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
              <span>활동량:</span>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-[#ebedf0]" title="0" />
                <div className="h-3 w-3 rounded-sm bg-[#9be9a8]" title="1-3" />
                <div className="h-3 w-3 rounded-sm bg-[#40c463]" title="4-7" />
                <div className="h-3 w-3 rounded-sm bg-[#30a14e]" title="8-12" />
                <div className="h-3 w-3 rounded-sm bg-[#216e39]" title="13+" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default GrassChart;
