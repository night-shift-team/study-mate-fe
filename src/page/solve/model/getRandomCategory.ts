import {
  ProblemCategoryTitle,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';

export const getRandomProblemType = () => {
  return new Date().getTime() % 2
    ? ProblemCategoryType.MAQ
    : ProblemCategoryType.SAQ;
};

export const getRandomProblemCategory = (
  availabaleSolveData: ProblemCategoryTitle[]
) => {
  console.log('inrandom', availabaleSolveData);
  const randomCategory = new Date().getTime() % availabaleSolveData.length;
  return availabaleSolveData[randomCategory];
};
