import { useState } from 'react';

export type InputStatus = 'empty' | 'typing' | 'filled' | 'error' | 'inactive';

export const useInput = (
  initialValue = '',
  initialStatus: InputStatus = 'empty'
) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<InputStatus>(initialStatus);

  const handleChange = (val: string) => {
    setValue(val);

    if (status === 'inactive') return;

    if (val === '') {
      setStatus('empty');
    } else {
      setStatus('filled');
    }
  };

  const reset = () => {
    setValue('');
    setStatus('empty');
  };

  return {
    value,
    setValue,
    status,
    setStatus,
    handleChange,
    reset,
  };
};
