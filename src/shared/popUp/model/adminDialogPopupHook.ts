'use client';

import useOutsideClick from '@/shared/routes/model/useOutsideClick';
import { Dispatch, SetStateAction, useEffect } from 'react';

const useAdminDialogPopup = (
  open: boolean,
  setDialogOpen: Dispatch<SetStateAction<boolean>>,
  execFunc: () => void,
  disableX?: boolean
) => {
  const dialogRef = useOutsideClick(() => {
    setDialogOpen(false);
    if (disableX) execFunc();
  });

  useEffect(() => {
    if (open) {
      (document.activeElement as HTMLElement).blur(); // 포커스 해제
    }
  }, [open]);

  return { dialogRef };
};
export default useAdminDialogPopup;
