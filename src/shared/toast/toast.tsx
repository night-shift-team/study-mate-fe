import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

const useToast = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [animationClass, setAnimationClass] = useState(
    'opacity-0 -translate-y-full'
  );

  useLayoutEffect(() => {
    let timeoutId1: NodeJS.Timeout;
    let timeoutId2: NodeJS.Timeout;

    if (open) {
      // 토스트 표시 (애니메이션 인)
      setAnimationClass('animate-toast-in');

      // 일정 시간 후 애니메이션 아웃
      timeoutId1 = setTimeout(() => {
        setAnimationClass('animate-toast-out');
      }, 2000);

      // 애니메이션 완료 후 상태 초기화
      timeoutId2 = setTimeout(() => {
        setOpen(false);
        setAnimationClass('opacity-0 -translate-y-full');
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [open, setOpen]);

  const setToastDescription = async (description: string) => {
    setChangeDescription(description);
  };

  const Toaster = ({ description }: { description?: string }) => {
    return (
      <div
        className={`py-6text-base absolute top-1 z-50 flex h-[2.7rem] w-[95%] min-w-[10rem] items-center rounded-sm border border-[#ebe5d6] bg-[#F0EDD4] px-4 shadow-light md:top-5 md:h-[2.9rem] md:w-auto md:justify-center ${animationClass}`}
      >
        {description ?? changeDescription}
      </div>
    );
  };

  return { Toaster, setToastDescription };
};

export default useToast;
