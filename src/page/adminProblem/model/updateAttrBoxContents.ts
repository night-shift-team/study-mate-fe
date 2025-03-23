import { Dispatch, SetStateAction } from 'react';
import { ProblemDetailInfoRes } from '../api';

export const updateAttrBox = (
  e: React.ChangeEvent<HTMLInputElement>,
  setProblemDetailInfo: Dispatch<SetStateAction<ProblemDetailInfoRes | null>>
) => {
  try {
    const level = e.target.value;
    if (level === '' || isNaN(parseInt(level))) {
      setProblemDetailInfo((prev: ProblemDetailInfoRes | null) =>
        prev ? { ...prev, difficulty: 0 } : null
      );
      return;
    }
    setProblemDetailInfo((prev) =>
      prev ? { ...prev, difficulty: parseInt(level) } : null
    );
  } catch (e: any) {
    console.log(e);
  }
};
