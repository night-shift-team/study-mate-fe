'use client';
import React from 'react';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import RightHeaderComponents from '../model/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const Header = () => {
  const path = usePathname();
  console.log(path);
  return (
    <div className="relative flex h-full w-full items-center justify-between border-b bg-pointcolor-yogurt/10 px-0 shadow-sm md:px-4">
      {/* 데스크탑 좌측 로고 */}
      <Link
        href={RouteTo.Home}
        className="relative hidden h-full w-[6.5rem] pl-4 md:ml-8 md:flex md:w-[8rem]"
      >
        <Image src={Logo} alt="" fill objectFit="contain" priority />
      </Link>
      {/* 모바일 가운데 로고 */}
      <div className="absolute flex h-full w-full items-center justify-center md:hidden">
        <Link
          href={RouteTo.Home}
          className="relative flex h-full w-[6.5rem] p-0"
        >
          <Image src={Logo} alt="" fill objectFit="contain" priority />
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
