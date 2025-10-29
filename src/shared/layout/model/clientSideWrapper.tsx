'use client';

import dynamic from 'next/dynamic';

import Header from '@/feature/header/ui/Header';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
const TabBarComponent = dynamic(
  () =>
    import('@/shared/components/bar/TabBar').then((mod) => mod.TabBarComponent),
  { ssr: false }
);
import { usePathname, useRouter } from 'next/navigation';
import QueryProvider from './queryProvider';
import ToastPortal from '@/shared/toast/ui/toaster';
import PageWrapperLoader from '@/shared/state/spinner/pageWrapper';
import { useLayoutEffect, useState } from 'react';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import { userStore } from '@/shared/state/userStore/model';
import { isAuthNeedPage } from '@/shared/api/model/getAuthNeedPage';
import { getUserInfoApi } from '@/page/signup/api';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);
  const [pendingTime, setPendingTime] = useState(0);
  const getUser = userStore((s) => s.user);
  const setUser = userStore((s) => s.setUser);
  const router = useRouter();
  const isNeccessaryHeader = (path: string) => {
    if (
      path === RouteTo.ResetPassword ||
      path === RouteTo.ChangePassword ||
      path === RouteTo.Solve ||
      path === RouteTo.SolveSolution ||
      path === RouteTo.Rank ||
      path === RouteTo.Store ||
      path === RouteTo.StorePurchaseHistory ||
      path.startsWith(RouteTo.Announcement) ||
      path.startsWith(RouteTo.Suggestion) ||
      path.startsWith(RouteTo.LevelTestResult + '/') ||
      path.startsWith(RouteTo.Mypage)
    ) {
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    if (isAuthNeedPage(path) && !getUser) {
      getUserInfoApi()
        .then((res) => {
          if (res.ok) {
            setUser('ecode' in res.payload ? null : res.payload);
          }
        })
        .catch(() => {
          setUser(null);
          router.push(RouteTo.Login);
        });
    }
  }, [getUser]);

  // 오래 지속되는 페이지 로더 해제
  useLayoutEffect(() => {
    if (pendingTime >= 15) {
      setPageLoader('none');
      setPendingTime(0);
      return;
    }

    if (getPageLoader === 'loaded' || getPageLoader === 'none') {
      setPendingTime(0);
    } else {
      const interval = setInterval(() => {
        setPendingTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [getPageLoader, pendingTime]);

  return (
    <QueryProvider>
      <div className="base relative h-full w-full max-w-[450px] bg-[#FAFAFA] dark:bg-grayscale-900">
        <div className="absolute flex w-full">
          <Header path={path} />
        </div>
        <ToastPortal />

        <div
          className={`${isNeccessaryHeader(path) ? 'mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]' : 'flex h-full w-full flex-col'}`}
        >
          <PageWrapperLoader>{children}</PageWrapperLoader>
        </div>

        <TabBarComponent path={path} />
      </div>
    </QueryProvider>
  );
};
export default ClientSideWrapper;
