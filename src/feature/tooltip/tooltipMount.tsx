'use client';

import { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { tippyStore } from '@/state/tooltip';
import { TooltipContents } from '@/state/tooltip/tooltipContents';
import { usePathname } from 'next/navigation';

const TooltipMount = () => {
  const { setTippyInstance, clearTippyInstances } = tippyStore();
  const pathname = usePathname(); // 현재 라우트 경로 가져오기

  const initializeTooltip = () => {
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLElement | null;
    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLElement | null;
    if (!emailInput || !passwordInput) return;

    if (emailInput) {
      const emailTooltip = tippy(emailInput, {
        content: TooltipContents.TypingEmail,
        trigger: 'manual',
      });
      setTippyInstance(emailInput as HTMLElement, emailTooltip);
    }

    if (passwordInput) {
      const passwordTooltip = tippy(passwordInput, {
        content: TooltipContents.TypingPassword,
        trigger: 'manual',
      });
      setTippyInstance(passwordInput as HTMLElement, passwordTooltip);
    }
  };

  useEffect(() => {
    clearTippyInstances(); // 메모리 정리
    setTimeout(initializeTooltip, 100); // DOM 업데이트 대기
  }, [pathname]);

  return null;
};

export default TooltipMount;
