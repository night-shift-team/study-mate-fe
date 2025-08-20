'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') {
    return <>{children}</>; // 서버 사이드 렌더링 시 children만 반환
  }
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
