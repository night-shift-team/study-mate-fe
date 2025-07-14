'use client';

import useTooltip from '@/feature/tooltip/model/tooltipController';
import tooltipMountHook from '@/feature/tooltip/model/tooltipMount';
import { getSolveStatsApi, SolveStats } from '@/page/mypage/api';
import { useEffect, useState } from 'react';

const useGrassChart = () => {
  const [stats, setStats] = useState<SolveStats[]>();
  const [mapStats, setMapStats] = useState<{ [key: string]: number }>();

  // const grassSize = 1;  잔디 크기 (1rem = h-4)
  // const days = ['월', '화', '수', '목', '금', '토', '일'];

  const { setMountTooltip } = tooltipMountHook();
  const { hideTooltip } = useTooltip();

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

  const getMonthLabels = (weekCountByToday: number) => {
    // 월초에 해당하는 주에만 월 표기

    const minusDate = new Date(weekCountByToday * 7 * 24 * 60 * 60 * 1000); // n * 7일

    // -n주가 몇월, 몇일인지 계산
    const getTargetMonth =
      new Date(Date.now() - minusDate.getTime()).getMonth() + 1;
    const getTargetDate = new Date(Date.now() - minusDate.getTime()).getDate();

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

  return {
    stats,
    getMonthLabels,
    mapStats,
    getColorBySolveCount,
    setMountTooltip,
    hideTooltip,
  };
};
export default useGrassChart;
