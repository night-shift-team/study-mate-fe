'use client';
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

export const TabBarComponent = ({ path: pathname }: { path: string }) => {
  const user = userStore.getState().user;
  // 특정 페이지에서는 TabBar 숨김
  if (
    pathname === RouteTo.Home ||
    pathname === RouteTo.Login ||
    pathname === RouteTo.Signup ||
    pathname === RouteTo.SignupComplete ||
    pathname === RouteTo.Onboarding ||
    pathname === RouteTo.MypageProblemDetail ||
    pathname === RouteTo.LevelTest ||
    pathname.startsWith(RouteTo.LevelTestResult) ||
    pathname.startsWith(RouteTo.Solve + '/') ||
    pathname.startsWith(RouteTo.AdminLogin)
  ) {
    return null;
  }

  return (
    <>
      {user?.loginId && (
        <div className="fixed bottom-0 z-[10000] flex h-[80px] w-full max-w-[450px] items-center justify-around bg-[#FAFAFA] font-pixel text-xs font-semibold dark:bg-black">
          {TabBarList.map(({ id, title, icon: IconComponent, link }) => {
            const isSelected = pathname === link;

            // 선택/비선택 색상 공통 클래스
            const iconColor = isSelected
              ? 'text-black dark:text-white'
              : 'text-[#8F9098] hover:text-black group-hover:text-black dark:text-gray-600 dark:hover:text-white dark:group-hover:text-white';

            return (
              <Link
                key={id}
                href={link}
                className="group flex cursor-pointer flex-col items-center justify-center"
              >
                {/* 아이콘 */}
                <IconComponent
                  className={`mb-1 transition-colors ${iconColor}`}
                  width={24}
                  height={24}
                />

                {/* 텍스트 */}
                <span className={`text-[10px] transition-colors ${iconColor}`}>
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
