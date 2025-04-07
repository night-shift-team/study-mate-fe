// stores/tippyStore.ts
import { create } from 'zustand';

interface TippyStore {
  tippyInstances: Map<HTMLElement, any>; // Map으로 변경하여 특정 DOM 요소와 연결
  setTippyInstance: (element: HTMLElement, instance: any) => void;
  clearTippyInstances: () => void;
}

export const tippyStore = create<TippyStore>((set) => ({
  tippyInstances: new Map(),
  setTippyInstance: (element, instance) =>
    set((state) => {
      const newMap = new Map(state.tippyInstances);
      newMap.set(element, instance);
      return { tippyInstances: newMap };
    }),
  clearTippyInstances: () => set({ tippyInstances: new Map() }),
}));
