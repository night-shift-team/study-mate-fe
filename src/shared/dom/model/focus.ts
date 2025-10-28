export const resetFocus = () => {
  if (typeof document !== 'undefined')
    (document.activeElement as HTMLElement).blur();
};
