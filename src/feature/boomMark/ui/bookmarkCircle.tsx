import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { Bookmark } from 'lucide-react';
import { useState, useTransition } from 'react';

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
  const [isBookmarked, setIsBookmarked] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    startTransition(async () => {
      const result = await onClick();
      setIsBookmarked(result);
    });
  };

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
