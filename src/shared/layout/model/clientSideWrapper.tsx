'use client';
const QueryProvider = dynamic(
  () => import('@/shared/layout/model/queryProvider'),
  {
    ssr: false,
  }
);
// import Header from '@/feature/header/ui/Header';

import dynamic from 'next/dynamic';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="base relative h-full w-full max-w-[450px]">
        {/* <div className="fixed z-[100] flex h-[3.2rem] w-full max-w-[450px] md:h-[3.5rem]">
          <Header />
        </div> */}
        <div className="flex h-full w-full">{children}</div>
      </div>
    </QueryProvider>
  );
};
export default ClientSideWrapper;
