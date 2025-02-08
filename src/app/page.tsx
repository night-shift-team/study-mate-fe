'use client';
import { useLoginHook } from '@/page/home/model/checkAuthToken';
import LoginPage from './login/page';

export default function Home() {
  const hook = useLoginHook();

  return (
    <>
      <LoginPage />
    </>
  );
}
