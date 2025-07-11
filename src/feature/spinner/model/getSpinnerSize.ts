import { ComponentSize } from '../ui/spinnerUI';

export const getSpinnerSize = (size?: ComponentSize) => {
  switch (size) {
    case 'xxs':
      return 2;
    case 'xs':
      return 4;
    case 'sm':
      return 6;
    case 'md':
      return 8;
    case 'lg':
      return 12;
    case 'xl':
      return 18;
    default:
      return 8;
  }
};
