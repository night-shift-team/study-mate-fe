'use client';
import React from 'react';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import RightHeaderComponents from '../model/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();
  return (
    <div className="flex h-full w-full items-center justify-between pl-4 md:pl-2">
      <Link
        href={path.includes('/admin') ? RouteTo.AdminDashboard : RouteTo.Home}
        className="relative flex h-full w-[6.5rem] md:w-[8rem]"
      >
        <Image src={Logo} alt="" fill objectFit="contain" priority />
      </Link>
      <div className="flex h-full w-[20%] items-center justify-end md:w-[30%]">
        <RightHeaderComponents />
      </div>
    </div>
  );
};

export default Header;
