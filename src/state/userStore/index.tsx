import { UserLoginApiRes } from '@/page/login/api';
import { create } from 'zustand';

interface UserStore {
  user: UserLoginApiRes;
  setUser: (newUser: UserLoginApiRes) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: {
    userId: 0n,
    loginType: 'LOCAL',
    loginId: '',
    nickname: '',
    profileImg: '',
    status: 'ACTIVE',
    role: 0,
    registeredAt: null,
  },
  setUser: (newUser: UserLoginApiRes) => set({ user: newUser }),
}));
