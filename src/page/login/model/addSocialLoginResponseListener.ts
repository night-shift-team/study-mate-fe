'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { googleSignInApi } from '../api';
import { setTokenToHeader } from '@/shared/api/model/config';
import { setTokens } from './setTokens';
import { getUserInfo } from './getUserInfo';

import { LoginToastText } from './loginToastText';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { Ecode, EcodeMessage } from '@/shared/api/model/ecode';
import { ToastType } from '@/shared/state/toast/toastStore';
import { getRoutePathByUserInfo } from './userInfoRoute';

export const addSocialLoginRedirectDataListener = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setToastOpen: (
    status?: ToastType,
    title?: string,
    description?: string,
    duration?: number
  ) => void,
  setUser: (newUser: UserInfo | null) => void
) => {
  const router = useRouter();

  const googleLogin = async (authData: string) => {
    setLoading(true);
    try {
      const res = await googleSignInApi(authData);

      if (!res.ok || (res.payload && 'ecode' in res.payload)) {
        EcodeMessage(Ecode.E0106);
        throw new Error(EcodeMessage(Ecode.E0106));
      }
      const tokens = res.payload;
      setTokens(tokens);
      setTokenToHeader(localStorage.getItem('accessToken'));
      const userInfoRes = await getUserInfo(setToastOpen, setUser, router);
      if (!userInfoRes) {
        throw new Error('유저 정보 불러오기 실패');
      }
      const sessionApiRes = await fetch('/api/session/start', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        credentials: 'include',
      });
      console.log('middleware set session res:', sessionApiRes);
      const routePath = getRoutePathByUserInfo(userInfoRes);
      router.push(routePath);
    } catch (e: any) {
      console.log(e);
      setToastOpen(ToastType.error, LoginToastText.LOGIN_FAILED);
      setLoading(false);
    }
  };

  useEffect(() => {
    const messageListener = (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return;

      const { authData } = event.data;
      if (!authData) return;

      // 여기서 code를 사용하여 추가적인 처리를 수행합니다.
      googleLogin(authData);
    };
    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);
};
