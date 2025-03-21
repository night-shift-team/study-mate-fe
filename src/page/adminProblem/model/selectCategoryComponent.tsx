import { useLayoutEffect, useState } from 'react';
import { useUpdateProblem } from './updateProblemContext';
import {
  outSideClickContainer,
  RootWheelSetStateListener,
} from '@/shared/eventListeners/model/mouseEvents';
import { createPortal } from 'react-dom';
import { Problem } from '../ui/newManageProblem';
import { ProblemDetailInfoRes } from '../api';

const SelectComponent = ({
  list,
  attrString,
}: {
  list: string[];
  attrString: 'category' | 'type' | 'activate';
}) => {
  const [openSelect, setOpenSelect] = useState(false);
  const { updateProblemInfo, setUpdateProblemInfo } = useUpdateProblem();

  useLayoutEffect(() => {
    outSideClickContainer('category-select-container-' + attrString, () =>
      setOpenSelect(false)
    );
    RootWheelSetStateListener(() => setOpenSelect(false));
  }, []);

  const getAttrTitle = (attrString: 'category' | 'type' | 'activate') => {
    switch (attrString) {
      case 'category':
        return '카테고리';
      case 'type':
        return '정답 유형';
      case 'activate':
        return '생성 여부';
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
      <span className="flex w-full items-center justify-center">
        {updateProblemInfo && getAttrTitle(attrString)}
      </span>
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
                console.log(attrString, attrValue);
                return (
                  <div
                    key={index}
                    className="z-50 flex h-[14%] w-full items-center justify-center hover:cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateProblemInfo((prev) =>
                        prev
                          ? {
                              ...prev,
                              [attrString]:
                                attrValue as ProblemDetailInfoRes[keyof ProblemDetailInfoRes],
                            }
                          : null
                      );
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
