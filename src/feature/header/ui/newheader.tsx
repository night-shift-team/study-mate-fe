'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import LeftArrow from '@public/assets/icons/header/left_arrow.svg';
import HomeLogo from '@public/assets/icons/header/mobile_logo.svg';
import Avatar from '@public/assets/icons/header/Avatar.svg';

import { LucideHome } from 'lucide-react';

import Link from 'next/link';
import { DarkModeButton } from '@/shared/button/DarkModeButton';
import { useRouter } from 'next/navigation';

const NewHeader = ({
  left,
  center,
  right,
}: {
  left: 'Back' | 'None';
  center: 'StudyMate' | 'Home' | 'None';
  right: 'DarkMode' | 'Avartar' | 'None';
}) => {
  const router = useRouter();

  return (
    <div className="relative flex h-56p w-full shrink-0 items-center justify-center">
      <div className="absolute left-4 flex h-full items-center">
        {left === 'Back' && (
          <Link href={''} onClick={() => router.back()} className="h-5 w-5">
            <LeftArrow className="fill-dark h-full w-full dark:fill-white" />
          </Link>
        )}
      </div>
      <div className="flex h-full items-center">
        {center === 'StudyMate' && (
          <Link href={RouteTo.Solve} className="h-[35.63px] w-[60px]">
            <HomeLogo className="h-full w-full" />
          </Link>
        )}
        {center === 'Home' && (
          <Link
            href={RouteTo.Home}
            className="flex h-40p w-40p items-center justify-center rounded-12p bg-point-orange"
          >
            <LucideHome />
          </Link>
        )}
      </div>
      <div className="absolute right-4 flex h-full items-center">
        {right === 'DarkMode' && <DarkModeButton />}
        {right === 'Avartar' && (
          <Link href={RouteTo.Mypage} className="h-10 w-10">
            <Avatar className="h-full w-full" />
          </Link>
        )}
      </div>
    </div>
  );
};
export default NewHeader;
