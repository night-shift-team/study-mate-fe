'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/entities/queryclient';
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default Provider;
