'use client';
import { createListCollection, Select } from '@chakra-ui/react';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Link from 'next/link';
import {
  FormEvent,
  Fragment,
  JSX,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons/lib';
import { MdCancel } from 'react-icons/md';
import { outSideClickContainer } from '@/shared/eventListeners/model/mouseEvents';
import { createPortal } from 'react-dom';
import {
  UpdateProblemProvider,
  useUpdateProblem,
} from '../model/updateProblemContext';
import SelectComponent from '../model/selectCategoryComponent';
import ContentsMarkDown from './markDownEdit';
import AuthHoc from '@/shared/auth/model/authHoc';
import { Problem } from './newManageProblem';
import { getProblemDetail } from '../model/getProblemDetailInfo';
import {
  CreateAdminMAQReq,
  CreateAdminSAQReq,
  ProblemDetailInfoRes,
  updateAdminMAQApi,
  updateAdminSAQApi,
} from '../api';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';

enum ProblemAttributeTitle {
  Category = 'Category',
  Level = 'Level',
  Type = 'Type',
  CreatedDt = 'CreatedDt',
  Activate = 'Activate',
}

const problemTypes: ProblemCategoryType[] = [
  ProblemCategoryType.MAQ,
  ProblemCategoryType.SAQ,
];

const UpdateProblem = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes | null>(null);

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
      if (pType === ProblemCategoryType.MAQ) {
        const body: CreateAdminMAQReq = {
          questionTitle: problemDetailInfo.questionTitle,
          questionContent: problemDetailInfo.content,
          answer: problemDetailInfo.answer,
          answerExplanation: problemDetailInfo.answerExplanation,
          difficulty: problemDetailInfo.difficulty,
          category: problemDetailInfo.category,
          choice1: (problemDetailInfo.options as string[])[0],
          choice2: (problemDetailInfo.options as string[])[1],
          choice3: (problemDetailInfo.options as string[])[2],
          choice4: (problemDetailInfo.options as string[])[3],
        };
        const res = await updateAdminMAQApi(problemDetailInfo.questionId, body);
        if (res.ok) {
          console.log(`${problemDetailInfo.questionId} updated`, res.payload);
        }
      }
      if (pType === ProblemCategoryType.SAQ) {
        const body: CreateAdminSAQReq = {
          questionTitle: problemDetailInfo.questionTitle,
          questionContent: problemDetailInfo.content,
          answer: problemDetailInfo.answer,
          answerExplanation: problemDetailInfo.answerExplanation,
          difficulty: problemDetailInfo.difficulty,
          category: problemDetailInfo.category,
          keyword1: (problemDetailInfo.options as string[])[0],
          keyword2: (problemDetailInfo.options as string[])[1],
          keyword3: (problemDetailInfo.options as string[])[2],
        };
        console.log(body);
        const res = await updateAdminSAQApi(problemDetailInfo.questionId, body);
        if (res.ok) {
          console.log(`${problemDetailInfo.questionId} updated`, res.payload);
        }
      }
      return;
    } catch (e) {
      console.log();
    }
  };

  return (
    <form
      onSubmit={async (e) => await handleSubmit(e)}
      className="flex h-full w-full flex-col items-start p-4"
    >
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
                onChange={(e) => {
                  try {
                    const level = e.target.value;
                    if (level === '' || isNaN(parseInt(level))) {
                      setProblemDetailInfo(
                        (prev: ProblemDetailInfoRes | null) =>
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
                }}
                className="flex h-8 w-12 break-words border px-2 text-center text-xs md:w-auto"
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
export default AuthHoc(UpdateProblem);

const TitleBox = ({ title }: { title: string }) => {
  const { setUpdateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex min-h-16 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border bg-white py-2 text-lg md:justify-start md:gap-2 md:px-6">
      <span className="font-bold text-[#FEA1A1]">Title</span>
      <textarea
        className="flex w-full min-w-[90%] break-words border px-2 text-xs md:w-auto"
        value={title}
        onChange={(e) => {
          setUpdateProblemInfo((prev) =>
            prev ? { ...prev, questionTitle: e.target.value } : null
          );
        }}
      />
    </div>
  );
};

const AttrBox = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div className="flex h-16 w-full max-w-60 flex-col items-center justify-center rounded-2xl border bg-white md:min-w-60 md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="flex w-full items-end justify-center text-center font-bold text-[#FEA1A1]">
        {title}
      </span>
      {children}
    </div>
  );
};

const Answer = () => {
  const { updateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white p-2">
      <span className="mt-2 text-center text-lg font-bold text-[#FEA1A1]">
        Answer
      </span>
      <div className="flex w-full flex-col gap-1 px-2 text-[0.7rem]">
        {updateProblemInfo?.category.split('_')[1] ===
        ProblemCategoryType.MAQ ? (
          typeof updateProblemInfo.options !== 'string' &&
          (updateProblemInfo.options as string[]).map((selection, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-2 pr-2"
              >
                <SelectionInputComponent
                  type={
                    updateProblemInfo.category.split(
                      '_'
                    )[1] as ProblemCategoryType
                  }
                  index={index}
                  dataStr={selection}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
        {updateProblemInfo?.category.split('_')[1] ===
        ProblemCategoryType.SAQ ? (
          typeof updateProblemInfo.options !== 'string' &&
          (updateProblemInfo.options as string[]).map((selection, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-2 pr-2"
              >
                <SelectionInputComponent
                  type={
                    updateProblemInfo.category.split(
                      '_'
                    )[1] as ProblemCategoryType
                  }
                  index={index}
                  dataStr={selection}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const SelectionInputComponent = ({
  type,
  index,
  dataStr,
}: {
  type: ProblemCategoryType;
  index: number;
  dataStr: string;
}) => {
  const { setUpdateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex w-full items-center gap-2 pr-2">
      <input
        id={type + index.toString()}
        type="radio"
        name="selection"
        className="h-8 w-4 text-3xl"
        disabled={true}
      />
      <textarea
        className="h-8 w-full border p-1.5 text-sm font-extrabold"
        value={dataStr}
        onChange={(e) =>
          setUpdateProblemInfo((prev) =>
            prev
              ? {
                  ...prev,
                  options: (prev.options as string[]).map((data, idx) =>
                    idx === index ? e.target.value : data
                  ),
                }
              : null
          )
        }
      />
    </div>
  );
};

const Solution = () => {
  const { updateProblemInfo, setUpdateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white p-2">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Solution
      </span>
      <textarea
        className="w-full break-words p-1.5 text-sm"
        value={updateProblemInfo?.answerExplanation}
        onChange={(e) =>
          setUpdateProblemInfo((prev) =>
            prev ? { ...prev, answerExplanation: e.target.value } : null
          )
        }
      ></textarea>
    </div>
  );
};

const ModelAnswer = () => {
  const { updateProblemInfo, setUpdateProblemInfo } = useUpdateProblem();

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white p-2">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Model Answer
      </span>
      <textarea
        className="w-full break-words p-1.5 text-sm"
        value={updateProblemInfo?.answer}
        onChange={(e) =>
          setUpdateProblemInfo((prev) =>
            prev ? { ...prev, answer: e.target.value } : null
          )
        }
      ></textarea>
    </div>
  );
};
