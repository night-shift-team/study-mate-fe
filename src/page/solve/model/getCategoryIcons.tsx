import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import {
  FaComputer,
  FaDatabase,
  FaNetworkWired,
  FaAlgolia,
  FaDelicious,
} from 'react-icons/fa6';
import Image from 'next/image';
import AlgoliaIcon from '@/assets/icons/algorithmIcon.svg';
import osIcon from '@/assets/icons/osIcon.svg';
import dbIcon from '@/assets/icons/dbIcon.svg';
import networkIcon from '@/assets/icons/networkIcon.svg';
import designIcon from '@/assets/icons/designIcon.svg';

export const getCategoriesIcon = (title: ProblemCategoryTitle) => {
  switch (title) {
    case ProblemCategoryTitle.ALGORITHUM:
      return (
        // <FaAlgolia className="h-[70%] w-fit items-center justify-center py-0.5" />
        <Image src={AlgoliaIcon} alt="algorithmIcon" objectFit="contain" fill />
      );
    case ProblemCategoryTitle.DB:
      return (
        // <FaDatabase className="h-[60%] w-fit items-center justify-center py-0.5" />
        <Image
          src={dbIcon}
          alt="dbIcon"
          objectFit="contain"
          className="p-2"
          fill
        />
      );
    case ProblemCategoryTitle.NETWORK:
      return (
        // <FaNetworkWired className="h-[70%] w-fit items-center justify-center py-0.5" />
        <Image
          src={networkIcon}
          alt="networkIcon"
          objectFit="contain"
          className="p-1"
          fill
        />
      );
    case ProblemCategoryTitle.OS:
      return (
        // <FaComputer className="h-[60%] w-fit items-center justify-center py-0.5" />
        <Image
          src={osIcon}
          alt="osIcon"
          objectFit="contain"
          className="p-1"
          fill
        />
      );
    case ProblemCategoryTitle.DESIGN:
      return (
        // <FaDelicious className="h-[70%] w-fit items-center justify-center py-0.5" />
        <Image
          src={designIcon}
          alt="designIcon"
          objectFit="contain"
          className="p-2"
          fill
        />
      );
    default:
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
  }
};
