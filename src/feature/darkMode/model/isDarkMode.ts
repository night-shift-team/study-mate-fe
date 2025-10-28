'use client';

export const useDarkMode = () => {
  if (typeof document === 'undefined') {
    return { isDarkMode: false };
  }
  return { isDarkMode: document.documentElement.classList.contains('dark') };
};
