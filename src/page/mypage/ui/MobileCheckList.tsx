'use client';

import NETWORK_Image from '@public/assets/icons/mypage/NETWORK.svg';
import DATABASE_Image from '@public/assets/icons/mypage/DATABASE.svg';
import ALGORITHM_Image from '@public/assets/icons/mypage/ALGORITHM.svg';
import OS_Image from '@public/assets/icons/mypage/OS.svg';
import Arrow from '@public/assets/icons/mypage/Arrow.svg';
import { useRouter } from 'next/navigation';

interface MobileCheckListProps {
  category: string;
}

const imageMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  NETWORK: NETWORK_Image,
  DB: DATABASE_Image,
  ALGORITHUM: ALGORITHM_Image,
  OS: OS_Image,
};

export const MobileCheckList = ({ category }: MobileCheckListProps) => {
  const router = useRouter();

  const Icon = imageMap[category];

  return (
    <div className="relative h-[45vw] overflow-hidden md:hidden">
      {Icon && <Icon className="absolute h-full w-full" />}

      <div className="relative left-5 top-10 z-10 text-lg font-semibold text-black">
        {category}
      </div>

      <div
        className="absolute bottom-7 right-4 z-10 flex h-[10vw] w-[10vw] items-center justify-center"
        onClick={() => router.push(`/mypage/${category}`)}
      >
        <Arrow />
      </div>
    </div>
  );
};
