import './globals.css';
import React from 'react';
import { MaintenanceCheck } from '@/feature/maintenance/ui';

import ClientSideWrapper from './clientSideWrapper';

export const metadata = {
  manifest: '/manifest.ts',
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
        className={`flex h-full w-full bg-pointcolor-yogurt font-spoqa antialiased`}
      >
        <MaintenanceCheck>
          <ClientSideWrapper>{children}</ClientSideWrapper>
        </MaintenanceCheck>
      </body>
    </html>
  );
}
