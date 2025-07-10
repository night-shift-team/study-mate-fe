import { CircleCheckBig, CircleX, Info, TriangleAlert } from 'lucide-react';
import { ToastStatus, ToastType } from './toastHook';

export const getToastStatusIcon = (status?: ToastStatus) => {
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
export const getToastBackgroundColor = (status?: ToastStatus) => {
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
