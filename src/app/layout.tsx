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
    <html lang="en" suppressHydrationWarning className="h-screen w-screen">
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body
        id="root-container"
        className={`flex h-full w-full bg-pointcolor-yogurt font-spoqa antialiased`}
      >
        <MaintenanceCheck>
          <ClientSideWrapper>{children}</ClientSideWrapper>
        </MaintenanceCheck>
      </body>
    </html>
  );
}
