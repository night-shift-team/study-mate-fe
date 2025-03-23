import { useLayoutEffect, useState } from 'react';
import { useUpdateProblem } from './updateProblemContext';
import {
  outSideClickContainer,
  RootWheelSetStateListener,
} from '@/shared/eventListeners/model/mouseEvents';
import { createPortal } from 'react-dom';
import { ProblemDetailInfoRes } from '../api';
import {
  ProblemCategory,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';
import { resetFocus } from '@/shared/dom/model/focus';

const SelectComponent = ({
  list,
  attrString,
}: {
  list: string[];
  attrString: 'title' | 'type' | 'difficulty';
}) => {
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

  return (
    <div
      id={'select-click-container-' + attrString}
      className="relative flex h-7 w-full min-w-12 max-w-28 flex-shrink-0 border hover:cursor-pointer"
      onClick={() => {
        setOpenSelect(true);
      }}
    >
      <input
        className="flex w-full items-center justify-center pl-1 hover:cursor-pointer"
        value={getAttrTitle(updateProblemInfo, attrString)}
        onFocus={resetFocus}
        onChange={() => {}}
        required
      />
      {openSelect
        ? createPortal(
            <div
              id={'category-select-container-' + attrString}
              className={`absolute flex max-h-52 w-full min-w-12 max-w-28 flex-col justify-between gap-1.5 rounded-2xl border bg-white py-2`}
              style={{
                top: `${document.getElementById('select-click-container-' + attrString)!.getBoundingClientRect().top + 30}px`,
                left: `${document.getElementById('select-click-container-' + attrString)!.getBoundingClientRect().left + document.documentElement.scrollLeft}px`,
              }}
            >
              {list.map((attrValue, index) => {
                return (
                  <div
                    key={index}
                    className="z-50 flex h-[14%] w-full items-center justify-center hover:cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateProblemInfo((prev) => {
                        if (!prev) return null;
                        try {
                          switch (attrString) {
                            case 'title': {
                              const [currentTitle, currentType] =
                                prev.category.split('_');
                              return currentTitle === attrValue
                                ? prev
                                : {
                                    ...prev,
                                    category:
                                      `${attrValue}_${currentType ?? ProblemCategoryType.MAQ}` as ProblemCategory,
                                  };
                            }

                            case 'type': {
                              const [currentTitle, currentType] =
                                prev.category.split('_');
                              return currentType === attrValue
                                ? prev
                                : {
                                    ...prev,
                                    category:
                                      `${currentTitle}_${attrValue}` as ProblemCategory,
                                  };
                            }

                            case 'difficulty': {
                              const numericDifficulty = parseInt(attrValue, 10);
                              return prev.difficulty === numericDifficulty
                                ? prev
                                : {
                                    ...prev,
                                    difficulty: isNaN(numericDifficulty)
                                      ? 0
                                      : numericDifficulty,
                                  };
                            }

                            default:
                              return prev;
                          }
                        } catch (e) {
                          console.error(e);
                          return prev;
                        }
                      });

                      setOpenSelect(false);
                    }}
                  >
                    {typeof attrValue === 'boolean'
                      ? attrValue
                        ? 'true'
                        : 'false'
                      : attrValue}
                  </div>
                );
              })}
            </div>,
            document.getElementById('root-container') as HTMLElement
          )
        : null}
    </div>
  );
};
export default SelectComponent;
