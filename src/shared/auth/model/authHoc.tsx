'use client';
import { UserLoginApiRes, userLoginApi } from '@/page/login/api';
import { ServerErrorResponse } from '@/shared/apis/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { getRoutePath } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const LoginHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const initialAccessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const [localAccessToken, _] = useState(initialAccessToken);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    const { user } = userStore();
    const { setUser } = userStore();

    const userLogin = async () => {
      try {
        const res = await userLoginApi();
        console.log(res);
        if (!res.ok) {
          const errData = res.payload as ServerErrorResponse;
          if (errData.ecode === Ecode.E0106) {
            EcodeMessage(Ecode.E0106);
            return;
          }
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLogin(false);
          router.push(getRoutePath('Home'));
          return;
        }
        setIsLogin(true);
        setUser(res.payload as UserLoginApiRes);
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
  HOC.displayName = `LoginHoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};
export default LoginHoc;
