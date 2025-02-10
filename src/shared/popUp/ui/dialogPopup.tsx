'use client';
import { Dispatch, SetStateAction } from 'react';
import useOutsideClick from '../../routes/model/useOutsideClick';

export const DialogPopup = ({
  open,
  title,
  description,
  execFunc,
  setDialogOpen,
}: {
  open: boolean;
  title: string;
  description: string;
  execFunc: () => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dialogRef = useOutsideClick(() => setDialogOpen(false));
  console.log(open);
  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="fixed inset-0 z-[1] flex h-[15rem] w-[20rem] flex-col items-center justify-center border border-black"
    >
      <div className="flex h-[20%] w-full items-center justify-center border border-black">
        {title}
      </div>
      <div className="flex h-[80%] w-full flex-col border border-black p-[1.5rem]">
        <div className="flex h-[75%] w-full items-center justify-center pb-[1rem]">
          {description}
        </div>
        <div className="flex h-[25%] w-full justify-between gap-x-[1rem]">
          <button
            className="flex h-full w-[10rem] items-center justify-center rounded-md border-green-600 bg-green-500 hover:border-2 active:cursor-grabbing"
            onClick={execFunc}
          >
            ✔️
          </button>
          <button
            className="flex h-full w-[10rem] items-center justify-center rounded-md border-red-600 bg-red-500 text-[1.25rem] hover:border-2 active:cursor-grabbing"
            onClick={() => setDialogOpen(false)}
          >
            ✖️
          </button>
        </div>
      </div>
    </dialog>
  );
};
