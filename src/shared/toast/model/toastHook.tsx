'use client';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import SuccessIcon from '@public/assets/icons/toast/check.svg';
import ErrorIcon from '@public/assets/icons/toast/error.svg';
import InfoIcon from '@public/assets/icons/toast/info.svg';
import WarningIcon from '@public/assets/icons/toast/warning.svg';

enum ToastType {
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
  const [changeTitle, setChangeTitle] = useState('');
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
      }, 20000);

      // 애니메이션 완료 후 상태 초기화
      timeoutId2 = setTimeout(() => {
        setOpen(false);
        setAnimationClass('opacity-0 -translate-y-full');
      }, 25000);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [open, setOpen]);

  const setToastDescription = (description: string) => {
    setChangeDescription(description);
  };
  const setToastTitle = (title: string) => {
    setChangeTitle(title);
  };
  const setToastIcon = (status: ToastStatus) => {
    setToastType(status);
  };

  const getToastStatusIcon = (status?: ToastStatus) => {
    switch (status) {
      case ToastType.success:
        return (
          <div className="h-5 w-5 overflow-hidden rounded-full">
            <SuccessIcon width={20} height={20} />
          </div>
        );
      case ToastType.error:
        return (
          <div className="h-5 w-5 overflow-hidden rounded-full">
            <ErrorIcon width={20} height={20} />
          </div>
        );
      case ToastType.warning:
        return (
          <div className="h-5 w-5 overflow-hidden rounded-full">
            <WarningIcon width={20} height={20} />
          </div>
        );
      case ToastType.info:
        return (
          <div className="h-5 w-5 overflow-hidden rounded-full">
            <InfoIcon width={20} height={20} />
          </div>
        );
      default:
        return null;
    }
  };
  const getToastBackgroundColor = (status?: ToastStatus) => {
    switch (status) {
      case ToastType.success:
        return 'bg-success-30';
      case ToastType.error:
        return 'bg-error-30';
      case ToastType.warning:
        return 'bg-point-orange/30';
      case ToastType.info:
        return 'bg-notice-30';
      default:
        return 'bg-white';
    }
  };

  return {
    changeTitle,
    changeDescription,
    toastType,
    animationClass,
    getToastStatusIcon,
    getToastBackgroundColor,
    setToastDescription,
    setToastIcon,
    setToastTitle,
  };
};

export default useToast;
