import { InputStatus } from '../button/useInput';

const InputForm = ({
  status,
  ref = undefined,
  className = '',
  ...props
}: {
  ref: React.Ref<HTMLInputElement> | undefined;
  className?: string;
  status: InputStatus;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const baseClasses =
    'w-full px-[16px] py-[12px] rounded-12p border outline-none transition-all bg-background text-white';

  const statusClasses = {
    empty:
      'border-grayscale-400 text-grayscale-white placeholder-grayscale-600',
    typing: 'border-blue-500 text-grayscale-900',
    filled: 'border-grayscale-300 text-grayscale-900',
    error: 'border-error text-grayscale-900',
    inactive: 'border-grayscale-200 text-grayscale-400 cursor-default',
  };

  const isDisabled = status === 'inactive';

  return (
    <input
      ref={ref}
      className={`${baseClasses} ${statusClasses[status]} ${className}`}
      disabled={isDisabled}
      {...props}
    />
  );
};
export default InputForm;
