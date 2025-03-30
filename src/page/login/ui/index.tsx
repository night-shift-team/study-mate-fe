'use client';

import Logo from '@/assets/studyMate_logo.png';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LoginButton } from '@/entities';
import Link from 'next/link';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import { addSocialLoginRedirectDataListener } from '../model/addSocialLoginResponseListener';
import { useRouter } from 'next/navigation';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { UserStoreStorage, userStore } from '@/state/userStore';
import AuthHoc from '@/shared/auth/model/authHoc';
import {
  handleFetchErrors,
  ServerErrorResponse,
  setAccessTokenToHeader,
} from '@/shared/api/model/config';
import { localLoginApi, LocalLoginRes, userInfoApi, UserInfoRes } from '../api';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { resetFocus } from '@/shared/dom/model/focus';
import useToast from '@/shared/toast/toast';
import {
  checkEmailValidate,
  checkPasswordValidate,
} from '../model/checkInputValidate';
import { setTokens } from '../model/setTokens';
import { requestSignIn } from '../model/requestSignIn';
import { getUserInfo } from '../model/getUserInfo';
import InstallButton from '@/app/install-button';
import PushNotificationButton from '@/app/push-notification';
import PushNotificationButtonV2 from '@/app/noticeTestComponent';

const Login = () => {
  const router = useRouter();
  const windowReference: Window | null = null;
  const [loginLoading, setLoginLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const user = userStore.getState().user;
  const setUser = userStore.getState().setUser;

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);
  // 인증 response 리스너
  addSocialLoginRedirectDataListener(setLoginLoading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkPasswordValidate(passwordInputRef, true);
    checkEmailValidate(emailInputRef, true);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      setLoginLoading(true);
      const tokens = await requestSignIn(formData.email, formData.password);
      setTokens(tokens);
      setAccessTokenToHeader(localStorage.getItem('accessToken'));
      await getUserInfo(setToastDescription, setToastOpen, setUser, router);
    } catch (error) {
      if ((error as ServerErrorResponse).ecode !== undefined) {
        switch ((error as ServerErrorResponse).ecode) {
          case Ecode.E0103:
            emailInputRef.current?.focus();
            checkEmailValidate(emailInputRef, false);
            break;
          case Ecode.E0104:
            passwordInputRef.current?.focus();
            checkPasswordValidate(passwordInputRef, false);
            break;
          default:
            break;
        }
      } else {
        console.error('로그인 에러:', error);
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

  return (
    <div className="relative z-[1000] flex h-full w-full flex-col items-center justify-center overflow-hidden overflow-y-auto scrollbar-hide md:flex-row md:pb-[4rem]">
      <Toaster />
      <div className="md:inner-border-left flex w-full max-w-[900px] flex-col justify-evenly bg-white/60 px-8 py-3 shadow-xl md:flex-row md:justify-around md:gap-6 md:rounded-[1rem] md:border md:p-8">
        <div className="flex flex-col justify-center md:items-center">
          <InstallButton />
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
          >
            <div className="flex w-[100%] flex-col">
              <span className="text-[0.8rem]">Email</span>
              <input
                ref={emailInputRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                required
              />
              <span className="mt-2 text-[0.8rem]">Password</span>
              <input
                ref={passwordInputRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="비밀번호"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                required
              />
              <div className="mt-4 flex w-full justify-between">
                <div>
                  <input type="checkbox" disabled={true} className="mr-2" />
                  <span className="text-[0.8rem]">로그인 상태 유지</span>
                </div>
                <div>
                  <button
                    disabled={true}
                    className="text-[0.8rem] font-bold text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4"
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
              className={`flex h-[2.5rem] w-full items-center justify-center rounded-lg bg-gray-600 py-1 text-white transition-colors md:py-2 ${loginLoading ? 'hover:bg-gray-400' : 'hover:bg-[#F0EDD4] hover:text-black'}`}
            >
              {loginLoading ? <Spinner /> : '로그인'}
            </button>{' '}
            {/* <Link
              href={loginLoading ? '#' : '/leveltest'}
              onClick={(e) => (loginLoading ? e.preventDefault() : null)}
            >
              <div className="cursor-pointer text-center text-sm text-gray-500 hover:text-gray-700">
                [로그인 없이 레벨 테스트 진행하기]
              </div>
            </Link> */}
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
            <div className="flex w-full justify-between gap-4">
              {LoginButton.map((item) => (
                <button
                  key={item.id}
                  disabled={loginLoading}
                  onClick={() => {
                    openNewWindowWithoutDuplicate(windowReference, item.link);
                  }}
                  className="flex h-[4rem] w-1/3 cursor-pointer flex-col justify-center md:h-[5rem]"
                >
                  <div className="flex w-full justify-center rounded-md border-2 py-1">
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
      <PushNotificationButtonV2 />
    </div>
  );
};

export default AuthHoc(Login);
