'use client';

import Logo from '@/assets/logo.png';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LoginButton } from '@/entities';
import Link from 'next/link';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import { addSocialLoginRedirectDataListener } from '../model/addSocialLoginResponseListener';
import { Router } from 'lucide-react';
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
import { accessTokenRefreshApi, AuthTokenRes } from '@/shared/user/api';
import { access } from 'fs';
import { usePopUpAnimationStyle } from '../model/usePopUpAnimationStyle';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
const Login = () => {
  const router = useRouter();
  const windowReference: Window | null = null;
  const [loginLoading, setLoginLoading] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const user = userStore.getState().user;
  const setUser = userStore.getState().setUser;

  // 인증 response 리스너
  addSocialLoginRedirectDataListener(setLoginLoading);

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

  const setTokens = (tokens: LocalLoginRes) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      console.log('로그인 시도:', formData);
      setLoginLoading(true);
      const tokens = await requestSignIn();
      setTokens(tokens);
      setAccessTokenToHeader(localStorage.getItem('accessToken'));
      getUserInfo();
    } catch (error) {
      console.error('로그인 에러:', error);
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
          setIsLoginSuccess(false);
          return;
        }
        router.push(RouteTo.Home);
      } else {
        const userData = res.payload as UserInfoRes;
        setUser(userData);
        setIsLoginSuccess(true);
        setTimeout(() => {
          if (!userData.userScore) {
            router.push(RouteTo.LevelTest);
          } else {
            router.push(RouteTo.Solve);
          }
        }, 1000);
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

  const { popupAnimationLocate } = usePopUpAnimationStyle(isLoginSuccess);

  useEffect(() => {
    if (loginLoading) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [loginLoading]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {
        <div
          className={`absolute z-[1] ${popupAnimationLocate} top-0 flex h-[3rem] w-[16rem] items-center justify-center rounded-xl border border-[#ebe5d6] bg-[#F0EDD4] text-[2.2vh] shadow-light transition-all duration-300 ease-in-out`}
        >
          Login Success
        </div>
      }
      <div className="flex w-full max-w-[700px] flex-col justify-around gap-6 rounded-lg bg-white p-8 shadow-lg md:flex-row">
        <div className="flex justify-center md:items-center">
          <Image src={Logo} alt="" width={200} />
        </div>
        <div className="flex flex-col gap-10 sm:gap-6 md:w-[50%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex w-[100%] flex-col gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="flex h-[2.5rem] w-full items-center justify-center rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
            >
              {loginLoading ? <Spinner /> : '로그인'}
            </button>{' '}
            <Link
              href={loginLoading ? '#' : '/signup'}
              onClick={(e) => (loginLoading ? e.preventDefault() : null)}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
              >
                아메일 회원가입{' '}
              </button>
            </Link>
            <Link
              href={loginLoading ? '#' : '/leveltest'}
              onClick={(e) => (loginLoading ? e.preventDefault() : null)}
            >
              <div className="cursor-pointer text-center text-sm text-gray-500 hover:text-gray-700">
                [로그인 없이 레벨 테스트 진행하기]
              </div>
            </Link>
          </form>

          <div className="flex flex-col justify-center gap-4">
            <div className="cursor-pointer text-center text-sm text-gray-700">
              SNS 계정으로 간단하게 시작하기!
            </div>
            <div className="flex justify-between">
              {LoginButton.map((item) => (
                <button
                  key={item.id}
                  disabled={loginLoading}
                  onClick={() => {
                    openNewWindowWithoutDuplicate(windowReference, item.link);
                  }}
                  className="flex cursor-pointer flex-col justify-center"
                >
                  <Image
                    src={item.img}
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <div className="text-center text-[1.3vh]">{item.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHoc(Login);
