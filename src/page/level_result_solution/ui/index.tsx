'use client';

import {
  getProblemDetailInfoApi,
  ProblemDetailInfoRes,
} from '@/page/adminProblem/api';
import SelectAnswerRow from '@/page/level_test/ui/levelTestAnswer';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { useEffect, useState } from 'react';
import CircleCheck from '@public/assets/icons/leveltest/checkedCircle.svg';
import CircleCancel from '@public/assets/icons/leveltest/Subtract.svg';
import ButtonPixel from '@/shared/button/buttonPixel';

const TestResultSolutionPage = ({
  problemId,
  userAnswer,
}: {
  problemId: string;
  userAnswer: string;
}) => {
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes>();

  const getProblemDetail = async (id: string) => {
    try {
      const res = await getProblemDetailInfoApi(id);
      if (res.ok) {
        return res.payload as ProblemDetailInfoRes;
      }
      throw res.payload as ServerErrorResponse;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    getProblemDetail(problemId).then((data) => {
      setProblemDetailInfo(data);
    });
  }, []);
  // ["Choice 1 for question 3", "Choice 2 for question 3", "Choice 3 for question 3", "Choice 4 for question 3"]
  // console.log(problemDetailInfo?.options);

  const selections =
    problemDetailInfo &&
    (problemDetailInfo.options as string)
      .replace('[', '')
      .replace(']', '')
      .split(',')
      .map((item) => item.trim().replaceAll('"', ''));

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-4 py-5 scrollbar-hide">
      <span className="text-title-page">Result Summary</span>
      <div className="mt-2 flex flex-col">
        <span className="mt-2 text-title-section text-point-logo">
          Level. {problemDetailInfo?.difficulty}
        </span>
        <span className="mt-2 text-title-section text-point-logo">
          Your Result:{' '}
          {userAnswer === problemDetailInfo?.answer ? 'Correct' : 'Incorrect'}!
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-2.5">
        <span className="text-title-section">Question</span>
        <div className="flex w-full rounded-[4px] bg-grayscale-800 px-4 py-2.5">
          <span className="font-pretandard text-[16px]">
            {problemDetailInfo?.questionTitle}{' '}
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2.5">
        <span className="text-title-section">
          Your Answer vs. Correct Answer
        </span>
        <div className="flex w-full flex-col gap-0.5 rounded-[4px] bg-grayscale-800 p-2">
          {selections &&
            selections.map((selection, index) => {
              console.log(userAnswer, index + 1);
              return (
                <SelectAnswerRow
                  key={selection}
                  bgColor="#2F3036"
                  selected={Number(userAnswer) === index + 1}
                  onClick={() => {}}
                >
                  <span
                    key={selection}
                    className={`font-pretandard text-quiz-option`}
                  >
                    {selection}
                  </span>
                  <div className="h-[20px] w-[20px] rounded-full">
                    {index + 1 === Number(problemDetailInfo.answer) ? (
                      <CircleCheck className="h-full w-full fill-success" />
                    ) : (
                      <CircleCancel className="h-full w-full fill-error" />
                    )}
                  </div>
                </SelectAnswerRow>
              );
            })}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2.5">
        <span className="text-title-section">Explanation</span>
        <div className="flex w-full rounded-[4px] bg-grayscale-800 px-4 py-2.5">
          <span className="font-pretandard text-[16px]">
            {problemDetailInfo?.answerExplanation}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <ButtonPixel
          status="default"
          onClick={() => {
            window.history.back();
          }}
        >
          Save this result
        </ButtonPixel>
        <ButtonPixel
          status="default"
          onClick={() => {
            window.history.back();
          }}
        >
          Go to Folder
        </ButtonPixel>
      </div>
    </div>
  );
};
export default TestResultSolutionPage;
