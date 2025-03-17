'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RightHeaderComponents = () => {
  const routePath = usePathname();
  const router = useRouter();
  const { setUser } = userStore();

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
            className="rounded-2xl px-2 hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => router.push(RouteTo.AdminDashboard)}
          >
            <span className="text-sm">대시보드</span>
          </button>
          <button
            className="rounded-2xl px-[0.5rem] py-[0.2rem] hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Home);
            }}
          >
            <span className="text-sm">로그아웃</span>
          </button>
        </div>
      );
    case RouteTo.Solve:
    case RouteTo.LevelTestResult:
      return (
        <>
          <Link
            href={RouteTo.Login}
            className="flex h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
            }}
          >
            로그아웃
          </Link>
        </>
      );
    default:
      return <></>;
  }
};
export default RightHeaderComponents;
