'use client';

import { useEffect, useState } from 'react';
import tippy, { Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { tippyStore } from '@/state/tooltip';
import { TooltipContents } from '@/state/tooltip/tooltipContents';
import { usePathname } from 'next/navigation';

const TooltipMount = () => {
  const { setTippyInstance, clearTippyInstances } = tippyStore();
  const pathname = usePathname();

  const tooltipStyling = (instance: Instance) => {
    const fontSize = window.innerWidth <= 768 ? '14px' : '16px';
    const tippyContent = instance.popper.querySelector('.tippy-content');
    const tippyArrow = instance.popper.querySelector('.tippy-arrow');

    if (tippyContent && tippyArrow) {
      (tippyContent as HTMLElement).style.fontSize = fontSize;
      (tippyContent as HTMLElement).style.fontFamily = 'Parkdahyun';
      (tippyContent as HTMLElement).style.color = '#000000';
      (tippyContent as HTMLElement).style.backgroundColor = '#e8d7b9';
      (tippyArrow as HTMLElement).style.color = '#e8d7b9';
    }
  };

  const initializeTooltip = () => {
    const inputs = [
      { name: 'email', content: TooltipContents.TypingEmail },
      { name: 'password', content: TooltipContents.TypingPassword },
      { name: 'name', content: TooltipContents.TypingName }, // 추가
      {
        name: 'confirmpassword',
        content: TooltipContents.TypingConfirmPassword,
      }, // 추가
    ];

    inputs.forEach(({ name, content }) => {
      const inputElement = document.querySelector(`input[name="${name}"]`);
      if (inputElement) {
        const tooltip = tippy(inputElement, {
          content,
          trigger: 'manual',
          onShow: (instance) => tooltipStyling(instance),
        });
        setTippyInstance(inputElement as HTMLElement, tooltip);
      }
    });
  };

  useEffect(() => {
    clearTippyInstances();
    const timer = setTimeout(initializeTooltip, 100);

    return () => {
      clearTimeout(timer);
      clearTippyInstances();
    };
  }, [pathname]);

  return null;
};

export default TooltipMount;
