// import PulseLoader from 'react-spinners/PulseLoader';
import { getSpinnerSize } from '../model/getSpinnerSize';

export type ComponentSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 *
 * @param {string} color - 점의 색상
 * @param {number} size - 점의 크기 (px)
 * @returns
 */
export const PageLoader = ({
  color,
  size,
}: {
  color?: string;
  size?: ComponentSize;
}) => {
  const { width } = getSpinnerSize(size);
  return (
    <div
      className={`items-cneter flex h-[20px] w-full min-w-[5px] justify-center`}
    >
      <div
        className="loader"
        style={{ width: width, color: color ?? '#e8d7b9' }}
      />
    </div>
  );
};
