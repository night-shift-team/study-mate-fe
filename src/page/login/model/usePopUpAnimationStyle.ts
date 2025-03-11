import { useLayoutEffect, useState } from 'react';

export const usePopUpAnimationStyle = (isLoginSuccess: boolean) => {
  const [popupAnimationLocate, setPopupAnimationLocate] = useState(
    '-translate-y-[110%] opacity-0'
  );
  useLayoutEffect(() => {
    if (isLoginSuccess) {
      setPopupAnimationLocate('translate-y-[100%] opacity-100');
    } else {
      setPopupAnimationLocate('-translate-y-[110%] opacity-0');
    }
  }, [isLoginSuccess]);

  return { popupAnimationLocate };
};
