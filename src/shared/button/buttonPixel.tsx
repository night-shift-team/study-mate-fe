type ButtonStatus = 'default' | 'click' | 'inactive';

interface StatusButtonProps {
  status: ButtonStatus;
  children: React.ReactNode;
}
interface StatusButtonCustomProps extends StatusButtonProps {
  paddingX: string | number;
  paddingY: string | number;
  width?: string | number;
  height?: string | number;
  rounded?: string | number;
}

const ButtonPixel = ({
  status,
  children,
  ...props
}: StatusButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses =
    'rounded-[12px] h-[40px] flex w-full px-[16px] py-[12px] justify-center items-center font-semibold text-center transition-all font-pixel text-button-1 select-none';

  const statusClasses = {
    default: 'text-black bg-point-orange',
    click: 'bg-[#FFEF6C] text-black',
    inactive: 'bg-gray-400 text-white cursor-default',
  };
  return (
    <button
      disabled={status === 'inactive'}
      className={`${baseClasses} ${statusClasses[status]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonPixelCustom = ({
  status,
  width,
  paddingX,
  paddingY,
  height,
  rounded,
  children,
  ...props
}: StatusButtonCustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses =
    'rounded-[12px] min-h-[24px] flex justify-center items-center font-semibold text-center transition-all font-pixel text-button-2 select-none';

  const statusClasses = {
    default: 'text-black bg-point-orange',
    click: 'bg-[#FFEF6C] text-black',
    inactive: 'bg-gray-400 text-white cursor-default',
  };

  return (
    <button
      style={{
        width: width ?? '',
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        height: height ?? '',
        borderRadius: rounded ?? 12,
      }}
      className={`${baseClasses} ${statusClasses[status]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default ButtonPixel;
