import { ComponentSize } from '../ui/pageLoader';

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

export const getComponentLoaderSize = (size?: ComponentSize) => {
  switch (size) {
    case 'xs':
      return { width: '36px', height: '16px' };
    case 'sm':
      return { width: '42px', height: '19px' };
    case 'md':
      return { width: '48px', height: '22px' };
    case 'lg':
      return { width: '62px', height: '29px' };
    default:
      return { width: '48px', height: '22px' };
  }
};
