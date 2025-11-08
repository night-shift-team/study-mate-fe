import { resetFocus } from '@/shared/dom/model/focus';
import { useEffect, useRef, useState } from 'react';
import { setTokens } from './setTokens';
import {
  ServerErrorResponse,
  setTokenToHeader,
} from '@/shared/api/model/config';
import { getUserInfo } from './getUserInfo';
import { requestSignIn } from './requestSignIn';
import { Ecode } from '@/shared/api/model/ecode';
import { addSocialLoginRedirectDataListener } from './addSocialLoginResponseListener';

import { useRouter } from 'next/navigation';
import tooltipMountHook from '@/feature/tooltip/model/tooltipMount';
// import useTooltip from '@/feature/tooltip/model/tooltipController';
import { userStore } from '@/shared/state/userStore/model';
import { TooltipContents } from '@/shared/state/tooltip/model/tooltipContents';
import { InputStatus } from '@/shared/components/input/useInput';
import dynamic from 'next/dynamic';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';
import { getRoutePathByUserInfo } from './userInfoRoute';
import { LoginToastText } from './loginToastText';
const Toaster = dynamic(() => import('@/shared/toast/ui/toaster'), {
  ssr: false,
});

const useLoginPage = () => {
  const router = useRouter();
  const windowReference: Window | null = null;
  const [loginLoading, setLoginLoading] = useState(false);

  const setUser = userStore.getState().setUser;

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { setMountTooltip } = tooltipMountHook();
  // const { animationClass, setToastIcon, setToastDescription } = useToast(
  //   toastOpen,
  //   setToastOpen
  // );

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

  const [validationStatus, setValidationStatus] = useState({
    email: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingEmail,
    },
    password: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingPassword,
    },
  });
  // 인증 response 리스너
  addSocialLoginRedirectDataListener(setLoginLoading, setToastOpen, setUser);
  // const { showTooltip, hideTooltip, updateTooltip } = useTooltip();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationStatus((prev) => ({
      ...prev,
      [name]: {
        status: 'filled',
        message: '',
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이메일 유효성 검사

    if (emailInputRef.current && !emailInputRef.current.value) {
      // updateTooltip(emailInputRef.current, TooltipContents.TypingEmail);
      // showTooltip(emailInputRef.current);
      setValidationStatus((prev) => ({
        ...prev,
        email: { status: 'error', message: TooltipContents.TypingEmail },
      }));
      emailInputRef.current.focus();
      return;
    }

    if (emailInputRef.current && !emailInputRef.current.value.includes('@')) {
      // updateTooltip(emailInputRef.current, TooltipContents.NotEmailForm);
      // showTooltip(emailInputRef.current)
      setValidationStatus((prev) => ({
        ...prev,
        email: { status: 'error', message: TooltipContents.NotEmailForm },
      }));
      emailInputRef.current.focus();
      return;
    }

    // 비밀번호 유효성 검사
    if (passwordInputRef.current && !passwordInputRef.current.value) {
      // updateTooltip(passwordInputRef.current, TooltipContents.TypingPassword);
      // showTooltip(passwordInputRef.current);
      setValidationStatus((prev) => ({
        ...prev,
        password: { status: 'error', message: TooltipContents.TypingPassword },
      }));
      passwordInputRef.current.focus();
      return;
    }

    // 모든 유효성 검사를 통과한 경우
    // hideTooltip(emailInputRef.current!);
    // hideTooltip(passwordInputRef.current!);

    setLoginLoading(true);
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      const tokens = await requestSignIn(formData.email, formData.password);
      setTokens(tokens);
      setTokenToHeader(localStorage.getItem('accessToken'));
      const userInfoRes = await getUserInfo(setToastOpen, setUser, router);
      if (!userInfoRes) {
        throw new Error('유저 정보 불러오기 실패');
      }
      const res = await fetch('/api/session/start', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        credentials: 'include',
      });
      console.log('middleware set session res:', res);
      const routePath = getRoutePathByUserInfo(userInfoRes);
      router.push(routePath);
    } catch (error) {
      if ((error as ServerErrorResponse).ecode !== undefined) {
        console.log('에러,', error);
        switch ((error as ServerErrorResponse).ecode) {
          case Ecode.E0103:
            if (emailInputRef.current) {
              emailInputRef.current.focus();
              // updateTooltip(
              //   emailInputRef.current,
              //   TooltipContents.InvalidEmail
              // );
              // showTooltip(emailInputRef.current);
              setValidationStatus((prev) => ({
                ...prev,
                email: {
                  status: 'error',
                  message: TooltipContents.InvalidEmail,
                },
              }));
              // setToastOpen(ToastType.error, TooltipContents.InvalidEmail);
              emailInputRef.current.focus();
              setLoginLoading(false);
            }
            break;
          case Ecode.E0104:
            if (passwordInputRef.current) {
              passwordInputRef.current.focus();
              // updateTooltip(
              //   passwordInputRef.current,
              //   TooltipContents.InvalidPassword
              // );
              // showTooltip(passwordInputRef.current);
              setValidationStatus((prev) => ({
                ...prev,
                password: {
                  status: 'error',
                  message: TooltipContents.InvalidPassword,
                },
              }));
              // setToastOpen(ToastType.error, TooltipContents.InvalidPassword);
              passwordInputRef.current.focus();
              setLoginLoading(false);
            }
            break;
          default:
            setToastOpen(ToastType.error, 'Login Failed');
            setLoginLoading(false);
            break;
        }
      } else {
        console.error('로그인 에러:', error);
        setToastOpen(ToastType.error, LoginToastText.LOGIN_TRY_AGAIN);
        setLoginLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loginLoading) {
      resetFocus();
    }
  }, [loginLoading]);

  useEffect(() => {
    // 툴팁 마운트
    setMountTooltip(
      emailInputRef.current as HTMLElement,
      TooltipContents.TypingEmail
    );
    setMountTooltip(
      passwordInputRef.current as HTMLElement,
      TooltipContents.TypingPassword
    );

    // 로그인 폼 enter 리스너
    const form = document.getElementById('loginForm') as HTMLFormElement | null;
    if (!form) return;
    const formEnterListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement.tagName === 'INPUT') {
          e.preventDefault();
          const loginButton = document.getElementById('loginButton');
          if (loginButton) {
            loginButton.focus();
          }

          const event = new Event('submit', {
            bubbles: true,
            cancelable: true,
          });
          if (form.dispatchEvent(event)) {
            form.submit();
          }
        }
      }
    };
    form.addEventListener('keydown', formEnterListener);
    return () => {
      form.removeEventListener('keydown', formEnterListener);
    };
  }, []);

  return {
    Toaster,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    formData,
    handleChange,
    // hideTooltip,
    loginLoading,
    // animationClass,
    windowReference,
    validationStatus,
  };
};
export default useLoginPage;
