import {
  ProblemCategoryTitle,
  ProblemCategoryTitleLength,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';

export const getRandomProblemType = () => {
  return new Date().getTime() % 2
    ? ProblemCategoryType.MAQ
    : ProblemCategoryType.SAQ;
};

export const getRandomProblemCategory = () => {
  const randomCategory = new Date().getTime() % ProblemCategoryTitleLength;
  switch (randomCategory) {
    case 0:
      return ProblemCategoryTitle.ALGORITHUM;
    case 1:
      return ProblemCategoryTitle.DB;
    case 2:
      return ProblemCategoryTitle.NETWORK;
    case 3:
      return ProblemCategoryTitle.OS;
    case 4:
      return ProblemCategoryTitle.DESIGN;
    default:
      return ProblemCategoryTitle.ALGORITHUM;
  }
};
