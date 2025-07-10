'use client';
const QueryProvider = dynamic(
  () => import('@/shared/layout/model/queryProvider'),
  {
    ssr: false,
  }
);
import Header from '@/feature/header/ui/Header';

import dynamic from 'next/dynamic';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="base relative h-full w-full">
        <div className="fixed z-[100] flex h-[3.2rem] w-full md:h-[3.5rem]">
          <Header />
        </div>
        <div className="mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]">
          {children}
        </div>
      </div>
    </QueryProvider>
  );
};
export default ClientSideWrapper;
