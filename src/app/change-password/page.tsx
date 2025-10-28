'use client';
import ChangePasswordPage from '@/page/changePassword/ui';
import { userStore } from '@/shared/state/userStore/model';

const ChangePassword = () => {
  const user = userStore.getState().user;
  return <ChangePasswordPage user={user} />;
};
export default ChangePassword;
