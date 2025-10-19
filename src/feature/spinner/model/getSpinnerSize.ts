import { ComponentSize } from '../ui/spinnerUI';

export const getSpinnerSize = (size?: ComponentSize) => {
  switch (size) {
    case 'sm':
      return { width: '5rem' };
    case 'md':
      return { width: '10vw' };
    case 'lg':
      return { width: '20vw' };
    default:
      return { width: '100%' };
  }
};
