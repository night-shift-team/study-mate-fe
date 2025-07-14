import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import { Dispatch, SetStateAction, useState } from 'react';

const useProblemTypeSelection = (
  setProblemType: Dispatch<SetStateAction<ProblemCategoryType>>
) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (problemType: ProblemCategoryType) => {
    setProblemType(problemType);
    setIsOpen(false);
  };

  const problemTypes = [
    { name: '객관식', value: ProblemCategoryType.MAQ },
    { name: '주관식', value: ProblemCategoryType.SAQ },
  ];
  return {
    isOpen,
    setIsOpen,
    handleSelect,
    problemTypes,
  };
};
export default useProblemTypeSelection;
