import React from 'react';
import Logo from '@/assets/logo.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex h-full w-full items-center border-b border-[#ECCDB4] bg-white pl-2 pt-[2%]">
      <div className="relative flex h-full w-[8rem]">
        <Image src={Logo} alt="" fill objectFit="contain" />
      </div>
    </div>
  );
};

export default Header;
