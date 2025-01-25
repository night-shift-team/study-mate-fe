'use client';
import { getRoutePath } from '@/shared/model/getRoutePath';
import { usePathname, useRouter } from 'next/navigation';

const RightHeaderComponents = () => {
  const routePath = usePathname();
  const router = useRouter();
  switch (routePath) {
    case '/admin/dashboard':
    case '/admin/management/user':
    case '/admin/management/problem':
      return (
        <>
          <div
            className="flex h-full w-fit items-center justify-center px-[2%]"
            onClick={() => router.push(getRoutePath('AdminDashboard'))}
          >
            관리 대시보드
          </div>
          <div
            className="flex h-full w-fit items-center justify-center px-[2%]"
            onClick={() => router.push(getRoutePath('AdminLogin'))}
          >
            로그아웃
          </div>
        </>
      );
    default:
      return <></>;
  }
};
export default RightHeaderComponents;
