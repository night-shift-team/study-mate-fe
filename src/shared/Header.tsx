import React from 'react';
import Logo from '../assets/logo.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex w-[100%] items-center justify-center">
      <div className="w-[100%] border-b border-[#ECCDB4] pb-5 pt-5">
        <Image src={Logo} alt="" width={150} />
      </div>
    </div>
  );
};

export default Header;
