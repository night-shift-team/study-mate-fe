import { ComponentSize } from '@/feature/spinner/ui/spinnerUI';
import { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  size,
  children,
  bgColor,
  textSize,
  textColor,
  className,
  disabled,
  onClick,
}: {
  size: ComponentSize;
  children: React.ReactNode;
  bgColor?: string;
  textSize?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
  onClick: () => any;
}) => {
  const getSize = () => {
    switch (size) {
      case 'xs':
        return 'w-12 h-8';
      case 'sm':
        return 'w-16 h-8';
      case 'md':
        return 'w-20 h-8';
      case 'lg':
        return 'w-20 h-12';
      case 'xl':
        return 'w-24 h-12';
      default:
        return 'w-28 h-12';
    }
  };
  const getBgColor = () => {
    return `bg-${bgColor}`;
  };
  const getTextColor = () => {
    return `text-${textColor}`;
  };
  const getTextSize = () => {
    switch (textSize) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-sm';
    }
  };

  return (
    <button
      className={twMerge(
        `flex items-center justify-center rounded-2xl border ${getSize()} ${getTextSize()} ${getBgColor()} ${getTextColor()} flex-shrink-0`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
