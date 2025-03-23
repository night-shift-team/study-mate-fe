'use client';
import { FormEvent, useLayoutEffect, useState } from 'react';

import { UpdateProblemProvider } from '../model/updateProblemContext';
import SelectComponent from '../model/selectCategoryComponent';
import AuthHoc from '@/shared/auth/model/authHoc';
import { getProblemDetail } from '../model/getProblemDetailInfo';
import {
  CreateAdminMAQReq,
  CreateAdminSAQReq,
  ProblemDetailInfoRes,
  updateAdminMAQApi,
  updateAdminSAQApi,
} from '../api';
import {
  ProblemCategoryTitle,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';
import {
  Answer,
  AttrBox,
  ModelAnswer,
  Solution,
  TitleBox,
} from '@/feature/adminProblem/update/ui/problemUpdateComponents';
import ContentsMarkDown from '@/feature/adminProblem/update/ui/markDownEdit';
import { Problem } from '..';
import { updateAttrBox } from '../model/updateAttrBoxContents';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { ServerErrorResponse } from '@/shared/api/model/config';
import useToast from '@/shared/toast/toast';

enum ProblemAttributeTitle {
  Category = 'Category',
  Level = 'Level',
  Type = 'Type',
  CreatedDt = 'CreatedDt',
  Activate = 'Activate',
}

const UpdateProblemPage = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);

  useLayoutEffect(() => {
    if (selectedProblem && !problemDetailInfo) {
      getProblemDetail(selectedProblem.id, setProblemDetailInfo).then(
        (data) => {
          try {
            setProblemDetailInfo(
              (prev) =>
                prev && { ...prev, options: JSON.parse(prev.options as string) }
            );
          } catch (e) {
            console.log(e);
          }
        }
      );
      return;
    }

    const sessionProblemData = sessionStorage.getItem('selectedProblemInfo');
    if (sessionProblemData && !selectedProblem) {
      setSelectedProblem(JSON.parse(sessionProblemData));
    }
  }, [selectedProblem]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!problemDetailInfo) return;
    const [_, pType] = problemDetailInfo.category.split('_');

    try {
      const commontBody = {
        questionTitle: problemDetailInfo.questionTitle,
        questionContent: problemDetailInfo.content,
        answer: problemDetailInfo.answer,
        answerExplanation: problemDetailInfo.answerExplanation,
        difficulty: problemDetailInfo.difficulty,
        category: problemDetailInfo.category,
      };
      if (pType === ProblemCategoryType.MAQ) {
        const body: CreateAdminMAQReq = {
          ...commontBody,
          choice1: (problemDetailInfo.options as string[])[0],
          choice2: (problemDetailInfo.options as string[])[1],
          choice3: (problemDetailInfo.options as string[])[2],
          choice4: (problemDetailInfo.options as string[])[3],
        };
        const res = await updateAdminMAQApi(problemDetailInfo.questionId, body);
        if (res.ok) {
          console.log(`${problemDetailInfo.questionId} updated`, res.payload);
          setToastDescription('문제 수정이 완료되었습니다.');
          setToastOpen(true);
          return;
        }
        throw res.payload;
      }
      if (pType === ProblemCategoryType.SAQ) {
        const body: CreateAdminSAQReq = {
          ...commontBody,
          keyword1: (problemDetailInfo.options as string[])[0],
          keyword2: (problemDetailInfo.options as string[])[1],
          keyword3: (problemDetailInfo.options as string[])[2],
        };
        const res = await updateAdminSAQApi(problemDetailInfo.questionId, body);
        if (res.ok) {
          console.log(`${problemDetailInfo.questionId} updated`, res.payload);
          setToastDescription('문제 수정이 완료되었습니다.');
          setToastOpen(true);
          return;
        }
        throw res.payload;
      }
      return;
    } catch (e) {
      console.log(e);
      setToastDescription('문제 수정에 실패했습니다.');
      setToastOpen(true);
    }
  };

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
            className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border bg-white text-sm hover:bg-pointcolor-coral/30"
          >
            수정 완료
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
              <SelectComponent
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
