'use client';
import React from 'react';
import MobileLogo from '@public/assets/icons/header/mobile_logo.svg';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import { userStore } from '@/shared/state/userStore/model';
import ProfileIcon from '@public/assets/icons/header/Avatar.svg';
import { DarkModeButton } from '@/shared/button/DarkModeButton';
import { IoIosArrowBack } from 'react-icons/io';
const Header = ({ path }: { path: string }) => {
  const user = userStore.getState().user;
  const router = useRouter();

  if (
    path === RouteTo.Home ||
    path === RouteTo.Login ||
    path === RouteTo.Signup ||
    path === RouteTo.Onboarding ||
    path === RouteTo.ResetPassword ||
    path === RouteTo.SignupComplete ||
    path === RouteTo.LevelTest ||
    path.startsWith(RouteTo.LevelTestResult) ||
    path.startsWith(RouteTo.Solve + '/')
  ) {
    return null;
  }

  return (
    <UserStateWrapper>
      <div className="fixed z-[100] flex h-[3.2rem] w-full max-w-[450px] items-center bg-[#FAFAFA] dark:bg-grayscale-900 md:h-[3.5rem]">
        <div
          className={`relative flex h-full w-full items-center justify-between px-0`}
        >
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
            <Link
              href={RouteTo.Home}
              className="relative flex h-full w-[6.5rem] items-center justify-center p-0"
            >
              <MobileLogo className="w-[60px]" />
            </Link>
          </div>

          <div className="absolute right-4 rounded-lg">
            {user?.loginId && (
              <div className="h-[40px] w-[40px] rounded-16p">
                {path === RouteTo.Mypage ? (
                  <DarkModeButton />
                ) : (
                  <ProfileIcon className="h-full w-full" />
                )}
              </div>
            )}
          </div>
          {/* 모바일 좌측 뒤로가기 버튼 */}
          {path === RouteTo.Home ||
          path === RouteTo.Login ||
          path === RouteTo.Solve ||
          path === RouteTo.AdminLogin ||
          path.startsWith(RouteTo.Solve + '/') ||
          path === RouteTo.AdminDashboard ? null : (
            <button
              onClick={() => router.back()}
              className="relative z-[10000] flex cursor-pointer items-center"
            >
              <IoIosArrowBack
                className="block dark:hidden"
                size={30}
                fill="black"
              />
              <IoIosArrowBack
                className="hidden dark:block"
                size={30}
                fill="white"
              />
            </button>
          )}

          {/* <div className="hidden h-full w-full items-center justify-end pr-4 md:flex md:w-auto">
          <RightHeader />
        </div> */}
        </div>
      </div>
    </UserStateWrapper>
  );
};

export default Header;
