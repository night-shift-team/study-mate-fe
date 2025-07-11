import { resetFocus } from '@/shared/dom/model/focus';
import useToast, { ToastType } from '@/shared/toast/model/toastHook';
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
import useTooltip from '@/feature/tooltip/model/tooltipController';
import { userStore } from '@/shared/state/userStore/model';
import { TooltipContents } from '@/shared/state/tooltip/model/tooltipContents';

const useLoginPage = () => {
  const router = useRouter();
  const windowReference: Window | null = null;
  const [loginLoading, setLoginLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const setUser = userStore.getState().setUser;

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { setMountTooltip } = tooltipMountHook();
  const { Toaster, setToastIcon, setToastDescription } = useToast(
    toastOpen,
    setToastOpen
  );
  // 인증 response 리스너
  addSocialLoginRedirectDataListener(
    setLoginLoading,
    setToastDescription,
    setToastOpen,
    setToastIcon,
    setUser
  );
  const { showTooltip, hideTooltip, updateTooltip } = useTooltip();

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이메일 유효성 검사

    if (emailInputRef.current && !emailInputRef.current.value) {
      updateTooltip(emailInputRef.current, TooltipContents.TypingEmail);
      showTooltip(emailInputRef.current);
      emailInputRef.current.focus();
      return;
    }

    if (emailInputRef.current && !emailInputRef.current.value.includes('@')) {
      updateTooltip(emailInputRef.current, TooltipContents.NotEmailForm);
      showTooltip(emailInputRef.current);
      emailInputRef.current.focus();
      return;
    }

    // 비밀번호 유효성 검사
    if (passwordInputRef.current && !passwordInputRef.current.value) {
      updateTooltip(passwordInputRef.current, TooltipContents.TypingPassword);
      showTooltip(passwordInputRef.current);
      passwordInputRef.current.focus();
      return;
    }

    // 모든 유효성 검사를 통과한 경우
    hideTooltip(emailInputRef.current!);
    hideTooltip(passwordInputRef.current!);

    setLoginLoading(true);
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      const tokens = await requestSignIn(formData.email, formData.password);
      setTokens(tokens);
      setTokenToHeader(localStorage.getItem('accessToken'));
      await getUserInfo(
        setToastDescription,
        setToastOpen,
        setToastIcon,
        setUser,
        router
      );
    } catch (error) {
      if ((error as ServerErrorResponse).ecode !== undefined) {
        switch ((error as ServerErrorResponse).ecode) {
          case Ecode.E0103:
            if (emailInputRef.current) {
              emailInputRef.current.focus();
              updateTooltip(
                emailInputRef.current,
                TooltipContents.InvalidEmail
              );
              showTooltip(emailInputRef.current);
              emailInputRef.current.focus();
            }
            break;
          case Ecode.E0104:
            if (passwordInputRef.current) {
              passwordInputRef.current.focus();
              updateTooltip(
                passwordInputRef.current,
                TooltipContents.InvalidPassword
              );
              showTooltip(passwordInputRef.current);
              passwordInputRef.current.focus();
            }
            break;
          default:
            break;
        }
      } else {
        console.error('로그인 에러:', error);
        setToastIcon(ToastType.error);
        setToastDescription('Login Failed');
        setToastOpen(true);
      }
    } finally {
      setLoginLoading(false);
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

  const testToast = () => {
    setToastIcon(ToastType.info);
    setToastDescription('준비 중 입니다');
    setToastOpen(true);
  };

  return {
    Toaster,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    formData,
    handleChange,
    hideTooltip,
    testToast,
    loginLoading,
    windowReference,
  };
};
export default useLoginPage;
