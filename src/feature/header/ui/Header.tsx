'use client';
import React from 'react';
import Logo from '@public/assets/icons/header/mascotIcon.svg';
import MobileLogo from '@public/assets/icons/header/mobile_logo.svg';
import TextLogo from '@public/assets/backgroundImages/main/logo.svg';
import RightHeader from '../ui/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import { userStore } from '@/shared/state/userStore/model';
import Image from 'next/image';

const Header = () => {
  const path = usePathname();
  const user = userStore.getState().user;

  return (
    <UserStateWrapper>
      <div
        className={`relative flex h-full w-full items-center justify-between px-0 md:px-4 md:shadow-sm`}
      >
        {/* 데스크탑 좌측 로고 */}
        <Link
          href={RouteTo.Home}
          className="relative hidden h-full md:flex md:w-[8rem]"
        >
          <Logo className="flex object-contain py-2.5 pl-2.5" />
          <TextLogo
            className={`h-auto w-full p-2 ${path.startsWith(RouteTo.Store) ? 'text-white' : 'text-black'}`}
          />
        </Link>
        {/* 모바일 가운데 로고 */}
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center md:hidden">
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
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="relative flex h-full w-[6.5rem] items-center pl-4 md:ml-8 md:hidden md:w-[8rem]"
          >
            <FaArrowLeft />
          </Link>
        )}

        <div className="hidden h-full w-full items-center justify-end pr-4 md:flex md:w-auto">
          <RightHeader />
        </div>
      </div>
    </UserStateWrapper>
  );
};

export default Header;
