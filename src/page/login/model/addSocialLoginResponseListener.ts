'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { GoogleSignInApiRes, googleSignInApi, githubSigninApi } from '../api';
import { ServerErrorResponse } from '@/shared/apis/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';

export const addSocialLoginRedirectDataListener = (
  setIsAuthSucess: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();

  const googleLogin = async (authData: string) => {
    try {
      const res = await googleSignInApi(authData);
      console.log('Google Login Response:', res);
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
    } catch (e: any) {
      console.error('Google Login Error:', e);
    }
  };

  const githubLogin = async (authData: string) => {
    try {
      const res = await githubSigninApi(authData); // GitHub 전용 API 호출
      console.log('GitHub Login Response:', res);
      if (!res.ok) {
        const errData = res.payload as ServerErrorResponse;
        if (errData.ecode === Ecode.E0106) {
          EcodeMessage(Ecode.E0106);
          return;
        }
      }
      const data = res.payload as GoogleSignInApiRes; // GitHub 응답 구조가 동일하다고 가정
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (e: any) {
      console.error('GitHub Login Error:', e);
    }
  };

  useEffect(() => {
    const messageListener = (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return;

      const { authData, provider } = event.data; // provider 추가
      if (!authData || !provider) return;
      console.log('provider', provider);

      console.log(
        'Received authentication code:',
        authData,
        'Provider:',
        provider
      );

      if (provider === 'google') {
        // Google 로그인 처리
        googleLogin(authData)
          .then(() => {
            setIsAuthSucess(true);
          })
          .catch((e) => {
            console.error(e);
            router.push('/login');
          });
      } else if (provider === 'github') {
        // GitHub 로그인 처리
        githubLogin(authData)
          .then(() => {
            setIsAuthSucess(true);
          })
          .catch((e) => {
            console.error(e);
            router.push('/login');
          });
      }
    };

    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, [googleLogin, githubLogin, router, setIsAuthSucess]);
};
