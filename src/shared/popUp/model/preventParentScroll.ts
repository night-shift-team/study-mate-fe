'use client';

import { useEffect } from 'react';

const PreventScrollOutsidePopup = () => {
  useEffect(() => {
    const el = document.getElementById('popup-scroll-area');
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollDown = e.deltaY > 0;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if ((isScrollDown && isAtBottom) || (!isScrollDown && isAtTop)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return null; // 렌더링은 하지 않음
};

export default PreventScrollOutsidePopup;
