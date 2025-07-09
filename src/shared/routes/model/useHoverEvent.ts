'use client';
import { RefObject } from 'react';

export const useHoverEvent = (
  ref: RefObject<HTMLDivElement | null>,
  parentRef: RefObject<HTMLDivElement | null>,
  callback: () => void,
  unMountCallback: () => void
) => {
  if (!ref.current || !parentRef.current) return;
  const element = ref.current;
  const parentElement = parentRef.current;

  element.addEventListener('mouseover', callback);
  parentElement.addEventListener('mouseleave', unMountCallback);

  return () => {
    element.removeEventListener('mouseover', callback);
    parentElement.removeEventListener('mouseleave', unMountCallback);
  };
};

export default useHoverEvent;
