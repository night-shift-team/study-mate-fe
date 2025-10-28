import { create } from 'zustand';

export type PageLoaderState = 'loading' | 'loaded' | 'none';

interface IPageLoaderStore {
  status: PageLoaderState;
  setStatus: (status: PageLoaderState) => void;
}

export const pageLoaderStore = create<IPageLoaderStore>((set) => ({
  status: 'none',
  setStatus: (status: PageLoaderState) => set({ status: status }),
}));
