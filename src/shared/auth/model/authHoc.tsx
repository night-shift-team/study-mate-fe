'use client';
import { UserLoginApiRes, userLoginApi } from '@/page/login/api';
import { ServerErrorResponse } from '@/shared/apis/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const LoginHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const user = userStore.getState().user;
    const path = usePathname();

    console.log(path);
    useEffect(() => {
      setIsMounted(true);
      if (!user) {
        router.push(RouteTo.Login);
        return;
      }
    }, []);
    if (!isMounted) return null;
    if (path === RouteTo.Home || path === RouteTo.Login) {
      router.push(RouteTo.Solve);
      return;
    }
    return user ? <WrappedComponent {...props} /> : null;
  };
  HOC.displayName = `LoginHoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};
export default LoginHoc;
