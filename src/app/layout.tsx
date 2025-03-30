import './globals.css';
import Header from '@/feature/header/ui/Header';
import { Provider } from '@/components/ui/provider';
import {
  getValidNoticeListApi,
  GetValidnoticeListRes,
} from '@/feature/notice/api';
import React, { JSX, Suspense } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import UnderConstruction from '@/assets/under_construction.png';
import { RemainTimeSV2 } from '@/feature/maintenance/ui/noticeEndtimer';

export const metadata = {
  manifest: '/manifest.ts',
};

const MaintenanceCheck = ({ children }: { children: React.ReactNode }) => {
  const MaintenanceContent = async () => {
    try {
      const res = await getValidNoticeListApi();
      if (res.ok && res.payload) {
        const data = res.payload as GetValidnoticeListRes;
        const isMaintenance = data.isMaintenanceNoticeExist;
        if (!isMaintenance) {
          return (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex w-full justify-center">
                <Image
                  src={UnderConstruction}
                  alt="under_construction"
                  objectFit="contain"
                  priority
                  width={150}
                />
              </div>
              <span className="flex w-full justify-center">
                유지보수중입니다.
              </span>
              {data.maintenaceNotices[0] ? (
                <div className="flex w-full flex-col items-center justify-center p-2">
                  <p>{data.displayNotices[0].noticeTitle}</p>
                  <p>{data.maintenaceNotices[0].maintenanceEndTime}</p>
                  <RemainTimeSV2
                    endDate={
                      data.maintenaceNotices[0]?.maintenanceEndTime
                        ? new Date(data.maintenaceNotices[0].maintenanceEndTime)
                        : new Date(Date.now())
                    }
                  />
                </div>
              ) : (
                <p>남은 시간</p>
              )}
              {/* <p>{data.}</p> */}
            </div>
          );
        }
      }
      return <>{children}</>;
    } catch (e) {
      console.log(e);
      return <>{children}</>;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="animate-fade-in">
            <Image
              src={Logo}
              alt="Logo"
              objectFit="contain"
              priority
              width={300}
            />
          </div>
        </div>
      }
    >
      <MaintenanceContent />
    </Suspense>
  );
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen w-screen">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body
        id="root-container"
        className={`flex h-full w-full font-spoqa antialiased`}
      >
        <MaintenanceCheck>
          <Provider>
            <div className="base h-full w-full">
              <div className="fixed z-[100] flex h-[3rem] w-full md:h-[3.5rem]">
                <Header />
              </div>
              <div className="mt-[3rem] flex h-[calc(100%-3rem)] w-full justify-center bg-pointcolor-yogurt md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]">
                {children}
              </div>
            </div>
          </Provider>
        </MaintenanceCheck>
      </body>
    </html>
  );
}
