import './globals.css';
import React from 'react';
import { MaintenanceCheck } from '@/feature/maintenance/ui';

import 'swiper/css';
import 'swiper/css/navigation'; // 화살표
import 'swiper/css/pagination'; // 페이지네이션
import ClientSideWrapper from '@/shared/layout/model/clientSideWrapper';
import ChunkReloadGuard from './chunkReloadGuard';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen w-screen">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="naver-site-verification"
          content="8fbbf0128751d08eea5fedd5e452f36afa920cc0"
        />
      </head>
      <body
        id="root-container"
        className={`flex h-full w-full bg-pointcolor-yogurt font-spoqa antialiased`}
      >
        <ChunkReloadGuard />
        {/* <MaintenanceCheck> */}
        <ClientSideWrapper>{children}</ClientSideWrapper>
        {/* </MaintenanceCheck> */}
      </body>
    </html>
  );
}
