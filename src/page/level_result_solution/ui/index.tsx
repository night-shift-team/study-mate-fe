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
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Toaster from '@/shared/toast/ui/toaster';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';
import { questionBookmarkToggleApi } from '@/feature/boomMark/api';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';

const TestResultSolutionPage = ({
  type,
  problemId,
  userAnswer,
  problemInfo,
}: {
  type: 'test' | 'favorite' | 'history' | 'solve';
  problemId?: string;
  userAnswer?: string;
  problemInfo?: ProblemDetailInfoRes | null;
}) => {
  if (!type) return;
  // problemId와 userAnswer는 둘다 존재하거나 둘다 없어야함. 둘다 없을때는 반드시 problemInfo가 있어야함. 그렇지 않으면 리턴
  if (
    (!problemId && userAnswer) ||
    (problemId && !userAnswer) ||
    (!problemId && !userAnswer && !problemInfo)
  )
    return;

  const [problemDetailInfo, setProblemDetailInfo] = useState<
    ProblemDetailInfoRes | undefined | null
  >(problemInfo);
  const router = useRouter();
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
    if (problemId && userAnswer) {
      getProblemDetail(problemId).then((data) => {
        setProblemDetailInfo(data);
      });
    }
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

  const bookMarkToggle = async (problemId: string) => {
    try {
      const res = await questionBookmarkToggleApi(problemId);
      console.log('북마크 api', res);
      if (res.payload === true) {
        return 'added';
      }
      if (res.payload === false) {
        return 'removed';
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleBookMark = async (problemId: string) => {
    const success = await bookMarkToggle(problemId);
    if (success === 'added') {
      toastStore.show({
        status: ToastType.success,
        title: '북마크가 추가되었습니다',
      });
    } else if (success === 'removed') {
      toastStore.show({
        status: ToastType.info,
        title: '북마크가 제거되었습니다',
      });
    } else {
      toastStore.show({
        status: ToastType.info,
        title: '북마크 실패',
      });
    }
  };

  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-4 py-5 scrollbar-hide">
      <Toaster />
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
                  <div className="h-[20px] w-[20px] shrink-0 rounded-full">
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
        {type === 'test' && (
          <>
            <ButtonPixel
              status={isFetching ? 'inactive' : 'default'}
              onClick={async () => {
                if (problemId) {
                  setIsFetching(true);
                  await handleBookMark(problemId);
                  setIsFetching(false);
                }
              }}
            >
              {isFetching ? (
                <div className="mb-0">
                  <ComponentLoader size="sm" />
                </div>
              ) : (
                'Save this result'
              )}
            </ButtonPixel>
            <ButtonPixel
              status="default"
              onClick={() => {
                // 스크랩 폴더로 이동
              }}
            >
              Go to Scrap Folder
            </ButtonPixel>
          </>
        )}
        {type === 'solve' && (
          <>
            <ButtonPixel
              status={isFetching ? 'inactive' : 'default'}
              onClick={async () => {
                if (problemId) {
                  setIsFetching(true);
                  await handleBookMark(problemId);
                  setIsFetching(false);
                }
              }}
            >
              {isFetching ? (
                <div className="mb-0">
                  <ComponentLoader size="sm" />
                </div>
              ) : (
                'Save this result'
              )}
            </ButtonPixel>

            <ButtonPixel
              status="default"
              onClick={() => {
                router.push(
                  RouteTo.Solve +
                    (problemInfo
                      ? '/' + problemInfo.category.split('_')[0]
                      : '')
                );
              }}
            >
              Next Question
            </ButtonPixel>
          </>
        )}
        {type === 'favorite' && (
          <>
            <ButtonPixel
              status={isFetching ? 'inactive' : 'default'}
              onClick={async () => {
                if (problemInfo?.questionId) {
                  setIsFetching(true);
                  await handleBookMark(problemInfo.questionId);
                  setIsFetching(false);
                }
              }}
            >
              {isFetching ? (
                <div className="mb-0">
                  <ComponentLoader size="sm" />
                </div>
              ) : (
                'Save this result'
              )}
            </ButtonPixel>
            <ButtonPixel
              status="default"
              onClick={() => {
                window.history.back();
              }}
            >
              Back to List
            </ButtonPixel>
          </>
        )}
        {type === 'history' && (
          <>
            <ButtonPixel
              status={isFetching ? 'inactive' : 'default'}
              onClick={async () => {
                if (problemId) {
                  setIsFetching(true);
                  await handleBookMark(problemId);
                  setIsFetching(false);
                }
              }}
            >
              {isFetching ? (
                <div className="mb-0">
                  <ComponentLoader size="sm" />
                </div>
              ) : (
                'Save this result'
              )}
            </ButtonPixel>
          </>
        )}
      </div>
    </div>
  );
};
export default TestResultSolutionPage;
