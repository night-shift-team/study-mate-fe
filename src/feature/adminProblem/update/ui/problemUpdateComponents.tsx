import { useUpdateProblem } from '@/page/adminProblem/model/updateProblemContext';
import { ProblemCategoryType } from '@/shared/constants/problemInfo';
import { JSX } from 'react';

export const TitleBox = ({ title }: { title: string }) => {
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

export const AttrBox = ({
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

export const Answer = () => {
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

export const SelectionInputComponent = ({
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

export const Solution = () => {
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

export const ModelAnswer = () => {
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
