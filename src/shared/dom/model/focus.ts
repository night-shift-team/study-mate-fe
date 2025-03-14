export const resetFocus = () => {
  (document.activeElement as HTMLElement).blur();
};
