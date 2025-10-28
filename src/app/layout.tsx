import './globals.css';
import React from 'react';
import { MaintenanceCheck } from '@/feature/maintenance/ui';

import 'swiper/css';
import 'swiper/css/navigation'; // 화살표
import 'swiper/css/pagination'; // 페이지네이션
import ClientSideWrapper from '@/shared/layout/model/clientSideWrapper';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-screen w-screen">
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body
        id="root-container"
        className={`flex h-full w-full justify-center bg-layout-white font-pixel text-black antialiased dark:bg-layout-dark dark:text-grayscale-white`}
      >
        <MaintenanceCheck>
          <ClientSideWrapper>{children}</ClientSideWrapper>
        </MaintenanceCheck>
      </body>
    </html>
  );
}
