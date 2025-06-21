'use client';

import { RefObject, useEffect, useState } from 'react';
import tippy, { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { tippyStore } from '@/state/tooltip';
import { TooltipContents } from '@/state/tooltip/tooltipContents';
import { usePathname } from 'next/navigation';

const tooltipMountHook = () => {
  const {
    setTippyInstance,
    clearAllTippyInstances,
    clearTargetTippyInstances,
  } = tippyStore();
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

  const setMountTooltip = (
    targetRef: HTMLElement,
    content: string
  ): Instance<Props> => {
    const targetInstance = tippyStore.getState().tippyInstances.get(targetRef);
    if (!targetInstance) {
      const instance = tippy(targetRef, {
        content: content,
        trigger: 'manual',
        onShow: (instance) => tooltipStyling(instance),
      });
      setTippyInstance(targetRef, instance);
      return instance;
    }
    return targetInstance;
  };

  useEffect(() => {
    return () => {
      clearAllTippyInstances();
    };
  }, [pathname]);

  return { setMountTooltip, clearAllTippyInstances, clearTargetTippyInstances };
};

export default tooltipMountHook;
