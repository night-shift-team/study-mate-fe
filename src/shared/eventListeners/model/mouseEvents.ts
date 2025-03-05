export const RootWheelSetStateListener = (callback: () => void) => {
  const rootContainer = document.getElementById('root-container');
  if (!rootContainer) return;
  const wheelListener = (event: WheelEvent) => {
    callback();
  };
  rootContainer.addEventListener('wheel', wheelListener);
  return () => removeEventListener('wheel', wheelListener);
};

export const HorizonTalScrollContainer = () => {
  const container = document.getElementById('horizontal-scroll-container');
  if (!container) return;

  const wheelListener = (event: WheelEvent) => {
    container.scrollLeft += event.deltaY;
  };
  container.addEventListener('wheel', wheelListener);

  return () => removeEventListener('wheel', wheelListener);
};

export const outSideClickContainer = (
  attrStr: string,
  callback: () => void
) => {
  const container = document.getElementById('root-container');
  if (!container) return;

  const handleOutsideClick = (event: MouseEvent) => {
    const targetContainer = document.getElementById(
      'category-select-container-' + attrStr
    );
    if (!targetContainer) return;

    if (!targetContainer.contains(event.target as Node)) {
      callback();
    }
  };
  container.addEventListener('click', handleOutsideClick);
  return () => removeEventListener('click', handleOutsideClick);
};
