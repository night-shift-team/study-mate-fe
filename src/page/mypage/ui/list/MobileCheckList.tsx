'use client';

import NETWORK_Image from '@public/assets/icons/mypage/NETWORK.svg';
import DATABASE_Image from '@public/assets/icons/mypage/DATABASE.svg';
import ALGORITHM_Image from '@public/assets/icons/mypage/ALGORITHM.svg';
import OS_Image from '@public/assets/icons/mypage/OS.svg';
import { useRouter } from 'next/navigation';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';

interface MobileCheckListProps {
  category: ProblemCategoryTitle;
  bgColorClass: string;
}

const imageMap: Record<
  ProblemCategoryTitle,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  NETWORK: NETWORK_Image,
  DB: DATABASE_Image,
  ALGORITHUM: ALGORITHM_Image,
  OS: OS_Image,
};

export const MobileCheckList = ({
  category,
  bgColorClass,
}: MobileCheckListProps) => {
  const router = useRouter();

  const Icon = imageMap[category];

  const getTitle = (category: ProblemCategoryTitle) => {
    switch (category) {
      case ProblemCategoryTitle.ALGORITHUM:
        return 'Algorithm';
      case ProblemCategoryTitle.NETWORK:
        return 'Network';
      case ProblemCategoryTitle.DB:
        return 'Database';
      case ProblemCategoryTitle.OS:
        return 'OS';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-[100%] font-pixel">
      <div className="w-full">
        <Icon className="h-auto w-full" />
      </div>
      <div
        className={`absolute left-[50%] top-[28%] z-10 h-[20%] w-[70%] translate-x-[-50%] rounded-[2px] text-center text-title-section text-black ${bgColorClass} flex items-center justify-center`}
      >
        {getTitle(category)}
      </div>
      <div
        className="absolute bottom-[25%] left-[50%] z-10 flex translate-x-[-50%] items-center justify-center gap-4 text-[20px] font-semibold text-black dark:text-white"
        onClick={() => router.push(`/mypage/${category}`)}
      >
        <span>Go to</span>
        <button className="text-black dark:text-white">▶</button>
      </div>
    </div>
  );
};
