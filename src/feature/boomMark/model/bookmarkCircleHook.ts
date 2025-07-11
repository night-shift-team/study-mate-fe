import { useState, useTransition } from 'react';

const useBookmarkCircle = (
  initialValue: boolean,
  onClick: () => Promise<boolean>
) => {
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
  return {
    isBookmarked,
    isPending,
    isClicked,
    handleClick,
  };
};
export default useBookmarkCircle;
