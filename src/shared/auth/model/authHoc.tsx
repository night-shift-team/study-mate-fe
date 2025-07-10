'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/shared/state/userStore';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

const AuthHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const user = userStore.getState().user;
    const IsAdmin = (user && user.role >= 7) ?? false;
    const path = usePathname();

    useEffect(() => {
      setIsMounted(true);

      //TODO: switch문으로 변경
      // 미로그인 유저는 admin페이지 접근 불가
      if (!user && path.includes('/admin/')) {
        router.push(RouteTo.AdminLogin);
        return;
      }

      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      if (
        !user &&
        path !== RouteTo.AdminLogin &&
        !(path === RouteTo.Login || path === RouteTo.Home)
      ) {
        router.push(RouteTo.Login);
        return;
      }

      // 사용자 점수가 0인 경우 레벨 테스트 페이지로 리다이렉트
      if (user && user.userScore === 0 && path !== RouteTo.LevelTest) {
        router.push(RouteTo.LevelTest);
        return;
      }
      // 인증된 사용자가 홈 또는 로그인 페이지에 접근한 경우 Solve 페이지로 리다이렉트
      if (
        user &&
        user.userScore !== 0 &&
        (path === RouteTo.Home ||
          path === RouteTo.Login ||
          path === RouteTo.LevelTest)
      ) {
        router.push(RouteTo.Solve);
        return;
      }
      // 일반 유저가 어드민 페이지 접근 시 홈으로 리다이렉트
      if (!IsAdmin && path.includes(RouteTo.AdminLogin + '/')) {
        router.push(RouteTo.Home);
        return;
      }
      if (IsAdmin && path === RouteTo.AdminLogin) {
        router.push(RouteTo.AdminDashboard);
        return;
      }
    }, [user, path, router]);

    if (!isMounted) return null;

    // 어드민 페이지 관련
    // 일반 유저는 어드민 페이지 접근 불가
    if (!IsAdmin && path.includes(RouteTo.AdminLogin + '/')) {
      return null;
    }
    if (IsAdmin && path === RouteTo.AdminLogin) {
      return null;
    }

    return (
      // 비로그인 유저는 로그인,홈페이지만 접근 가능
      (!user &&
        (path === RouteTo.Home ||
          path === RouteTo.Login ||
          path === RouteTo.AdminLogin)) ||
        // 로그인 유저(0)는 레벨테스트 페이지만 접근 가능
        (user && user.userScore === 0 && path === RouteTo.LevelTest) ||
        // 레벨테스트 완료 유저(!0)은 로그인,홈,레벨테스트 페이지 제외한모든 페이지 접근 가능
        (user &&
          user.userScore !== 0 &&
          !(path === RouteTo.Home || path === RouteTo.Login)) ? (
        <WrappedComponent {...props} />
      ) : null
    );
  };
  HOC.displayName = `AuthHoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};
export default AuthHoc;
