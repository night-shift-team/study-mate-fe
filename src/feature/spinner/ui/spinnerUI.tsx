import PulseLoader from 'react-spinners/PulseLoader';

export type ComponentSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 *
 * @param {string} color - 점의 색상
 * @param {number} size - 점의 크기 (px)
 * @returns
 */
export const Spinner = ({
  color,
  size,
}: {
  color?: string;
  size?: ComponentSize;
}) => {
  const getSize = (size?: ComponentSize) => {
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
  return (
    <div
      className={`items-cneter flex h-full min-h-[5px] min-w-[5px] justify-center`}
    >
      <PulseLoader
        color={color ?? '#e8d7b9'}
        className="flex items-center justify-center"
        size={getSize(size)}
      />
    </div>
  );
};
