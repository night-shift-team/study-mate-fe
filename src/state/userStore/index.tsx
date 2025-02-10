import { UserLoginApiRes } from '@/page/login/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: UserLoginApiRes | null;
  setUser: (newUser: UserLoginApiRes | null) => void;
}

export const userStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (newUser: UserLoginApiRes | null) => set({ user: newUser }),
    }),
    {
      name: 'userStore',
    }
  )
);
