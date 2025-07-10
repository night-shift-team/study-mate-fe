'use client';

import { UpdateProblemProvider } from '../model/updateProblemContext';
import AuthHoc from '@/shared/auth/model/authHoc';

import {
  Answer,
  AttrBox,
  ModelAnswer,
  Solution,
  TitleBox,
} from '@/feature/adminProblem/update/ui/problemUpdateComponents';
import ContentsMarkDown from '@/feature/adminProblem/update/ui/markDownEdit';
import { updateAttrBox } from '../model/updateAttrBoxContents';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useUpdateProblem from '../model/updateProblemHook';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import SelectCategory from './selectCategory';

enum ProblemAttributeTitle {
  Category = 'Category',
  Level = 'Level',
  Type = 'Type',
  CreatedDt = 'CreatedDt',
  Activate = 'Activate',
}

const UpdateProblemPage = () => {
  const {
    problemDetailInfo,
    setProblemDetailInfo,
    handleSubmit,
    Toaster,
    isLoading,
  } = useUpdateProblem();

  return (
    <form
      onSubmit={async (e) => await handleSubmit(e)}
      className="relative flex h-full w-full flex-col items-center p-4"
    >
      <Toaster />

      <div className="fixed left-0 flex h-12 w-full items-center justify-between border-b-2 bg-pointcolor-sand px-4">
        <div className="flex h-12 max-w-full items-center justify-center text-xl font-bold">
          Problem {problemDetailInfo?.questionId ?? ''}
        </div>
        <div className="flex gap-1">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex h-[2.5rem] w-16 items-center justify-center rounded-lg border text-sm hover:bg-pointcolor-coral/30 ${isLoading ? 'bg-gray-200' : 'bg-white'}`}
          >
            {isLoading ? <Spinner /> : '수정 완료'}
          </button>
        </div>
      </div>
      <div className="mt-14 flex h-[calc(100%-4rem)] w-full flex-col gap-2 overflow-y-auto scrollbar-hide">
        <UpdateProblemProvider
          updateProblemInfo={problemDetailInfo}
          setUpdateProblemInfo={setProblemDetailInfo}
        >
          <TitleBox title={problemDetailInfo?.questionTitle ?? ''} />
          <div
            id="horizontal-scroll-container"
            className="grid w-full shrink-0 grid-flow-col grid-cols-3 grid-rows-2 gap-2 md:min-h-16 md:grid-cols-[repeat(5,min-content)] md:grid-rows-1 md:overflow-y-visible md:overflow-x-scroll md:scrollbar-hide"
          >
            <AttrBox title={ProblemAttributeTitle.Category}>
              <SelectCategory
                list={Object.values(ProblemCategoryTitle)}
                attrString={'title'}
              />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.Level}>
              <input
                type="text"
                value={problemDetailInfo?.difficulty ?? ''}
                onChange={(e) => updateAttrBox(e, setProblemDetailInfo)}
                className="flex h-8 w-12 break-words border px-2 text-center text-xs md:w-auto"
                pattern="[1-9][0-9]{0,1}"
                onFocus={(e) =>
                  Number(e.target.value) <= 0
                    ? e.target.setCustomValidity(
                        '100 이하의 자연수만 입력 가능합니다.'
                      )
                    : e.target.setCustomValidity('')
                }
                required
              />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.Type}>
              <span className="w-full text-center">
                {problemDetailInfo?.category.split('_')[1]}
              </span>
            </AttrBox>
          </div>
          <ContentsMarkDown />
          <Answer />
          <ModelAnswer />
          <Solution />
        </UpdateProblemProvider>
      </div>
    </form>
  );
};
export default AuthHoc(UpdateProblemPage);
