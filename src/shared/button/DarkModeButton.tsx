'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SunIcon from '@public/assets/icons/button/toggle/sun.png';
import { FaMoon } from 'react-icons/fa';

export const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Html의 초기 상태 동기화
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="pointer-events-auto relative z-[1000000]">
      <button
        onClick={toggleDarkMode}
        className={`flex h-[25px] w-[48px] items-center rounded-full border-2 border-point-purple transition-colors duration-300 ${
          isDarkMode ? 'bg-point-purple' : 'bg-white'
        }`}
      >
        <span
          className={`pointer-events-none absolute flex h-[21px] w-[21px] items-center justify-center rounded-full transition-transform duration-300 ${
            isDarkMode ? 'translate-x-[22px]' : 'translate-x-[2px]'
          }`}
        >
          {isDarkMode ? (
            <FaMoon className="text-[14px] text-point-yellow" />
          ) : (
            <Image src={SunIcon} alt="Sun" width={18} height={18} />
          )}
        </span>
      </button>
    </div>
  );
};
