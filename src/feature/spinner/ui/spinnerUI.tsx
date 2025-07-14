import PulseLoader from 'react-spinners/PulseLoader';
import { getSpinnerSize } from '../model/getSpinnerSize';

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
  return (
    <div
      className={`items-cneter flex h-full min-h-[5px] min-w-[5px] justify-center`}
    >
      <PulseLoader
        color={color ?? '#e8d7b9'}
        className="flex items-center justify-center"
        size={getSpinnerSize(size)}
      />
    </div>
  );
};
