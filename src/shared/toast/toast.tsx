import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

const useToast = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [toastAnimationLocate, setToastAnimationLocate] = useState(
    '-translate-y-[110%] opacity-0'
  );

  useLayoutEffect(() => {
    if (open) {
      setToastAnimationLocate('translate-y-[100%] opacity-100');
      setTimeout(() => {
        setToastAnimationLocate('translate-y-[100%] -right-[100%]');
      }, 2000);
      setTimeout(() => {
        setOpen((prev) => !prev);
      }, 2500);
    } else {
      setToastAnimationLocate('-translate-y-[110%] opacity-0');
    }
  }, [open]);

  const setToastDescription = async (description: string) => {
    setChangeDescription(description);
  };

  const Toaster = ({ description }: { description?: string }) => {
    return (
      <div
        className={`absolute z-[1] ${toastAnimationLocate} top-0 flex h-[3rem] items-center justify-center rounded-xl border border-[#ebe5d6] bg-[#F0EDD4] px-4 text-[2.2vh] shadow-light transition-all duration-300 ease-in-out`}
      >
        {description ?? changeDescription}
      </div>
    );
  };

  return { Toaster, setToastDescription };
};
export default useToast;
