'use client';

import React from 'react';
import { ProblemCategory } from '@/shared/problem/model/problemInfo.types';

interface ScrapsListProps {
  favoriteList: {
    questionId: string | number;
    questionCategory: string;
    difficulty: number;
    questionTitle: string;
    createdDt: string;
  }[];
}

const categoryBgColors: Record<ProblemCategory, string> = {
  [ProblemCategory.Algo_MAQ]: 'bg-point-pink',
  [ProblemCategory.Algo_SAQ]: 'bg-point-pink',
  [ProblemCategory.NETWORK_MAQ]: 'bg-point-cyan',
  [ProblemCategory.NETWORK_SAQ]: 'bg-point-cyan',
  [ProblemCategory.DB_MAQ]: 'bg-point-orange',
  [ProblemCategory.DB_SAQ]: 'bg-point-orange',
  [ProblemCategory.OS_MAQ]: 'bg-success',
  [ProblemCategory.OS_SAQ]: 'bg-success',
  [ProblemCategory.LEVEL_TEST]: 'bg-gray-400',
};

export const ScrapsList: React.FC<ScrapsListProps> = ({ favoriteList }) => {
  return (
    <div className="flex flex-col gap-3">
      {favoriteList?.map((item) => {
        const bgColorClass =
          categoryBgColors[item.questionCategory as ProblemCategory] ?? '';

        return (
          <div
            key={item.questionId}
            className="flex w-full flex-col rounded-md bg-[#451E81] p-3 text-white"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`w-[100px] rounded-sm text-center text-[16px] font-semibold text-black ${bgColorClass}`}
              >
                {item.questionCategory.split('_')[0]}
              </span>
              <span className="text-[16px] font-bold text-yellow-300">
                Lv.{item.difficulty}
              </span>
            </div>
            <div className="truncate font-pretandard text-body-primary">
              {item.questionTitle}
            </div>
            <div className="mt-1 font-pretandard text-body-secondary text-gray-300">
              {String(item.createdDt).split('T')[0]}
            </div>
          </div>
        );
      })}
      {favoriteList.length === 0 && <div>스크랩한 문제가 없습니다</div>}
    </div>
  );
};
