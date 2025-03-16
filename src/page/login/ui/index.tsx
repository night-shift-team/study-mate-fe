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
    checkPasswordValidate(true);
    checkEmailValidate(true);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setTokens = (tokens: LocalLoginRes) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      setLoginLoading(true);
      const tokens = await requestSignIn();
      setTokens(tokens);
      setAccessTokenToHeader(localStorage.getItem('accessToken'));
      await getUserInfo();
    } catch (error) {
      if ((error as ServerErrorResponse).ecode !== undefined) {
        switch ((error as ServerErrorResponse).ecode) {
          case Ecode.E0103:
            emailInputRef.current?.focus();
            checkEmailValidate(false);
            break;
          case Ecode.E0104:
            passwordInputRef.current?.focus();
            checkPasswordValidate(false);
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

  const getUserInfo = async () => {
    try {
      const res = await userInfoApi();
      console.log(res);
      if (!res.ok) {
        const errData = res.payload as ServerErrorResponse;
        if (errData.ecode === Ecode.E0106) {
          EcodeMessage(Ecode.E0106);
          localStorage.removeItem('accessToken');
          localStorage.removeItem(UserStoreStorage.userStore);
          setToastDescription('Login Failed');
          setToastOpen(true);
          return;
        }
        router.push(RouteTo.Home);
      } else {
        const userData = res.payload as UserInfoRes;
        setUser(userData);
        setToastDescription('Login Success');
        setToastOpen(true);
        setTimeout(() => {
          if (!userData.userScore) {
            router.push(RouteTo.LevelTest);
          } else {
            router.push(RouteTo.Solve);
          }
        }, 2500);
      }
    } catch (e: any) {
      const error = handleFetchErrors(e);
      console.log('error', error);
      if (error === 'TypeError' || error === 'AbortError') {
        console.log('서버 에러');
      }
    }
  };

  const requestSignIn = async () => {
    try {
      const res = await localLoginApi(formData.email, formData.password);
      console.log(res);
      if (res.ok) {
        return res.payload as LocalLoginRes;
      }
      throw res.payload as ServerErrorResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const checkEmailValidate = (isValid: boolean) => {
    if (!isValid && emailInputRef.current) {
      emailInputRef.current.setCustomValidity(
        '이메일 정보가 일치하지 않습니다.'
      );
      emailInputRef.current.reportValidity();
      return;
    } else if (isValid && emailInputRef.current) {
      emailInputRef.current.setCustomValidity('');
      return;
    }
  };

  const checkPasswordValidate = (isValid: boolean) => {
    if (!isValid && passwordInputRef.current) {
      passwordInputRef.current.setCustomValidity(
        '패스워드 정보가 일치하지 않습니다.'
      );
      passwordInputRef.current.reportValidity();
      return;
    } else if (isValid && passwordInputRef.current) {
      passwordInputRef.current.setCustomValidity('');
      return;
    }
  };

  useEffect(() => {
    if (loginLoading) {
      resetFocus();
    }
  }, [loginLoading]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-x-hidden pb-[4rem]">
      <Toaster />
      <div className="inner-border-left flex w-full max-w-[900px] flex-col justify-around gap-6 rounded-[1rem] bg-white/60 p-8 shadow-xl md:flex-row">
        <div className="flex flex-col justify-center md:items-center">
          <Image src={Logo} alt="" width={240} />
          <div className="flex w-full flex-col">
            <span className="text-2xl font-bold text-pointcolor-apricot">
              Study Mate
            </span>
            <span className="mt-1 max-w-[240px]">
              Online platform for solving computer science problems and
              enhancing learning.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-10 sm:gap-6 md:w-[50%]">
          <span className="font-doodle text-3xl font-bold">Welcome</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              type="submit"
              disabled={loginLoading}
              className={`flex h-[2.5rem] w-full items-center justify-center rounded-lg bg-gray-600 py-2 text-white transition-colors ${loginLoading ? 'hover:bg-gray-400' : 'hover:bg-[#F0EDD4] hover:text-black'}`}
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

          <div className="flex flex-col justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#fcfdf6] px-2 text-gray-500">
                  간편 로그인
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              {LoginButton.map((item) => (
                <button
                  key={item.id}
                  disabled={loginLoading}
                  onClick={() => {
                    openNewWindowWithoutDuplicate(windowReference, item.link);
                  }}
                  className="flex h-[5rem] w-1/3 cursor-pointer flex-col justify-center"
                >
                  <div className="flex justify-center rounded-md border-2 py-1">
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
            <div className="flex justify-center whitespace-pre-wrap text-[0.8rem]">
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
