import {
  ProblemCategoryTitle,
  ProblemCategoryType,
} from '@/shared/problem/model/problemInfo.types';

export const getRandomProblemType = () => {
  return new Date().getTime() % 2
    ? ProblemCategoryType.MAQ
    : ProblemCategoryType.SAQ;
};

export const getRandomProblemCategory = (
  availabaleSolveData: ProblemCategoryTitle[]
) => {
  const randomCategory = new Date().getTime() % availabaleSolveData.length;
  return availabaleSolveData[randomCategory];
};
