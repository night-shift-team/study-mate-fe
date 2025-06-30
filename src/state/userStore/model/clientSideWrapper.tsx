'use client';
import { GetUserInfoRes } from '@/page/signup/api';
import { userStore } from '..';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const UserStateWrapper = ({
  user,
  children,
}: {
  user?: GetUserInfoRes | null | undefined;
  children: React.ReactNode;
}) => {
  const currentUser = userStore.getState().user;
  const router = useRouter();
  const setUser = userStore.getState().setUser;

  // 매개변수 없이 넘이 넘겨주면 User 값이 있는지 확인
  if (typeof user === 'undefined') {
    if (!currentUser) {
      setUser(null);
    }
  } else {
    // 매개변수 있게 날려주면
    setUser(user);
  }

  return <>{children}</>;
};
export default UserStateWrapper;
