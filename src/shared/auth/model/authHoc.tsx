'use client';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { UserStoreStorage, userStore } from '@/state/userStore';
import { Router } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const LoginHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const user = userStore.getState().user;
    const path = usePathname();

    useEffect(() => {
      setIsMounted(true);
      if (!user && path !== RouteTo.Home && path !== RouteTo.Login) {
        router.push(RouteTo.Login);
        return;
      }
    }, []);
    if (!isMounted) return null;
    if (user && (path === RouteTo.Home || path === RouteTo.Login)) {
      router.push(RouteTo.Solve);
      return;
    }

    return user || path === RouteTo.Home || path === RouteTo.Login ? (
      <WrappedComponent {...props} />
    ) : null;
  };
  HOC.displayName = `LoginHoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};
export default LoginHoc;
