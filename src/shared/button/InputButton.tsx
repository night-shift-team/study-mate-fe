import { InputStatus } from './useInput';

interface InputButtonProps {
  label: string;
  value: string;
  placeholder?: string;
  status: InputStatus;
  onChange: (value: string) => void;
}

export const InputButton = ({
  label,
  value,
  placeholder,
  status,
  onChange,
}: InputButtonProps) => {
  const baseClasses =
    'w-full px-3 py-2 rounded-[12px] border outline-none transition-all';

  const statusClasses = {
    empty: 'border-gray-400 text-gray-900 placeholder-gray-400 bg-white',
    typing: 'border-blue-500 text-gray-900 bg-white',
    filled: 'border-gray-300 text-gray-900 bg-white',
    error: 'border-error text-gray-900 bg-white',
    inactive: 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed',
  };

  const isDisabled = status === 'inactive';

  return (
    <div className="flex w-auto min-w-[350px] flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseClasses} ${statusClasses[status]}`}
      />
    </div>
  );
};
