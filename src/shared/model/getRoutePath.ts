type RouteName =
  | 'Home'
  | 'SolveProblem'
  | 'AdminLogin'
  | 'AdminDashboard'
  | 'AdminManagementUser'
  | 'AdminManagementProblem';
type RoutePath =
  | '/'
  | '/login'
  | '/signup'
  | '/solve'
  | '/admin'
  | '/admin/dashboard'
  | '/admin/management/user'
  | '/admin/management/problem';

export const getRoutePath = (routeName: RouteName): RoutePath => {
  switch (routeName) {
    case 'Home':
      return '/';
    case 'SolveProblem':
      return '/solve';
    case 'AdminLogin':
      return '/admin';
    case 'AdminDashboard':
      return '/admin/dashboard';
    case 'AdminManagementUser':
      return '/admin/management/user';
    case 'AdminManagementProblem':
      return '/admin/management/problem';
    default:
      return '/';
  }
};
