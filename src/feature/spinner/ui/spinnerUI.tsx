import PulseLoader from 'react-spinners/PulseLoader';

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
  size?: 'xs' | 'sm' | 'lg' | 'xl';
}) => {
  const getSize = (size?: 'xs' | 'sm' | 'lg' | 'xl') => {
    switch (size) {
      case 'xs':
        return 4;
      case 'sm':
        return 8;
      case 'lg':
        return 12;
      case 'xl':
        return 16;
      default:
        return 8;
    }
  };
  return (
    <div
      className={`items-cneter flex h-full min-h-[5px] min-w-[5px] justify-center`}
    >
      <PulseLoader
        color={color}
        className="flex items-center justify-center"
        size={getSize(size)}
      />
    </div>
  );
};
