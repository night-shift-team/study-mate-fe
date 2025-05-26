'use client';
import Provider from '@/components/ui/provider';
import Header from '@/feature/header/ui/Header';
import TooltipWrapper from '@/feature/tooltip/tooltipWrapper';
import { Footer } from '@/feature/footer/ui/Footer';
import { usePathname } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const ClientSideWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const showFooter = (path: string) => {
    if (path === RouteTo.Store) {
      return false;
    }
    return true;
  };
  return (
    <Provider>
      <div className="base h-full w-full">
        <TooltipWrapper />
        <div className="fixed z-[100] flex h-[3.2rem] w-full bg-pointcolor-yogurt md:h-[3.5rem]">
          <Header />
        </div>
        <div className="mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]">
          {children}
        </div>
        {showFooter(path) ? (
          <div className="mt-10">
            <Footer />
          </div>
        ) : null}
      </div>
    </Provider>
  );
};
export default ClientSideWrapper;
