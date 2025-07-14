'use client';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Dispatch, SetStateAction } from 'react';
import {
  checkEmailValidate,
  checkPasswordValidate,
} from '@/page/login/model/checkInputValidate';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useAdminLogin from '../model/adminLoginHook';
import { ToastType } from '@/shared/toast/model/toastHook';

const AdminLoginForm = ({
  setOpen,
  setToastText,
  setToastIcon,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setToastText: (description: string) => void;
  setToastIcon: (status: ToastType) => void;
}) => {
  const { adminLogin, emailRef, passwordRef, isLoading } = useAdminLogin(
    setOpen,
    setToastText,
    setToastIcon
  );

  return (
    <form
      onSubmit={adminLogin}
      className="relative mt-[3rem] flex h-full w-[80%] flex-col items-start gap-y-[0.6rem] md:items-center md:justify-center md:gap-y-[1rem]"
    >
      <input
        ref={emailRef}
        type="email"
        placeholder="ID"
        className="flex h-[2.6rem] w-full rounded-3xl bg-[#d9d9d9] pl-[10%] md:h-[4rem]"
        onChange={() => {
          checkEmailValidate(emailRef, true);
        }}
        required
      ></input>
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        className="flex h-[2.6rem] w-full rounded-3xl bg-[#d9d9d9] pl-[10%] md:h-[4rem]"
        onChange={() => {
          checkPasswordValidate(passwordRef, true);
        }}
        required
      ></input>
      <div className="mt-[0.5rem] flex w-full items-center justify-center md:mt-[1rem] md:w-[4rem]">
        <button
          disabled={isLoading}
          type="submit"
          className={`flex aspect-1 w-[3.5rem] items-center justify-center rounded-full ${isLoading ? 'cursor-not-allowed bg-gray-200' : 'bg-[#f0edd4] hover:border-2 hover:border-[#ECCDB4] active:scale-[0.99] active:cursor-grabbing'}`}
        >
          {isLoading ? <Spinner /> : <FaArrowRightLong />}
        </button>
      </div>
    </form>
  );
};
export default AdminLoginForm;
