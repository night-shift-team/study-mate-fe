import { InputStatus } from '../components/input/useInput';

const InputForm = ({
  status,
  ref = undefined,
  width = '100%',
  height = 'fit',
  className = '',
  ...props
}: {
  ref?: React.Ref<HTMLInputElement> | undefined;
  className?: string;
  width?: string | number;
  height?: string | number;
  status: InputStatus;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const baseClasses =
    'w-full px-[16px] py-[12px] rounded-12p border outline-none transition-all bg-background placeholder-grayscale-600';

  const statusClasses = {
    empty: 'border-grayscale-600 placeholder-grayscale-600',
    typing: 'border-grayscale-400 ',
    filled: 'border-grayscale-400 ',
    error: 'border-error ',
    inactive: 'border-grayscale-200  cursor-default',
  };

  const isDisabled = status === 'inactive';

  return (
    <input
      ref={ref}
      style={{ width: width, height: height }}
      className={`${baseClasses} ${statusClasses[status]} ${className} shrink-0 text-black dark:text-white`}
      disabled={isDisabled}
      {...props}
    />
  );
};
export default InputForm;
