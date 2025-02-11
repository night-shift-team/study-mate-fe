'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { GoogleSignInApiRes, googleSignInApi } from '../api';
import { ServerErrorResponse } from '@/shared/apis/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

export const addSocialLoginRedirectDataListener = (
  setIsAuthSucess: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();

  const googleLogin = async (authData: string) => {
    try {
      const res = await googleSignInApi(authData);
      console.log('res', res);
      if (!res.ok) {
        const errData = res.payload as ServerErrorResponse;
        if (errData.ecode === Ecode.E0106) {
          EcodeMessage(Ecode.E0106);
          return;
        }
      }
      const data = res.payload as GoogleSignInApiRes;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsAuthSucess(true);
    } catch (e: any) {
      console.log(e);
      // router.push(RouteTo.Login);
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
