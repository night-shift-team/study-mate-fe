import { ComponentSize } from '../ui/spinnerUI';

export const getSpinnerSize = (size?: ComponentSize) => {
  switch (size) {
    case 'xxs':
      return '1rem';
    case 'xs':
      return '2rem';
    case 'sm':
      return '3rem';
    case 'md':
      return '4rem';
    case 'lg':
      return '6rem';
    case 'xl':
      return '9rem';
    default:
      return '3rem';
  }
};
