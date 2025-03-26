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
  return (
    <div className="relative flex h-full w-full items-center justify-between border-b bg-pointcolor-yogurt/10 px-0 shadow-sm md:px-[4rem] md:pl-2">
      <Link
        href={path.includes('/admin') ? RouteTo.AdminDashboard : RouteTo.Home}
        className="relative hidden h-full w-[6.5rem] pl-4 md:ml-8 md:flex md:w-[8rem]"
      >
        <Image src={Logo} alt="" fill objectFit="contain" priority />
      </Link>
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
      <Link
        href={path.includes('/admin') ? RouteTo.AdminDashboard : RouteTo.Home}
        className="absolute flex h-full w-full items-center justify-center md:hidden"
      >
        <div className="relative flex h-full w-[6.5rem] p-0">
          <Image src={Logo} alt="" fill objectFit="contain" priority />
        </div>
      </Link>
      <div className="flex h-full w-[20%] items-center justify-end pr-4 md:w-[30%]">
        <RightHeaderComponents />
      </div>
    </div>
  );
};

export default Header;
