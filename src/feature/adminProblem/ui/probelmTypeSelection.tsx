'use client';
import { Dispatch, SetStateAction } from 'react';

import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import useProblemTypeSelection from '../model/problemTypeSelectionHook';

export const ProblemTypeSelection = ({
  problemType,
  setProblemType,
}: {
  problemType: ProblemCategoryType;
  setProblemType: Dispatch<SetStateAction<ProblemCategoryType>>;
}) => {
  const { isOpen, setIsOpen, handleSelect, problemTypes } =
    useProblemTypeSelection(setProblemType);

  return (
    <div className="flex w-full max-w-sm justify-center">
      {/* Select Button */}
      <button
        type="button"
        className={`relative h-[2.5rem] w-[8rem] rounded-lg border bg-white px-3 py-2 text-left text-gray-900 shadow-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {problemType === ProblemCategoryType.MAQ ? '객관식' : '주관식'}
        <UnfoldMoreRoundedIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 mt-[2.5rem] max-h-60 w-[8rem] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {problemTypes.map((pType) => (
            <li
              key={pType.name}
              className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
                problemType === pType.value ? 'bg-blue-100 text-blue-900' : ''
              }`}
              onClick={() => handleSelect(pType.value)}
            >
              {pType.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
