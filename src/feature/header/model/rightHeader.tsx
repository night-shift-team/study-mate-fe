'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import { usePathname, useRouter } from 'next/navigation';

const RightHeaderComponents = () => {
  const routePath = usePathname();
  const router = useRouter();

  const { setUser } = userStore();
  switch (routePath) {
    case '/admin/dashboard':
    case '/admin/management/user':
    case '/admin/management/problem':
      return (
        <>
          <button
            className="flex h-fit w-fit items-center justify-center rounded-2xl px-[0.5rem] py-[0.2rem] hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => router.push(RouteTo.AdminDashboard)}
          >
            관리 대시보드
          </button>
          <button
            className="flex h-fit w-fit items-center justify-center rounded-2xl px-[0.5rem] py-[0.2rem] hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Home);
            }}
          >
            로그아웃
          </button>
        </>
      );
    case RouteTo.Solve:
      return (
        <>
          <button
            className="flex h-fit w-fit items-center justify-center rounded-2xl px-[0.5rem] py-[0.2rem] hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Login);
            }}
          >
            로그아웃
          </button>
        </>
      );
    default:
      return <></>;
  }
};
export default RightHeaderComponents;
