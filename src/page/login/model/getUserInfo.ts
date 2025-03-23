import {
  handleFetchErrors,
  ServerErrorResponse,
} from '@/shared/api/model/config';
import { userInfoApi, UserInfoRes } from '../api';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { UserStoreStorage } from '@/state/userStore';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';
import { UserInfo } from '@/shared/constants/userInfo';

export const getUserInfo = async (
  setToastText: (description: string) => Promise<void>,
  setToastOpen: Dispatch<SetStateAction<boolean>>,
  setUser: (newUser: UserInfo | null) => void,
  router: AppRouterInstance,
  isAdmin?: boolean
) => {
  try {
    const res = await userInfoApi();
    console.log(res);
    if (!res.ok) {
      const errData = res.payload as ServerErrorResponse;
      if (errData.ecode === Ecode.E0106) {
        EcodeMessage(Ecode.E0106);
        localStorage.removeItem('accessToken');
        localStorage.removeItem(UserStoreStorage.userStore);
        setToastText('Login Failed');
        setToastOpen(true);
        return;
      }
      router.push(RouteTo.Home);
    } else {
      const userData = res.payload as UserInfoRes;
      setUser(userData);
      setToastText('Login Success');
      setToastOpen(true);
      setTimeout(() => {
        if (isAdmin && userData.role >= 7) {
          router.push(RouteTo.AdminDashboard);
          return;
        }
        if (!userData.userScore) {
          router.push(RouteTo.LevelTest);
        } else {
          router.push(RouteTo.Solve);
        }
      }, 2500);
    }
  } catch (e: any) {
    const error = handleFetchErrors(e);
    console.log('error', error);
    if (error === 'TypeError' || error === 'AbortError') {
      console.log('서버 에러');
    }
  }
};
