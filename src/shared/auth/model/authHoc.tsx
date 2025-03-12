'use client';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { UserStoreStorage, userStore } from '@/state/userStore';
import { Router } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const AuthHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const user = userStore.getState().user;
    const path = usePathname();

    useEffect(() => {
      setIsMounted(true);

      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      if (!user && !(path === RouteTo.Login || path === RouteTo.Home)) {
        router.push(RouteTo.Login);
        return;
      }

      // 사용자 점수가 0인 경우 레벨 테스트 페이지로 리다이렉트
      if (user && user.userScore === 0) {
        router.push(RouteTo.LevelTest);
        return;
      }
      // 인증된 사용자가 홈 또는 로그인 페이지에 접근한 경우 Solve 페이지로 리다이렉트
      if (user && (path === RouteTo.Home || path === RouteTo.Login)) {
        router.push(RouteTo.Solve);
        return;
      }
    }, [user, path, router]);

    if (!isMounted) return null;

    return (
      // 비로그인 유저는 로그인,홈페이지만 접근 가능
      (!user && (path === RouteTo.Home || path === RouteTo.Login)) ||
        // 로그인 유저(0)는 레벨테스트 페이지만 접근 가능
        (user?.userScore === 0 && path === RouteTo.LevelTest) ||
        // 레벨테스트 완료 유저(!0)은 로그인,홈,레벨테스트 페이지 제외한모든 페이지 접근 가능
        (user?.userScore !== 0 &&
          !(
            path === RouteTo.Home ||
            path === RouteTo.Login ||
            path === RouteTo.LevelTest
          )) ? (
        <WrappedComponent {...props} />
      ) : null
    );
  };
  HOC.displayName = `AuthHoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};
export default AuthHoc;
