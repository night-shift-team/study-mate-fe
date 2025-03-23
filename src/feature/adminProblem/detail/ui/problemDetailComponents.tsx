import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { IconType } from 'react-icons/lib';
import { ProblemCategoryType } from '@/shared/constants/problemInfo';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';

export const TitleBox = ({ title }: { title: string }) => {
  return (
    <div className="flex h-16 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border bg-white md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="font-bold text-[#FEA1A1]">Title</span>
      <span className="w-full break-words px-2 text-center text-xs md:w-auto">
        {title}
      </span>
    </div>
  );
};

export const AttrBox = ({
  title,
  content: Content,
}: {
  title: string;
  content: string | IconType;
}) => {
  return (
    <div className="flex h-16 w-full max-w-60 flex-col items-center justify-center rounded-2xl border bg-white md:min-w-60 md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="flex w-full items-end justify-center text-center font-bold text-[#FEA1A1]">
        {title}
      </span>
      <span
        className={`flex w-full justify-center break-words text-center text-xs ${Content.length > 10 ? 'tracking-[-0.05em]' : ''}`}
      >
        {typeof Content === 'string' ? (
          Content
        ) : (
          <div className="flex w-full justify-center">
            <Content size={'1.3rem'} color="#4bd352" />
          </div>
        )}
      </span>
    </div>
  );
};

export const ContentsMarkDown = ({ markdown }: { markdown: string }) => {
  return (
    <div className="flex min-h-40 w-full flex-shrink-0 flex-col rounded-2xl border bg-white pt-2">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Contents
      </span>
      <div className="flex w-full bg-white p-2">
        <MarkdownComponent markdown={markdown} />
      </div>
    </div>
  );
};

export const Answer = ({
  updateProblemInfo,
}: {
  updateProblemInfo: ProblemDetailInfoRes | null;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white pt-2">
      <span className="mt-2 text-center text-lg font-bold text-[#FEA1A1]">
        {updateProblemInfo?.category.split('_')[1] === ProblemCategoryType.MAQ
          ? 'Selection'
          : 'Keyword'}
      </span>
      <div className="flex w-full flex-col gap-4 p-6 text-sm">
        {updateProblemInfo?.category.split('_')[1] ===
        ProblemCategoryType.MAQ ? (
          typeof updateProblemInfo.options !== 'string' &&
          (updateProblemInfo.options as string[]).map((selection, index) => {
            return (
              <div key={index} className="flex w-full flex-col justify-center">
                <span className="gap-4">
                  {(index + 1).toString() + '. '} {selection}
                </span>
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
                <p>{' ' + (index + 1).toString() + ''} </p>
                <p className="pl-4 font-bold">{selection}</p>
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

export const Solution = ({
  problemDetailInfo,
}: {
  problemDetailInfo: ProblemDetailInfoRes | null;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white pt-2">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Solution
      </span>
      <span className="w-full break-words p-6 text-xs">
        {problemDetailInfo?.answerExplanation}
      </span>
    </div>
  );
};

export const ModelAnswer = ({
  problemDetailInfo,
}: {
  problemDetailInfo: ProblemDetailInfoRes | null;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border bg-white">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Model Answer
      </span>
      <div className="flex w-full p-6">
        <span>{problemDetailInfo?.answer}</span>
      </div>
    </div>
  );
};
