import { createPortal } from 'react-dom';
import {
  getToastBackgroundColor,
  getToastStatusIcon,
  ToastStatus,
} from '../model/getToastStyle';
import Image from 'next/image';
import XIcon from '@public/assets/icons/toast/x.png';

const Toaster = ({
  status,
  description,
  title,
  animationClass,
}: {
  status?: ToastStatus;
  description?: string;
  title?: string;
  animationClass?: string;
}) => {
  return createPortal(
    <div
      className={`fixed left-1/2 top-[7.5rem] flex w-auto min-w-[290px] max-w-[95vw] items-center justify-between gap-16 rounded-xl p-16p text-[0.9rem] md:top-1 ${getToastBackgroundColor(status)} rounded-sm md:top-16 ${animationClass} z-[10000]`}
    >
      <div className="flex items-center gap-16">
        <div className="flex-shrink-0">{getToastStatusIcon(status)}</div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{title}</span>
          <span className="text-xs text-gray-700">{description}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-full">
        <Image src={XIcon} alt="Close" width={12} height={12} />
      </div>
    </div>,
    document.body
  );
};

export default Toaster;
