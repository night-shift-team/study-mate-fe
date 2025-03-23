'use client';
import { useEffect, useState } from 'react';
import {
  createAdminMAQApi,
  CreateAdminMAQReq,
  createAdminSAQApi,
  CreateAdminSAQReq,
  ProblemDetailInfoRes,
} from '../api';
import { UpdateProblemProvider } from '../model/updateProblemContext';
import {
  Answer,
  AttrBox,
  ModelAnswer,
  Solution,
  TitleBox,
} from '@/feature/adminProblem/update/ui/problemUpdateComponents';
import SelectComponent from '../model/selectCategoryComponent';
import ContentsMarkDown from '@/feature/adminProblem/update/ui/markDownEdit';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';
import { updateAttrBox } from '../model/updateAttrBoxContents';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import useToast from '@/shared/toast/toast';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

enum ProblemAttributeTitle {
  Category = 'Category',
  Level = 'Level',
  Type = 'Type',
  CreatedDt = 'CreatedDt',
}

const CreateProblemPage = () => {
  const router = useRouter();
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes | null>({
      questionId: '',
      questionTitle: '',
      content: '',
      difficulty: 0,
      options: ['', '', '', ''],
      category: '' as ProblemCategory,
      answer: '',
      answerExplanation: '',
    });

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);

  useEffect(() => {
    if (problemDetailInfo?.category) {
      if (
        problemDetailInfo.category.split('_')[1] === ProblemCategoryType.MAQ
      ) {
        setProblemDetailInfo((prev) =>
          prev
            ? { ...prev, options: prev.options.slice(0, 3).concat('') }
            : null
        );
        return;
      }
      if (
        problemDetailInfo.category.split('_')[1] === ProblemCategoryType.SAQ
      ) {
        setProblemDetailInfo((prev) =>
          prev ? { ...prev, options: prev.options.slice(0, 3) } : null
        );
        return;
      }
    }
  }, [problemDetailInfo?.category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        const res = await createAdminMAQApi(body);
        if (res.ok) {
          console.log(
            `${problemDetailInfo.questionTitle} created`,
            res.payload
          );
          setToastDescription('문제 생성이 완료되었습니다.');
          setToastOpen(true);
          setTimeout(() => {
            router.push(RouteTo.AdminManagementProblem);
          }, 2500);
          return;
        }
        if ((res.payload as ServerErrorResponse).ecode === Ecode.E0405) {
          setToastDescription(EcodeMessage(Ecode.E0405));
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
        console.log(body);
        const res = await createAdminSAQApi(body);
        if (res.ok) {
          console.log(
            `${problemDetailInfo.questionTitle} created`,
            res.payload
          );
          setToastDescription('문제 생성이 완료되었습니다.');
          setToastOpen(true);
          setTimeout(() => {
            router.push(RouteTo.AdminManagementProblem);
          }, 2500);
          return;
        }
        if ((res.payload as ServerErrorResponse).ecode === Ecode.E0405) {
          setToastDescription(EcodeMessage(Ecode.E0405));
          setToastOpen(true);
          return;
        }
        throw res.payload;
      }
      return;
    } catch (e) {
      console.log(e);
      setToastDescription('문제 생성에 실패했습니다.');
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
            생성하기
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
                onChange={(e) => {
                  e.target.setCustomValidity('');
                  updateAttrBox(e, setProblemDetailInfo);
                }}
                className="flex h-8 w-12 break-words border px-2 text-center text-xs md:w-auto"
                // 100 이하의 자연수만 입력 가능하도록
                pattern="[1-9][0-9]{0,1}"
                // 포커스되면 유효성검증 데이터 변경 후 포커스 아웃 되면 유효성 검증 데이터 초기화
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
              <SelectComponent
                list={Object.values(ProblemCategoryType)}
                attrString={'type'}
              />
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
export default CreateProblemPage;
