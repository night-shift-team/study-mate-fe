'use client';
import { UserLoginApiRes, userLoginApi } from '@/page/login/api';
import { ServerErrorResponse } from '@/shared/apis/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { getRoutePath } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const LoginHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const initialAccessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const [localAccessToken, _] = useState(initialAccessToken);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    const userLogin = async () => {
      try {
        const res = await userLoginApi();
        console.log(res);
        setIsLogin(true);
      } catch (e: any) {
        console.log(e);
      }
    };
    useEffect(() => {
      if (!localAccessToken) {
        setIsLogin(false);
        router.push(getRoutePath('Home'));
        return;
      }
      userLogin();
    }, [localAccessToken]);

    return isLogin ? <WrappedComponent {...props} /> : null;
  };
};
export default LoginHoc;
