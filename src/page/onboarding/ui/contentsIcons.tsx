import Polygon from '@public/assets/icons/onboarding/pentagon.svg';
import Square from '@public/assets/icons/onboarding/square.svg';
import Ghost from '@public/assets/icons/onboarding/ghost.svg';
import Clover from '@public/assets/icons/onboarding/clover.svg';

export const getContentsIcons = (index: number) => {
  switch (index) {
    case 0:
      return <Square className="aspect-1 w-8" />;
    case 1:
      return <Polygon className="aspect-1 w-8" />;
    case 2:
      return <Ghost className="aspect-1 w-8" />;
    case 3:
      return <Clover className="aspect-1 w-8" />;
    default:
      return <Square className="aspect-1 w-8" />;
  }
};
