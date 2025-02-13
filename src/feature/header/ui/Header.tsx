import React from 'react';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import RightHeaderComponents from '../model/rightHeader';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const Header = () => {
  return (
    <div className="flex h-full w-full items-center justify-between border-b border-[#ECCDB4] bg-white pl-4 md:pl-2">
      <Link
        href={RouteTo.Home}
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
