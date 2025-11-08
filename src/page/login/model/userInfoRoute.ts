import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { UserInfoRes } from '../api';

export const getRoutePathByUserInfo = (userInfoRes: UserInfoRes) => {
  if (userInfoRes.userScore === 0) {
    return RouteTo.Onboarding;
  }
  if (userInfoRes.passwordChangeRequired) {
    return RouteTo.ChangePassword;
  }
  return RouteTo.Solve;
};
