import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/feature/header/ui/Header';

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased`}
      >
        <div className="fixed flex h-[8vh] min-h-[3rem] w-full px-[4vh]">
          <Header />
        </div>
        <div className="flex h-[calc(100%-8vh)] w-full items-center justify-center pt-[8vh]">
          {children}
        </div>
      </body>
    </html>
  );
}
