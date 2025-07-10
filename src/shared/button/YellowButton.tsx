type ButtonStatus = 'default' | 'click' | 'inactive';

interface StatusButtonProps {
  label: string;
  status: ButtonStatus;
  onClick?: () => void;
}

export const YellowButton = ({ label, status, onClick }: StatusButtonProps) => {
  const baseClasses =
    'min-w-[130px] p-16  rounded-[12px] font-semibold text-center transition-all font-pixel text-[20px]';

  const statusClasses = {
    default: 'text-black bg-point-yellow',
    click: 'bg-[#FFEF6C] text-black',
    inactive: 'bg-gray-400 text-white cursor-not-allowed',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${statusClasses[status]} `}
    >
      <span>{label}</span>
    </button>
  );
};
