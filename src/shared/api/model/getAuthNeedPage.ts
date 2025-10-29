import { RouteTo } from '@/shared/routes/model/getRoutePath';

export const isAuthNeedPage = (path: string): boolean => {
  switch (path) {
    case RouteTo.LevelTest:
    case RouteTo.LevelTestResult:
    case RouteTo.ChangePassword:
    case RouteTo.SignupComplete:
    case RouteTo.Rank:
    case RouteTo.WriteSuggestion:
      return true;
  }

  if (
    path.startsWith(RouteTo.AdminLogin) ||
    path.startsWith(RouteTo.Mypage) ||
    path.startsWith(RouteTo.Solve) ||
    path.startsWith(RouteTo.Store) ||
    path.startsWith(RouteTo.LevelTestResult)
  ) {
    return true;
  }

  return false;
};
