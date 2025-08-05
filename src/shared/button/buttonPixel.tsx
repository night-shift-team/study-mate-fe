type ButtonStatus = 'default' | 'click' | 'inactive';

interface StatusButtonProps {
  status: ButtonStatus;
  children: React.ReactNode;
}

const ButtonPixel = ({
  status,
  children,
  ...props
}: StatusButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses =
    'rounded-[12px] h-[40px] flex w-full px-[16px] py-[12px] justify-center items-center font-semibold text-center transition-all font-pixel text-button-1';

  const statusClasses = {
    default: 'text-black bg-point-orange',
    click: 'bg-[#FFEF6C] text-black',
    inactive: 'bg-gray-400 text-white cursor-default',
  };

  return (
    <button className={`${baseClasses} ${statusClasses[status]}`} {...props}>
      {children}
    </button>
  );
};
export default ButtonPixel;
