import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import {
  FaComputer,
  FaDatabase,
  FaNetworkWired,
  FaAlgolia,
  FaDelicious,
} from 'react-icons/fa6';

export const getCategoriesIcon = (title: ProblemCategoryTitle) => {
  switch (title) {
    case ProblemCategoryTitle.ALGORITHUM:
      return (
        <FaAlgolia className="h-[70%] w-fit items-center justify-center py-0.5" />
      );
    case ProblemCategoryTitle.DB:
      return (
        <FaDatabase className="h-[60%] w-fit items-center justify-center py-0.5" />
      );
    case ProblemCategoryTitle.NETWORK:
      return (
        <FaNetworkWired className="h-[70%] w-fit items-center justify-center py-0.5" />
      );
    case ProblemCategoryTitle.OS:
      return (
        <FaComputer className="h-[60%] w-fit items-center justify-center py-0.5" />
      );
    case ProblemCategoryTitle.DESIGN:
      return (
        <FaDelicious className="h-[70%] w-fit items-center justify-center py-0.5" />
      );
    default:
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
  }
};
