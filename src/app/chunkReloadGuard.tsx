// app/_components/ChunkReloadGuard.tsx
'use client';
import { useEffect } from 'react';
export default function ChunkReloadGuard() {
  useEffect(() => {
    const h = (e: any) => {
      const name = e?.error?.name || '';
      const msg = String(e?.message || e?.reason || '');
      if (name === 'ChunkLoadError' || msg.includes('Loading chunk'))
        location.reload();
    };
    window.addEventListener('error', h);
    window.addEventListener('unhandledrejection', h);
    return () => {
      window.removeEventListener('error', h);
      window.removeEventListener('unhandledrejection', h);
    };
  }, []);
  return null;
}
