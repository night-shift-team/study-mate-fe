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

  return (
    <div className="relative overflow-hidden font-pixel">
      <Icon className="h-full w-full" />

      <div
        className={`absolute left-[22%] top-[25%] z-10 w-[30vw] max-w-[120px] p-2 text-center text-title-section font-semibold text-black ${bgColorClass}`}
      >
        {category}
      </div>
      <div
        className="absolute bottom-[20%] right-[25%] z-10 flex items-center justify-center gap-4 text-[20px] font-semibold text-black dark:text-white"
        onClick={() => router.push(`/mypage/${category}`)}
      >
        <span>Go to</span>
        <button className="text-black dark:text-white">▶</button>
      </div>
    </div>
  );
};
