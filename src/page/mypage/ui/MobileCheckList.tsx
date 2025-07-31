'use client';

import NETWORK_Image from '@public/assets/icons/mypage/NETWORK.svg';
import DATABASE_Image from '@public/assets/icons/mypage/DATABASE.svg';
import ALGORITHM_Image from '@public/assets/icons/mypage/ALGORITHM.svg';
import OS_Image from '@public/assets/icons/mypage/OS.svg';
import Arrow from '@public/assets/icons/button/check/Polygon.svg';
import { useRouter } from 'next/navigation';
import { SvgIcon } from '@mui/material';
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
    <div className="relative h-[45vw] overflow-hidden font-pixel text-[24px] md:hidden">
      {Icon && (
        <SvgIcon
          component={Icon}
          inheritViewBox
          sx={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      )}

      <div
        className={`relative left-7 top-14 z-10 w-[120px] text-center text-lg font-semibold text-black ${bgColorClass}`}
      >
        {category}
      </div>

      <div
        className="absolute bottom-10 right-4 z-10 flex items-center justify-center gap-4 text-[20px] text-white"
        onClick={() => router.push(`/mypage/${category}`)}
      >
        <span>Go to</span>
        <SvgIcon
          inheritViewBox
          component={Arrow}
          sx={{ width: '8%', height: '8%' }}
        />
      </div>
    </div>
  );
};
