'use client';

import { ReactNode, useLayoutEffect } from 'react';
import { pageLoaderStore } from './pageLoader';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

const PageWrapperLoader = ({ children }: { children: ReactNode }) => {
  const loadingStatus = pageLoaderStore((selector) => selector.status);
  const setLoadingStatus = pageLoaderStore((selector) => selector.setStatus);

  useLayoutEffect(() => {
    if (loadingStatus === 'loaded') {
      setTimeout(() => {
        setLoadingStatus('none');
      }, 50);
      return;
    }
  }, [loadingStatus]);

  console.log('===Current loading status===', loadingStatus);
  return (
    <div className={`relative flex h-full w-full`}>
      <div
        className={`absolute flex h-full w-full items-center justify-center bg-grayscale-900 ${loadingStatus === 'loading' && 'z-[1000] opacity-100'} ${loadingStatus === 'loaded' && '-z-10 opacity-0'} ${loadingStatus === 'none' && '-z-10 opacity-0'} `}
      >
        <Spinner size="md" />
      </div>
      {children}
    </div>
  );
};

export default PageWrapperLoader;
