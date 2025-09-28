'use client';

import Header from '@/feature/header/ui/Header';
import QueryProvider from './queryProvider';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="base relative h-full w-full">
      <div className="fixed z-[100] flex h-[3.2rem] w-full md:h-[3.5rem]">
        <Header />
      </div>
      <div className="mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]">
        <QueryProvider>{children}</QueryProvider>
      </div>
    </div>
  );
};
export default ClientSideWrapper;
