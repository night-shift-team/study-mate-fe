'use client';

import Header from '@/feature/header/ui/Header';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname } from 'next/navigation';
import QueryProvider from './queryProvider';
import { TabBarComponent } from '@/shared/components/bar/TabBar';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const isNeccessaryOldHeader = (path: string) => {
    if (
      path === RouteTo.Home ||
      path === RouteTo.Login ||
      path === RouteTo.Signup ||
      path === RouteTo.Onboarding ||
      path === RouteTo.SignupComplete ||
      path === RouteTo.LevelTest ||
      path.startsWith(RouteTo.Solve + '/') ||
      path.startsWith(RouteTo.LevelTestResult)
    ) {
      return false;
    }
    return true;
  };

  return (
    <QueryProvider>
      <div className="base relative h-full w-full max-w-[450px] bg-grayscale-900">
        <Header path={path} />
        <div
          className={`${isNeccessaryOldHeader(path) ? 'mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]' : 'flex h-full w-full flex-col'}`}
        >
          {children}
        </div>
        <TabBarComponent path={path} />
      </div>
    </QueryProvider>
  );
};
export default ClientSideWrapper;
