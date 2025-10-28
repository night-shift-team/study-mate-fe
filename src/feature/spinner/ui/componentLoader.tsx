// import PulseLoader from 'react-spinners/PulseLoader';
import { getComponentLoaderSize } from '../model/getSpinnerSize';

export type ComponentSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 *
 * @param {string} color - 점의 색상
 * @param {number} size - 점의 크기 (px)
 * @returns
 */
export const ComponentLoader = ({
  color,
  size,
}: {
  color?: string;
  size?: ComponentSize;
}) => {
  const { width, height } = getComponentLoaderSize(size);
  return (
    <div
      className={`items-cneter flex h-full w-full max-w-[62px] shrink-0 justify-center`}
    >
      <div
        className="loader2"
        style={{ width: width, height: height, color: color ?? '#fff' }}
      />
    </div>
  );
};
