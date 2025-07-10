import { userStore } from '@/shared/state/userStore';

const redirectHome = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

export const resetUserData = () => {
  const setUser = userStore.getState().setUser;
  setUser(null);
  redirectHome();
};
