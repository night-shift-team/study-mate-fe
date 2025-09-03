'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  if (typeof window === 'undefined') return <>{children}</>;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
