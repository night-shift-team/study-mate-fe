import {
  handleFetchErrors,
  ServerErrorResponse,
} from '@/shared/api/model/config';
import { userInfoApi, UserInfoRes } from '../api';

import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';
import { LoginToastText } from './loginToastText';
import { ToastType } from '@/shared/toast/model/toastHook';
import { Ecode, EcodeMessage } from '@/shared/api/model/ecode';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { UserStoreStorage } from '@/shared/state/userStore/model';

export const getUserInfo = async (
  setToastText: (description: string) => void,
  setToastOpen: Dispatch<SetStateAction<boolean>>,
  setToastIcon: (status: ToastType) => void,
  setUser: (newUser: UserInfo | null) => void,
  router: AppRouterInstance,
  isAdmin?: boolean
) => {
  try {
    const res = await userInfoApi();
    if (!res.ok) {
      const errData = res.payload as ServerErrorResponse;
      if (errData.ecode === Ecode.E0106) {
        EcodeMessage(Ecode.E0106);
        localStorage.removeItem('accessToken');
        localStorage.removeItem(UserStoreStorage.userStore);
        setToastText(LoginToastText.LOGIN_FAILED);
        setToastIcon(ToastType.success);
        setToastOpen(true);
        return;
      }
      router.push(RouteTo.Home);
    } else {
      const userData = res.payload as UserInfoRes;
      setUser(userData);
      setToastText(LoginToastText.LOGIN_SUCCESS);
      setToastIcon(ToastType.success);
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
    if (error === 'TypeError' || error === 'AbortError') {
      console.log(e);
    }
  }
};
