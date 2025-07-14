import { UserInfo } from '@/shared/user/model/userInfo.types';
import { create } from 'zustand';

interface UserStore {
  user: UserInfo | null;
  setUser: (newUser: UserInfo | null) => void;
}

export enum UserStoreStorage {
  userStore = 'userStore',
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser: UserInfo | null) => set({ user: newUser }),
}));
