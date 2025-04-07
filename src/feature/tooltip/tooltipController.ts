'use client';

import { tippyStore } from '@/state/tooltip';

const useTooltip = () => {
  const tippyInstances = tippyStore((state) => state.tippyInstances);

  // 특정 요소의 툴팁 표시
  const showTooltip = (element: HTMLElement) => {
    const instance = tippyInstances.get(element); // 특정 요소의 인스턴스 가져오기
    if (instance) {
      instance.show();
    }
  };

  // 특정 요소의 툴팁 숨김
  const hideTooltip = (element: HTMLElement) => {
    const instance = tippyInstances.get(element);
    if (instance) {
      instance.hide();
    }
  };

  // 특정 요소의 툴팁 내용 업데이트
  const updateTooltip = (element: HTMLElement, content: string) => {
    const instance = tippyInstances.get(element); // 특정 요소의 인스턴스 가져오기
    if (instance) {
      instance.setContent(content); // 툴팁 내용 업데이트
    }
  };

  return { showTooltip, hideTooltip, updateTooltip };
};

export default useTooltip;
