import './globals.css';
import Header from '@/feature/header/ui/Header';
import { Provider } from '@/components/ui/provider';
import React from 'react';
import { MaintenanceCheck } from '@/feature/maintenance/ui';
import TooltipWrapper from '@/feature/tooltip/tooltipWrapper';

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
          <Provider>
            <div className="base h-full w-full">
              <TooltipWrapper />
              <div className="fixed z-[100] flex h-[3.2rem] w-full bg-pointcolor-yogurt md:h-[3.5rem]">
                <Header />
              </div>
              <div className="mt-[3.2rem] flex h-[calc(100%-3.2rem)] w-full justify-center md:mt-[3.5rem] md:h-[calc(100%-3.5rem)]">
                {children}
              </div>
            </div>
          </Provider>
        </MaintenanceCheck>
      </body>
    </html>
  );
}
