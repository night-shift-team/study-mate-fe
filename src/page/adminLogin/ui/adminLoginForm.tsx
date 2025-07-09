'use client';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import {
  ServerErrorResponse,
  setTokenToHeader,
} from '@/shared/api/model/config';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Ecode } from '@/shared/errorApi/ecode';
import {
  checkEmailValidate,
  checkPasswordValidate,
} from '@/page/login/model/checkInputValidate';
import { setTokens } from '@/page/login/model/setTokens';
import { requestSignIn } from '@/page/login/model/requestSignIn';
import { getUserInfo } from '@/page/login/model/getUserInfo';
import { userStore } from '@/state/userStore';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { LoginToastText } from '@/page/login/model/loginToastText';
import { ToastType } from '@/shared/toast/toast';

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
  const router = useRouter();
  //TODO: 로그인 후 롤 체크 후 사용자면 홈, 관리자면 관리 홈으로 이동
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUser = userStore.getState().setUser;
  const [isLoading, setIsLoading] = useState(false);

  const adminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const email = (form[0] as HTMLInputElement).value;
      const password = (form[1] as HTMLInputElement).value;
      if (email.length === 0 || password.length === 0) return;
      const res = await requestSignIn(email, password);
      setTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      setTokenToHeader(localStorage.getItem('accessToken'));
      await getUserInfo(
        setToastText,
        setOpen,
        setToastIcon,
        setUser,
        router,
        true
      );
    } catch (error) {
      if ((error as ServerErrorResponse).ecode === Ecode.E0103) {
        emailRef.current?.focus();
        checkEmailValidate(emailRef, false);
        return;
      }
      if ((error as ServerErrorResponse).ecode === Ecode.E0104) {
        passwordRef.current?.focus();
        checkPasswordValidate(passwordRef, false);
        return;
      }
      console.error('로그인 에러:', error);
      setToastText(LoginToastText.LOGIN_FAILED);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
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
