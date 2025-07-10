import { FaComputer } from 'react-icons/fa6';
import AlgoliaIcon from '@public/assets/icons/categoryTitleIcon/algorithmIcon.svg';
import OSIcon from '@public/assets/icons/categoryTitleIcon/osIcon.svg';
import DBIcon from '@public/assets/icons/categoryTitleIcon/dbIcon.svg';
import NetworkIcon from '@public/assets/icons/categoryTitleIcon/networkIcon.svg';
import { SvgIcon } from '@mui/material';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';

export const getCategoriesIcon = (title: ProblemCategoryTitle) => {
  switch (title) {
    case ProblemCategoryTitle.ALGORITHUM:
      return (
        <SvgIcon
          component={AlgoliaIcon}
          inheritViewBox
          sx={{ width: '100%', height: '100%' }}
        />
      );
    case ProblemCategoryTitle.DB:
      return (
        <SvgIcon
          component={DBIcon}
          inheritViewBox
          sx={{ width: '75%', height: '75%' }}
        />
      );
    case ProblemCategoryTitle.NETWORK:
      return (
        <SvgIcon
          component={NetworkIcon}
          inheritViewBox
          sx={{ width: '80%', height: '80%' }}
        />
      );
    case ProblemCategoryTitle.OS:
      return (
        <SvgIcon
          component={OSIcon}
          inheritViewBox
          sx={{ width: '80%', height: '80%' }}
        />
      );

    default:
      return (
        <FaComputer className="h-[80%] w-fit items-center justify-center py-0.5" />
      );
  }
};
