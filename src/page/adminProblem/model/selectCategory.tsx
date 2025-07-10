'use client';
import { useLayoutEffect, useState } from 'react';
import { useUpdateProblem } from './updateProblemContext';
import { ProblemDetailInfoRes } from '../api';
import {
  outSideClickContainer,
  RootWheelSetStateListener,
} from '@/shared/window/model/eventMouse';

const useSelectCategory = (attrString: 'title' | 'type' | 'difficulty') => {
  const [openSelect, setOpenSelect] = useState(false);
  const { updateProblemInfo, setUpdateProblemInfo } = useUpdateProblem();

  useLayoutEffect(() => {
    outSideClickContainer('category-select-container-' + attrString, () =>
      setOpenSelect(false)
    );
    RootWheelSetStateListener(() => setOpenSelect(false));
  }, []);

  const getAttrTitle = (
    updateProblemInfo: ProblemDetailInfoRes | null,
    attrString: 'title' | 'type' | 'difficulty'
  ) => {
    if (!updateProblemInfo) return '';
    switch (attrString) {
      case 'title':
        return updateProblemInfo.category.split('_')[0] ?? '';
      case 'type':
        return updateProblemInfo.category.split('_')[1] ?? '';
      case 'difficulty':
        return updateProblemInfo.difficulty;
      default:
        return '';
    }
  };

  return {
    openSelect,
    setOpenSelect,
    updateProblemInfo,
    setUpdateProblemInfo,
    getAttrTitle,
  };
};
export default useSelectCategory;
