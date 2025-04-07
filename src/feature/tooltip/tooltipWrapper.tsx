'use client';

import dynamic from 'next/dynamic';

const TooltipMount = dynamic(() => import('@/feature/tooltip/tooltipMount'), {
  ssr: false,
});

export default function TooltipWrapper() {
  return <TooltipMount />;
}
