'use client';
import React from 'react';
import Logo from '@public/assets/icons/header/mascotIcon.svg';
import MobileLogo from '@public/assets/icons/header/mobile_logo.svg';
import TextLogo from '@public/assets/backgroundImages/main/logo.svg';
import RightHeader from '../ui/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname, useRouter } from 'next/navigation';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import { userStore } from '@/shared/state/userStore/model';
import Image from 'next/image';
import backButton from '@public/assets/icons/header/backButton.svg';
import { SvgIcon } from '@mui/material';

const Header = () => {
  const path = usePathname();
  const user = userStore.getState().user;
  const router = useRouter();

  return (
    <UserStateWrapper>
      <div
        className={`relative flex h-full w-full items-center justify-between px-0`}
      >
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          <Link
            href={RouteTo.Home}
            className="relative flex h-full w-[6.5rem] p-0"
          >
            <MobileLogo className="w-full p-2" />
          </Link>
        </div>
        <div className="absolute right-4 rounded-lg bg-white">
          {user?.loginId && (
            <Image src={user.profileImg} alt="Profile" width={40} height={40} />
          )}
        </div>

        {/* 모바일 좌측 뒤로가기 버튼 */}
        {path === RouteTo.Home ||
        path === RouteTo.Login ||
        path === RouteTo.Solve ||
        path === RouteTo.AdminLogin ||
        path === RouteTo.AdminDashboard ? null : (
          <button
            onClick={() => router.back()}
            className="relative z-[10000] flex h-full w-[6.5rem] cursor-pointer items-center pl-4"
          >
            <SvgIcon
              inheritViewBox
              component={backButton}
              sx={{ width: '30%', height: '30%' }}
            />
          </button>
        )}

        {/* <div className="hidden h-full w-full items-center justify-end pr-4 md:flex md:w-auto">
          <RightHeader />
        </div> */}
      </div>
    </UserStateWrapper>
  );
};

export default Header;
