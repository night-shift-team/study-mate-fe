import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { Bookmark } from 'lucide-react';
import useBookmarkCircle from '../model/bookmarkCircleHook';

interface BookMarkCircleProps {
  size: number;
  color: string;
  strokeWidth: number;
  initialValue: boolean;
  onClick: () => Promise<boolean>;
}

export const BookMarkCircle = ({
  size,
  color,
  strokeWidth,
  initialValue,
  onClick,
}: BookMarkCircleProps) => {
  const { isBookmarked, isPending, isClicked, handleClick } = useBookmarkCircle(
    initialValue,
    onClick
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-150 ${
        isBookmarked
          ? 'bg-amber-300/70 hover:bg-amber-300/80'
          : 'bg-amber-300/40 hover:bg-amber-300/60'
      } ${isClicked ? 'scale-90' : 'scale-100'}`}
    >
      {isPending ? (
        <Spinner size={'sm'} color="#b08968" />
      ) : (
        <Bookmark
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={isBookmarked ? color : 'none'}
        />
      )}
    </button>
  );
};
