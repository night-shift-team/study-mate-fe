'use client';
import Maintenance from '@/feature/maintenance/ui/maintenance';
import { useEffect } from 'react';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body className="h-screen w-screen">
        <Maintenance />
      </body>
    </html>
  );
}
