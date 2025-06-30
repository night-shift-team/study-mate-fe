'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { googleSignInApi, LoginRes } from '../api';
import {
  ServerErrorResponse,
  setTokenToHeader,
} from '@/shared/api/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { setTokens } from './setTokens';
import { ServerResponse } from 'http';
import { getUserInfo } from './getUserInfo';
import { UserInfo } from '@/shared/constants/userInfo';
import { ToastType } from '@/shared/toast/toast';
import { LoginToastText } from './loginToastText';

export const addSocialLoginRedirectDataListener = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setToastDescription: (description: string) => void,
  setToastOpen: Dispatch<SetStateAction<boolean>>,
  setToastIcon: (status: ToastType) => void,
  setUser: (newUser: UserInfo | null) => void
) => {
  const router = useRouter();

  const googleLogin = async (authData: string) => {
    setLoading(true);
    try {
      const res = await googleSignInApi(authData);
      console.log('res', res);

      if (!res.ok || (res.payload && 'ecode' in res.payload)) {
        const errData = res.payload as ServerErrorResponse;
        if (errData.ecode === Ecode.E0106) {
          EcodeMessage(Ecode.E0106);
          throw new Error(EcodeMessage(Ecode.E0106));
        }
      }
      setTokens(res.payload as LoginRes);
      setTokenToHeader(localStorage.getItem('accessToken'));
      await getUserInfo(
        setToastDescription,
        setToastOpen,
        setToastIcon,
        setUser,
        router
      );
    } catch (e: any) {
      console.log(e);
      setToastDescription(LoginToastText.LOGIN_FAILED);
      setToastIcon(ToastType.error);
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const messageListener = (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return;

      const { authData } = event.data;
      if (!authData) return;

      console.log('Received authentication code:', authData);
      // 여기서 code를 사용하여 추가적인 처리를 수행합니다.
      googleLogin(authData);
    };
    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);
};
