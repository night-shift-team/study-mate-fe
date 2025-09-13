// toastStore.ts
'use client';
import { useSyncExternalStore } from 'react';

export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
export type ToastStatus = ToastType;

type ToastState = {
  open: boolean;
  status: ToastStatus;
  title?: string;
  description?: string;
};

const initialState: ToastState = {
  open: false,
  status: ToastType.info,
  title: '',
  description: '',
};

let state: ToastState = initialState;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());
const subscribe = (fn: () => void) => (
  listeners.add(fn), () => listeners.delete(fn)
);
const getSnapshot = () => state;
// SSR snapshot: must match the client's first snapshot to avoid hydration mismatches
const getServerSnapshot = () => initialState;

let hideTimer: ReturnType<typeof setTimeout> | null = null;
const DEFAULT_DURATION = 2000;
export const toastStore = {
  /** 보여주기 (duration 주면 auto-hide) */
  show(payload?: {
    status?: ToastStatus;
    title?: string;
    description?: string;
    duration?: number;
  }) {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    state = {
      open: true,
      status: payload?.status ?? state.status,
      title: payload?.title ?? '',
      description: payload?.description ?? '',
    };
    console.log('state', state);
    emit();
    if (!payload?.duration) {
      hideTimer = setTimeout(
        () => toastStore.hide(),
        payload?.duration ?? DEFAULT_DURATION
      );
    }
  },
  /** status/description/title만 부분 업데이트 */
  update(patch: Partial<Omit<ToastState, 'open'>>) {
    state = { ...state, ...patch };
    emit();
  },
  /** 닫기 */
  hide() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    if (!state.open) return;
    state = { ...state, open: false };
    emit();
  },

  // for useSyncExternalStore
  subscribe,
  getSnapshot,
};

/** 포털에서 현재 토스트 스냅샷 구독 */
export function useToastSnapshot() {
  return useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot
  );
}
