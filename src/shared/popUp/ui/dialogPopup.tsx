'use client';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import useOutsideClick from '../../routes/model/useOutsideClick';
import { Router } from 'lucide-react';

export const DialogPopup = ({
  open,
  title,
  description,
  execFunc,
  setDialogOpen,
  disableX = false,
}: {
  open: boolean;
  title: string;
  description: string;
  execFunc: () => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  disableX?: boolean;
}) => {
  const dialogRef = useOutsideClick(() => {
    setDialogOpen(false);
    if (disableX) execFunc();
  });

  useEffect(() => {
    if (open) {
      (document.activeElement as HTMLElement).blur(); // 포커스 해제
    }
  }, [open]);

  return (
    <>
      {/* 오버레이 추가 */}
      {open && (
        <div
          className="fixed inset-0 z-[9] bg-black/50"
          onClick={() => {
            if (!disableX) setDialogOpen(false);
          }}
        />
      )}
      <dialog
        ref={dialogRef}
        open={open}
        className="absolute left-[50%] top-[50%] z-[10] flex h-[30%] min-h-[15rem] w-[80%] min-w-[20rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border-2 shadow-md"
      >
        <div className="flex h-[20%] w-full items-center justify-center">
          {title}
        </div>
        <div className="flex h-[80%] w-full flex-col border-t p-[1.5rem]">
          <div className="flex h-[75%] w-full items-center justify-center pb-[1rem]">
            {description}
          </div>
          <div className="flex h-[25%] w-full justify-center gap-x-[1rem]">
            <button
              className="flex h-full w-[10rem] items-center justify-center rounded-md bg-green-600/50 hover:border-2 active:cursor-grabbing"
              onClick={execFunc}
            >
              ✔️
            </button>
            {!disableX && (
              <button
                className="flex h-full w-[10rem] items-center justify-center rounded-md bg-gray-500/50 pt-1 text-[1.25rem] hover:border-2 active:cursor-grabbing"
                onClick={() => setDialogOpen(false)}
              >
                ✖️
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
