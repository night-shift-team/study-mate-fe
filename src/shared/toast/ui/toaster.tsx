'use client';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import {
  toastStore,
  useToastSnapshot,
  ToastStatus,
  ToastType,
} from '@/shared/state/toast/toastStore';
import Image from 'next/image';

import XIcon from '@public/assets/icons/toast/x.png';
import SuccessIcon from '@public/assets/icons/toast/check.svg';
import ErrorIcon from '@public/assets/icons/toast/error.svg';
import InfoIcon from '@public/assets/icons/toast/info.svg';
import WarningIcon from '@public/assets/icons/toast/warning.svg';

function getIcon(status?: ToastStatus) {
  const Wrap = ({ children }: { children: React.ReactNode }) => (
    <div className="aspect-1 w-[24px] overflow-hidden rounded-full shadow-sm">
      {children}
    </div>
  );
  switch (status) {
    case ToastType.success:
      return (
        <Wrap>
          <SuccessIcon width={20} height={20} />
        </Wrap>
      );
    case ToastType.error:
      return (
        <Wrap>
          <ErrorIcon width={24} height={24} />
        </Wrap>
      );
    case ToastType.warning:
      return (
        <Wrap>
          <WarningIcon width={24} height={24} />
        </Wrap>
      );
    case ToastType.info:
      return (
        <Wrap>
          <InfoIcon width={20} height={20} />
        </Wrap>
      );
    default:
      return null;
  }
}
function getBg(status?: ToastStatus) {
  switch (status) {
    case ToastType.success:
      return 'bg-success-30';
    case ToastType.error:
      return 'bg-error-30';
    case ToastType.warning:
      return 'bg-[#f2cd97]';
    case ToastType.info:
      return 'bg-notice-30';
    default:
      return 'bg-[var(--background)]';
  }
}

function getTextColor(status?: ToastStatus) {
  switch (status) {
    case ToastType.success:
    case ToastType.warning:
      return 'text-black';
    case ToastType.error:
    case ToastType.info:
      return 'text-white';
    default:
      return 'text-[var(--text-primary)]';
  }
}

export default function Toaster() {
  const { open, status, title, description } = useToastSnapshot();

  // exit 애니메이션 유지용
  const [visible, setVisible] = useState(false);
  const [anim, setAnim] = useState(
    'opacity-0 -translate-y-full pointer-events-none'
  );

  useEffect(() => {
    if (open) {
      setVisible(true);
      setAnim('animate-toast-in pointer-events-auto');
    } else {
      // 닫히는 중: 애니메이션 후 언마운트
      setAnim('animate-toast-out pointer-events-none');
      const t = setTimeout(() => setVisible(false), 300); // ← keyframes와 duration 맞추기
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible && !open) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      <div
        id="toaster"
        className={[
          'pointer-events-auto fixed left-1/2 top-[7.5rem] md:top-16',
          'min-w-[290px] max-w-[360px] -translate-x-1/2',
          'flex shrink-0 items-center justify-between gap-16 rounded-xl p-16p text-[0.9rem] shadow-sm',
          getBg(status),
          anim,
        ].join(' ')}
      >
        <div className="mt-1 flex w-full items-center justify-between">
          <div className="w-[24px] flex-shrink-0">{getIcon(status)}</div>
          <div
            className={`flex flex-col gap-0.5 px-2 font-pretandard ${getTextColor(status)}`}
          >
            <span className="font-regular">{title ?? 'No data'}</span>
            <span className="text-xs">{description ?? ''}</span>
          </div>
          <button
            className="mb-1 w-[12px] flex-shrink-0 items-end justify-items-center overflow-hidden rounded-full"
            onClick={() => toastStore.hide()}
            aria-label="Close"
          >
            <Image src={XIcon} alt="" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
