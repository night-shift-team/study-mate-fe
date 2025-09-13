'use client';
import {
  checkEmailValidate,
  checkPasswordValidate,
} from '@/page/login/model/checkInputValidate';
import { getUserInfo } from '@/page/login/model/getUserInfo';
import { LoginToastText } from '@/page/login/model/loginToastText';
import { requestSignIn } from '@/page/login/model/requestSignIn';
import { setTokens } from '@/page/login/model/setTokens';
import {
  ServerErrorResponse,
  setTokenToHeader,
} from '@/shared/api/model/config';
import { Ecode } from '@/shared/api/model/ecode';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';
import { userStore } from '@/shared/state/userStore/model';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const useAdminLogin = () => {
  const router = useRouter();
  //TODO: 로그인 후 롤 체크 후 사용자면 홈, 관리자면 관리 홈으로 이동
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUser = userStore.getState().setUser;
  const [isLoading, setIsLoading] = useState(false);

  const setToastOpen = (
    status?: ToastType,
    title?: string,
    description?: string,
    duration?: number
  ) => {
    toastStore.show({
      status: status,
      title: title,
      description: description,
      duration: duration,
    });
  };

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
      await getUserInfo(setToastOpen, setUser, router, true);
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
      setToastOpen(ToastType.error, LoginToastText.LOGIN_FAILED);
    } finally {
      setIsLoading(false);
    }
  };
  return { adminLogin, emailRef, passwordRef, isLoading };
};
export default useAdminLogin;
