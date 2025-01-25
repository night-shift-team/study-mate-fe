import React from 'react';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import RightHeaderComponents from '../model/rightHeader';

const Header = () => {
  return (
    <div className="flex h-full w-full items-center justify-between border-b border-[#ECCDB4] bg-white pl-2 pt-[2%]">
      <div className="relative flex h-full w-[8rem]">
        <Image src={Logo} alt="" fill objectFit="contain" priority />
      </div>
      <div className="flex h-full w-[30%] justify-end text-[2vh]">
        <RightHeaderComponents />
      </div>
    </div>
  );
};

export default Header;
