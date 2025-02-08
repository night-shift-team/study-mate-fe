import { getRoutePath } from '@/shared/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { googleSignInApi, nickNameDuplicateCheckApi } from '../api';
import { ServerErrorResponse } from '@/shared/api/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';

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
          // EcodeMessage(Ecode.E0106) 토스트
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    let lazyLink: number | NodeJS.Timeout | undefined;
    const messageListener = (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return;

      const { authData } = event.data;
      if (!authData) return;

      console.log('Received authentication code:', authData);
      // 여기서 code를 사용하여 추가적인 처리를 수행합니다.

      setIsAuthSucess(true);
      // lazyLink = setTimeout(async() => {
      //   setIsAuthSucess(false);
      //   router.push('/solve');
      // }, 1500);
    };
    window.addEventListener('message', messageListener);
    return () => {
      removeEventListener('message', messageListener);
      clearTimeout(lazyLink);
    };
  }, []);
};
