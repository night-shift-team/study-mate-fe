'use client';
import React from 'react';
import Logo from '@public/assets/icons/header/mascotIcon.svg';
import TextLogo from '@public/assets/backgroundImages/main/logo.svg';
import Image from 'next/image';
import RightHeaderComponents from '../model/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const Header = () => {
  const path = usePathname();

  return (
    <div
      className={`relative flex h-full w-full items-center justify-between px-0 md:px-4 md:shadow-sm ${path.startsWith(RouteTo.Store) ? 'bg-transparent bg-local will-change-transform' : 'bg-pointcolor-yogurt'}`}
    >
      {/* 데스크탑 좌측 로고 */}
      <Link
        href={RouteTo.Home}
        className="relative hidden h-full md:flex md:w-[8rem]"
      >
        <Logo className="flex object-contain py-2.5 pl-2.5" />
        <TextLogo
          className={`h-auto w-full p-2 ${path === RouteTo.Store ? 'text-white' : 'text-black'}`}
        />
      </Link>
      {/* 모바일 가운데 로고 */}
      <div className="absolute flex h-full w-full items-center justify-center md:hidden">
        <Link
          href={RouteTo.Home}
          className="relative flex h-full w-[6.5rem] p-0"
        >
          <Logo className="w-full p-2" />
        </Link>
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

      {/* 우측 메뉴 */}
      <div className="flex h-full w-full items-center justify-end pr-4 md:w-auto">
        <RightHeaderComponents />
      </div>
    </div>
  );
};

export default Header;
