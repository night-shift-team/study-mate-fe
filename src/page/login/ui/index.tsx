'use client';

import Logo from '@public/assets/backgroundImages/main/studyMate_logo.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LoginButton } from '@/entities';
import Link from 'next/link';
import { addSocialLoginRedirectDataListener } from '../model/addSocialLoginResponseListener';
import { useRouter } from 'next/navigation';
import { Ecode } from '@/shared/errorApi/ecode';
import { userStore } from '@/state/userStore';
import AuthHoc from '@/shared/auth/model/authHoc';
import {
  ServerErrorResponse,
  setTokenToHeader,
} from '@/shared/api/model/config';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { resetFocus } from '@/shared/dom/model/focus';
import useToast, { ToastType } from '@/shared/toast/toast';

import { setTokens } from '../model/setTokens';
import { requestSignIn } from '../model/requestSignIn';
import { getUserInfo } from '../model/getUserInfo';
import InstallButton from '@/app/install-button';
import useTooltip from '@/feature/tooltip/tooltipController';
import { TooltipContents } from '@/state/tooltip/tooltipContents';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import tooltipMountHook from '@/feature/tooltip/tooltipMount';

const Login = () => {
  const router = useRouter();
  const windowReference: Window | null = null;
  const [loginLoading, setLoginLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const user = userStore.getState().user;
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

  const [emailError, setEmailError] = useState<string | null>(null);

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
      console.log('loginpage catch error', error);
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
        console.log('activeElement', activeElement.tagName);
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

  return (
    <div className="relative z-[1000] flex h-full w-full animate-fade-in flex-col items-center overflow-hidden overflow-y-auto bg-white/60 duration-300 scrollbar-hide md:flex-row md:justify-center md:bg-transparent md:pb-[4rem]">
      <Toaster />
      <div className="absolute right-0 md:left-[50%] md:right-auto md:top-5 md:-translate-x-[50%]">
        <InstallButton />
      </div>
      <div className="md:inner-border-left nd:shadow-xl flex h-full w-full max-w-[900px] flex-col justify-evenly bg-white/60 px-8 py-3 md:h-auto md:flex-row md:justify-around md:gap-6 md:rounded-[1rem] md:border md:p-8">
        <div className="flex flex-col justify-center md:items-center">
          {/* <PushNotificationButton /> */}
          <Image
            src={Logo}
            alt=""
            className="h-[20vh] w-[20vh] md:h-[240px] md:w-[240px]"
          />
          <div className="flex w-full flex-col">
            <span className="text-lg font-bold text-pointcolor-apricot md:text-2xl">
              Study Mate
            </span>
            <span className="mt-1 break-words text-sm md:max-w-[240px] md:text-base">
              Online platform for solving computer science problems and
              enhancing learning.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 md:w-[50%] md:gap-10">
          <span className="font-doodle text-xl font-bold md:text-3xl">
            Welcome
          </span>
          <form
            id={'loginForm'}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 md:gap-4"
            noValidate
          >
            <div className="flex w-[100%] flex-col">
              <span className="text-[0.8rem]">Email</span>

              <input
                ref={emailInputRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  if (emailInputRef.current) {
                    hideTooltip(emailInputRef.current);
                  }
                }}
                placeholder="이메일"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
              <span className="mt-2 text-[0.8rem]">Password</span>
              <input
                ref={passwordInputRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  if (passwordInputRef.current) {
                    hideTooltip(passwordInputRef.current);
                  }
                }}
                placeholder="비밀번호"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />

              <div className="mt-4 flex w-full justify-between">
                <div>
                  <input
                    type="checkbox"
                    disabled={true}
                    className="mr-2"
                    checked
                  />
                  <span className="text-[0.8rem]">로그인 상태 유지</span>
                </div>
                <div>
                  <button
                    disabled={true}
                    className={`text-[0.8rem] font-bold ${
                      true
                        ? 'text-gray-400'
                        : 'text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      testToast();
                    }}
                  >
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </div>
            <button
              id="loginButton"
              type="submit"
              disabled={loginLoading}
              className={`text-balck flex h-[2.5rem] w-full items-center justify-center rounded-lg bg-pointcolor-sand/80 py-1 text-gray-600 transition-colors inner-border-pointcolor-beigebrown hover:text-black md:py-2 ${loginLoading ? 'hover:none' : 'hover:inner-border-[1.2px]'}`}
            >
              {loginLoading ? <Spinner color="#6b7280" /> : '로그인'}
            </button>{' '}
          </form>

          <div className="flex w-full flex-col justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#fcfdf6] px-2 text-xs text-gray-500 md:text-sm">
                  간편 로그인
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center gap-4">
              {LoginButton.map((item) => (
                <button
                  key={item.id}
                  disabled={loginLoading}
                  onClick={(e) => {
                    if (item.title != 'google') {
                      e.preventDefault();
                      testToast();
                      return;
                    }
                    openNewWindowWithoutDuplicate(windowReference, item.link);
                  }}
                  className="flex h-[4rem] w-1/3 cursor-pointer flex-col justify-center md:h-[5rem]"
                >
                  <div className="flex w-full justify-center rounded-md border py-1">
                    <Image
                      src={item.img}
                      alt=""
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-0.5 flex justify-center whitespace-pre-wrap text-[0.8rem]">
              <span>계정이 없으신가요? </span>
              <Link
                href={loginLoading ? '#' : '/signup'}
                onClick={(e) => (loginLoading ? e.preventDefault() : null)}
              >
                <span className="font-bold text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4">
                  회원가입
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHoc(Login);
