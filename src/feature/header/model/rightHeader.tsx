'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import MobileSlider from './mobileSilder';
import { MdLogout } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';

const RightHeaderComponents = () => {
  const routePath = usePathname();
  const router = useRouter();
  const { user, setUser } = userStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accessTokenWatcher = (e: StorageEvent) => {
      if (e.key === 'accessToken' && e.newValue === null) {
        setUser(null);
        router.push(RouteTo.Home);
      }
    };
    window.addEventListener('storage', accessTokenWatcher);
    return () => window.removeEventListener('storage', accessTokenWatcher);
  }, []);

  switch (routePath) {
    case RouteTo.AdminDashboard:
    case RouteTo.AdminManagementUser:
    case RouteTo.AdminManagementProblem:
      return (
        <div className="flex gap-2">
          <button
            type="button"
            title="관리자 대시보드"
            className="rounded-2xl p-2 hover:bg-gray-100 hover:shadow-sm active:cursor-grabbing"
            onClick={() => router.push(RouteTo.AdminDashboard)}
          >
            <LuLayoutDashboard />
          </button>

          <button
            title="로그아웃"
            className="rounded-2xl p-2 hover:bg-gray-100 hover:shadow-sm active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Home);
            }}
          >
            <MdLogout />
          </button>
        </div>
      );
    case RouteTo.Solve:
    case RouteTo.LevelTestResult:
      return (
        <div className="flex gap-2">
          <div className="md:hidden">
            <IoMenu
              className="mr-2 cursor-pointer text-2xl text-[rgb(254,202,202)]"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Link
            href={RouteTo.Rank}
            className="hidden h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing md:flex"
          >
            랭킹
          </Link>
          <MobileSlider open={isOpen} setOpen={setIsOpen} />
          <Link
            href={RouteTo.Mypage}
            className="hidden h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing md:flex"
          >
            마이페이지
          </Link>
          <Link
            href={RouteTo.Login}
            className="hidden h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing md:flex"
            onClick={() => {
              setUser(null);
            }}
          >
            로그아웃
          </Link>
        </div>
      );
    default:
      return (
        <Link
          href={RouteTo.Login}
          className="hidden h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing md:flex"
          onClick={() => {
            setUser(null);
          }}
        >
          로그아웃
        </Link>
      );
  }
};
export default RightHeaderComponents;
