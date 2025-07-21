import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon } from '@public/assets/icons/button/home';
import { BarIcon } from '@public/assets/icons/button/Icon';

const TabBarList = [
  { id: 1, title: 'Quiz', icon: BarIcon, link: '/' },
  { id: 2, title: 'Ranking', icon: BarIcon, link: '/rank' },
  { id: 3, title: 'Home', icon: HomeIcon, link: '/' },
  { id: 4, title: 'Store', icon: BarIcon, link: '/store' },
  { id: 5, title: 'Notice', icon: BarIcon, link: '/announcement' },
];

export const TabBar = () => {
  const [selectedId, setSelectedId] = useState<number>(3);

  return (
    <div className="fixed bottom-0 flex h-[80px] w-full items-center justify-around bg-black font-pixel text-xs font-semibold">
      {TabBarList.map(({ id, title, icon: IconComponent, link }) => {
        const isSelected = selectedId === id;

        return (
          <Link
            key={id}
            href={link}
            onClick={() => setSelectedId(id)}
            className="flex cursor-pointer flex-col items-center justify-center"
          >
            <IconComponent
              className={`mb-1 ${isSelected ? 'text-white' : 'text-gray-600'}`}
              width={24}
              height={24}
            />
            <span className={isSelected ? 'text-white' : 'text-gray-600'}>
              {title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
