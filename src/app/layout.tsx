import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/feature/header/ui/Header';
import { Provider } from '@/components/ui/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen w-screen">
      <body className={`flex h-full w-full font-spoqa antialiased`}>
        <Provider>
          <div className="fixed z-[100] flex h-[4rem] w-full px-0 md:px-[4vh]">
            <Header />
          </div>
          <div className="mt-[4rem] flex h-[calc(100%-4rem)] w-full justify-center">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
