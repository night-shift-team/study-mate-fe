'use client';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { CircleCheckBig, TriangleAlert, CircleX, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
type ToastStatus = ToastType;

const useToast = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [toastType, setToastType] = useState<ToastType>();
  const [animationClass, setAnimationClass] = useState(
    'opacity-0 -translate-y-full'
  );

  useLayoutEffect(() => {
    let timeoutId1: NodeJS.Timeout;
    let timeoutId2: NodeJS.Timeout;

    if (open) {
      // 토스트 표시 (애니메이션 인)
      setAnimationClass('animate-toast-in');

      // 일정 시간 후 애니메이션 아웃
      timeoutId1 = setTimeout(() => {
        setAnimationClass('animate-toast-out');
      }, 2000);

      // 애니메이션 완료 후 상태 초기화
      timeoutId2 = setTimeout(() => {
        setOpen(false);
        setAnimationClass('opacity-0 -translate-y-full');
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [open, setOpen]);

  const setToastDescription = (description: string) => {
    setChangeDescription(description);
  };
  const setToastIcon = (status: ToastStatus) => {
    setToastType(status);
  };

  const getToastStatusIcon = (status?: ToastStatus) => {
    switch (status) {
      case ToastType.success:
        return <CircleCheckBig size={18} color="#22c55e" />;
      case ToastType.error:
        return <CircleX size={18} color="#ef4444" />;
      case ToastType.warning:
        return <TriangleAlert size={18} color="#eab308" />;
      case ToastType.info:
        return <Info size={18} color="#3b82f6" />;
      default:
        return null;
    }
  };
  const getToastBackgroundColor = (status?: ToastStatus) => {
    switch (status) {
      case ToastType.success:
        return 'bg-[#edf7ed]';
      case ToastType.error:
        return 'bg-[#fdeded]';
      case ToastType.warning:
        return 'bg-[#fff4e5]';
      case ToastType.info:
        return 'bg-[#e5f6fd]';
      default:
        return 'bg-white';
    }
  };

  const Toaster = ({
    status,
    description,
  }: {
    status?: ToastStatus;
    description?: string;
  }) => {
    return createPortal(
      <div
        className={`fixed left-1/2 top-[3.5rem] flex h-[2.7rem] w-auto min-w-[5rem] max-w-[95vw] items-center gap-1 rounded-xl py-[1.35rem] text-[0.9rem] md:top-1 ${getToastBackgroundColor(status ?? toastType)} rounded-sm border px-4 shadow-light md:top-16 md:h-[2.9rem] md:justify-center ${animationClass} z-[10000]`}
      >
        {status ? getToastStatusIcon(status) : getToastStatusIcon(toastType)}
        {description ?? changeDescription}
      </div>,
      document.body
    );
  };

  return { Toaster, setToastDescription, setToastIcon };
};

export default useToast;
