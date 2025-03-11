import { UserInfo } from '@/shared/constants/userInfo';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: UserInfo | null;
  setUser: (newUser: UserInfo | null) => void;
}

export enum UserStoreStorage {
  userStore = 'userStore',
}

export const userStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (newUser: UserInfo | null) => set({ user: newUser }),
    }),
    {
      name: 'userStore',
    }
  )
);
