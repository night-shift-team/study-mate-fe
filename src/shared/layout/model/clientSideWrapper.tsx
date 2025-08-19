'use client';

import dynamic from 'next/dynamic';

const QueryProvider = dynamic(
  () => import('@/shared/layout/model/queryProvider'),
  {
    ssr: false,
  }
);
import Header from '@/feature/header/ui/Header';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
const TabBarComponent = dynamic(
  () =>
    import('@/shared/components/bar/TabBar').then((mod) => mod.TabBarComponent),
  { ssr: false }
);
import { usePathname } from 'next/navigation';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const isNeccessaryOldHeader = (path: string) => {
    if (
      path === RouteTo.Home ||
      path === RouteTo.Login ||
      path === RouteTo.Signup ||
      path === RouteTo.Onboarding ||
      path === RouteTo.LevelTest ||
      path.startsWith(RouteTo.LevelTestResult)
    ) {
      return false;
    }
    return true;
  };

  return (
    <QueryProvider>
      <div className="base relative h-full w-full max-w-[450px] bg-[#FAFAFA] dark:bg-grayscale-900">
        <Header />
        <div
          className={`${isNeccessaryOldHeader(path) ? 'mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]' : 'flex h-full w-full flex-col'}`}
        >
          {children}
        </div>
        <TabBarComponent />
      </div>
    </QueryProvider>
  );
};
export default ClientSideWrapper;
