// stores/tippyStore.ts
import { Instance, Props } from 'tippy.js';
import { create } from 'zustand';

interface TippyStore {
  tippyInstances: Map<HTMLElement, Instance<Props>>; // Map으로 변경하여 특정 DOM 요소와 연결
  setTippyInstance: (element: HTMLElement, instance: any) => void;
  clearAllTippyInstances: () => void;
  clearTargetTippyInstances: (element: HTMLElement) => void;
}

export const tippyStore = create<TippyStore>((set) => ({
  tippyInstances: new Map(),
  setTippyInstance: (element, instance) =>
    set((state) => {
      const newMap = new Map(state.tippyInstances);
      newMap.set(element, instance);
      return { tippyInstances: newMap };
    }),
  clearAllTippyInstances: () => set({ tippyInstances: new Map() }),
  clearTargetTippyInstances: (element: HTMLElement) => {
    set((state) => {
      const currentTippyInstances = new Map(state.tippyInstances);
      currentTippyInstances.delete(element);
      return { tippyInstances: currentTippyInstances };
    });
  },
}));
