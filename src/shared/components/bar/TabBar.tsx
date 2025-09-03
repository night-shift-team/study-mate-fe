'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon } from '@public/assets/icons/button/home';
import { StoreIcon } from '@public/assets/icons/button/tap/Store';
import { RankingIcon } from '@public/assets/icons/button/tap/Ranking';
import { NoticeIcon } from '@public/assets/icons/button/tap/Notice';
import { MypageIcon } from '@public/assets/icons/button/tap/Mypage';
import { userStore } from '@/shared/state/userStore/model';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const TabBarList = [
  { id: 1, title: 'Store', icon: StoreIcon, link: '/store' },
  { id: 2, title: 'Ranking', icon: RankingIcon, link: '/rank' },
  { id: 3, title: 'Home', icon: HomeIcon, link: '/solve' },
  { id: 4, title: 'Notice', icon: NoticeIcon, link: '/announcement' },
  { id: 5, title: 'Mypage', icon: MypageIcon, link: '/mypage' },
];

export const TabBarComponent = () => {
  const pathname = usePathname();
  const user = userStore.getState().user;

  if (
    pathname === RouteTo.Home ||
    pathname === RouteTo.Login ||
    pathname === RouteTo.Signup ||
    pathname === RouteTo.SignupComplete ||
    pathname === RouteTo.Onboarding ||
    pathname === RouteTo.LevelTest ||
    pathname.startsWith(RouteTo.LevelTestResult) ||
    pathname.startsWith(RouteTo.Solve + '/')
  ) {
    return null;
  }

  return (
    <>
      {user?.loginId && (
        <div className="fixed bottom-0 flex h-[80px] w-full max-w-[450px] items-center justify-around bg-black font-pixel text-xs font-semibold">
          {TabBarList.map(({ id, title, icon: IconComponent, link }) => {
            const isSelected = pathname === link;

            return (
              <Link
                key={id}
                href={link}
                className="group flex cursor-pointer flex-col items-center justify-center"
              >
                <IconComponent
                  className={`mb-1 transition-colors ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-white'
                  }`}
                  width={24}
                  height={24}
                />
                <span
                  className={`transition-colors ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-white'
                  }`}
                >
                  {title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
