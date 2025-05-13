import React, { useEffect, useState } from 'react';
import { getSolveStatsApi } from '@/page/mypage/api';

const GrassChart = () => {
  const [stats, setStats] = useState<any>(null);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    fetchSolveStats();
  }, []);

  const fetchSolveStats = async () => {
    try {
      const res = await getSolveStatsApi();
      if (res.ok && res.payload) {
        setStats(res.payload);
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const mapSolveStats = (solveStats: any[]) => {
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

  const getMonthLabels = (startDate: string) => {
    const labels: { [key: string]: string } = {};
    const start = new Date(startDate);
    const end = new Date();
    const current = new Date(start);

    while (current <= end) {
      if (current.getDate() === 1) {
        const weekIndex = Math.floor(
          (current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)
        );
        labels[weekIndex] = `${current.getMonth() + 1}월`;
      }
      current.setDate(current.getDate() + 1);
    }

    return labels;
  };

  if (!stats) return <div>로딩 중...</div>;

  const { solveStats } = stats;
  const mappedStats = mapSolveStats(solveStats);

  const oneYearAgo = getOneYearAgoDate();
  const today = new Date().toISOString().split('T')[0];
  const filteredStats = solveStats.filter(
    (stat: any) => stat.solveDay >= oneYearAgo && stat.solveDay <= today
  );

  const monthLabels = getMonthLabels(oneYearAgo);

  return (
    <div className="w-[100%] max-w-[1200px] overflow-x-auto rounded-xl p-2 scrollbar-hide">
      <div className="min-w-[780px]">
        <div className="flex">
          {/* 왼쪽 여백 */}
          <div className="w-8" />

          {/* 동적 월 표시 */}
          <div className="mb-2 flex flex-1 text-xs text-gray-600">
            {Array(53) // 53주 기준
              .fill(0)
              .map((_, weekIndex) => (
                <div key={weekIndex} className="flex-1 text-nowrap text-center">
                  {monthLabels[weekIndex] || ''}
                </div>
              ))}
          </div>
        </div>

        <div className="flex">
          {/* 요일 표시 */}
          <div className="flex w-8 flex-col justify-around text-xs text-gray-600">
            {days.map((day, index) => (
              <div key={index} className="h-3 pr-2 text-right">
                {index % 2 === 0 ? day : ''} {/* 격일로 표시하여 공간 확보 */}
              </div>
            ))}
          </div>

          {/* 잔디 그리드 */}
          <div className="flex flex-1 justify-between gap-[0.5vh]">
            {Array(53) // 53주를 기준으로 생성
              .fill(0)
              .map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[0.5vh]">
                  {Array(7) // 7일을 기준으로 생성
                    .fill(0)
                    .map((_, dayIndex) => {
                      // 현재 날짜 계산
                      const currentDate = new Date(oneYearAgo);
                      currentDate.setDate(
                        currentDate.getDate() + weekIndex * 7 + dayIndex
                      );

                      const dateString = currentDate
                        .toISOString()
                        .split('T')[0];
                      const solveCount = mappedStats[dateString] || 0;

                      return (
                        <div
                          key={dayIndex}
                          className={`aspect-1 h-[1.7vh] rounded-sm transition-colors duration-100 hover:ring-1 hover:ring-gray-300 ${getColorBySolveCount(
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
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 md:justify-end">
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
  );
};

export default GrassChart;
