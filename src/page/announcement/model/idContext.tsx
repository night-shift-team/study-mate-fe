'use client';
import { createContext, useContext } from 'react';

export const IdContext = createContext<string | undefined>(undefined);
export const useIdContext = () => useContext(IdContext);

export default function ClientLayout({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return <IdContext.Provider value={id}>{children}</IdContext.Provider>;
}
