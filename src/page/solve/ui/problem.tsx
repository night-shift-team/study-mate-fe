'use client';
import { ChoicedItemResult, ChoiceItem } from '@/feature/level_test/ChoiceItem';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryTitleLength,
  ProblemCategoryType,
  ProblemInfoMAQ,
  ProblemInfoSAQ,
} from '@/shared/constants/problemInfo';
import { useEffect, useRef, useState } from 'react';
import {
  getMAQbyCategoryApi,
  getSAQbyCategoryApi,
  sendMAQAnswerApi,
  SendMAQAnswerRes,
  sendSAQAnswerApi,
  SendSAQAnswerRes,
} from '../api';
import {
  getRandomProblemCategory,
  getRandomProblemType,
} from '../model/getRandomCategory';
import { ServerErrorResponse } from '@/shared/api/model/config';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { Ecode } from '@/shared/errorApi/ecode';
import useToast from '@/shared/toast/toast';
import { userStore } from '@/state/userStore';
import { UserInfo } from '@/shared/constants/userInfo';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { IoIosArrowForward } from 'react-icons/io';
import { Bookmark } from 'lucide-react';
import { BookMarkCircle } from '@/feature/boomMark/ui/bookmarkCircle';
import { questionBookmarkToggleApi } from '@/feature/boomMark/api';

interface ProblemProps {
  category: 'random' | ProblemCategoryTitle;
}
interface QuestionType extends ProblemInfoMAQ, ProblemInfoSAQ {
  problemType: ProblemCategoryType;
}
interface CanSolveProblemInfo {
  category: ProblemCategory;
  canSolve: boolean;
}

const DEFAULT_CANSOLVE_PROBLEM_INFO = (() => {
  const value: CanSolveProblemInfo[] = [];
  for (const key in ProblemCategory) {
    if (Object.prototype.hasOwnProperty.call(ProblemCategory, key)) {
      if (
        ProblemCategory[key as keyof typeof ProblemCategory] ===
        ProblemCategory.LEVEL_TEST
      ) {
        continue;
      }
    }
    value.push({
      category: ProblemCategory[key as keyof typeof ProblemCategory],
      canSolve: true,
    });
  }
  return value;
})();

const Problem = ({ category }: ProblemProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionWithType, setCurrentQuestionWithType] =
    useState<QuestionType | null>(null);
  const [problemAnswer, setProblemAnswer] = useState<
    SendMAQAnswerRes | SendSAQAnswerRes | null
  >(null);

  const currentSolveCategoryRef = useRef<ProblemCategory | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  const { user, setUser } = userStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getRandomProblem = async () => {
    try {
      const canSolveDataStr = sessionStorage.getItem('canSolveProblem');
      const availabaleSolveData: Set<ProblemCategoryTitle> = new Set();

      if (canSolveDataStr) {
        const canSolveData: CanSolveProblemInfo[] = JSON.parse(canSolveDataStr);
        const findAvailableSolveTitle = canSolveData.filter(
          (item) => item.canSolve === true
        );
        findAvailableSolveTitle.map((item) =>
          availabaleSolveData.add(
            item.category.split('_')[0] as ProblemCategoryTitle
          )
        );
      }
      console.log([...availabaleSolveData]);
      const randomCategory = getRandomProblemCategory([...availabaleSolveData]);
      await getProblemByCategory(randomCategory);
    } catch (e) {
      throw e;
    }
  };

  const getProblemByCategory = async (targetCategory: ProblemCategoryTitle) => {
    try {
      const solveType = checkCanSolveProblemType(targetCategory);
      console.log('solveType', solveType);
      if (!solveType) return;
      const randomType =
        solveType === 'BOTH' ? getRandomProblemType() : solveType;
      if (randomType === ProblemCategoryType.MAQ) {
        currentSolveCategoryRef.current =
          `${targetCategory}_${ProblemCategoryType.MAQ}` as ProblemCategory;
        const res = await getMAQbyCategoryApi(targetCategory);
        if (res.ok) {
          setCurrentQuestionWithType({
            ...(res.payload as ProblemInfoMAQ),
            problemType: ProblemCategoryType.MAQ,
          } as QuestionType);
          return res.payload as ProblemInfoMAQ;
        }
        throw res.payload as ServerErrorResponse;
      } else {
        currentSolveCategoryRef.current =
          `${targetCategory}_${ProblemCategoryType.SAQ}` as ProblemCategory;
        const res = await getSAQbyCategoryApi(targetCategory);
        if (res.ok) {
          setCurrentQuestionWithType({
            ...(res.payload as ProblemInfoSAQ),
            problemType: ProblemCategoryType.SAQ,
          } as QuestionType);
          return res.payload as ProblemInfoSAQ;
        }
        throw res.payload as ServerErrorResponse;
      }
    } catch (e) {
      throw e;
    }
  };

  const setDefaultCanSolveProblemInfo = () => {
    const canSolveProblem = sessionStorage.getItem('canSolveProblem');
    if (!canSolveProblem) {
      sessionStorage.setItem(
        'canSolveProblem',
        JSON.stringify(DEFAULT_CANSOLVE_PROBLEM_INFO)
      );
    }
  };

  const checkCanSolveProblemType = (targetCategory: ProblemCategoryTitle) => {
    try {
      const canSolveProblem = sessionStorage.getItem('canSolveProblem');
      const data: CanSolveProblemInfo[] = canSolveProblem
        ? JSON.parse(canSolveProblem)
        : DEFAULT_CANSOLVE_PROBLEM_INFO;
      // 현재 category에서 풀수 있는 type 찾기
      console.log(data);
      const canSolveData:
        | { category: ProblemCategory; canSolve: boolean }[]
        | undefined = data.filter(
        (item: { category: ProblemCategory }) =>
          item.category.split('_')[0] === targetCategory
      );
      console.log(targetCategory, canSolveData);
      if (canSolveData.length) {
        // MAQ, SAQ
        const first = canSolveData[0].canSolve
          ? (canSolveData[0].category.split('_')[1] as ProblemCategoryType)
          : null;
        const second = canSolveData[1].canSolve
          ? (canSolveData[1].category.split('_')[1] as ProblemCategoryType)
          : null;
        console.log('first, second', first, second);
        if (first && second) {
          return 'BOTH';
        } else if (!first && second) {
          const newData = data.map((value: CanSolveProblemInfo) => {
            if (value.category === canSolveData[0].category) {
              return {
                category: value.category,
                canSolve: false,
              };
            }
            return value;
          });
          sessionStorage.setItem('canSolveProblem', JSON.stringify(newData));
          return second;
        } else if (first && !second) {
          const newData = data.map((value: CanSolveProblemInfo) => {
            if (value.category === canSolveData[1].category) {
              return {
                category: value.category,
                canSolve: false,
              };
            }
            return value;
          });
          sessionStorage.setItem('canSolveProblem', JSON.stringify(newData));
          return first;
        } else {
          const newData = data.map((value: CanSolveProblemInfo) => {
            if (value.category.split('_')[0] === category) {
              return {
                category: value.category,
                canSolve: false,
              };
            }
            return value;
          });
          sessionStorage.setItem('canSolveProblem', JSON.stringify(newData));
          return null;
        }
      }
      return null;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const getProblem = async (
    category: Partial<ProblemProps>[keyof ProblemProps]
  ) => {
    if (!category) return;
    try {
      setIsPageLoading(true);
      if (category === 'random') {
        await getRandomProblem();
      } else {
        await getProblemByCategory(category);
      }
    } catch (e) {
      console.log(e);
      if ((e as ServerErrorResponse).ecode === Ecode.E0406) {
        const disableCanSolveDataStorage =
          sessionStorage.getItem('canSolveProblem');
        if (disableCanSolveDataStorage) {
          const data: CanSolveProblemInfo[] = JSON.parse(
            disableCanSolveDataStorage
          );
          console.log(currentSolveCategoryRef.current);
          const newData = data.map((value: CanSolveProblemInfo) => {
            const [categoryTitle, categoryType] = value.category.split('_');
            if (
              currentSolveCategoryRef.current &&
              (categoryTitle as ProblemCategoryTitle) ===
                currentSolveCategoryRef.current.split('_')[0] &&
              (categoryType as ProblemCategoryType) ===
                currentSolveCategoryRef.current.split('_')[1]
            ) {
              return {
                category: currentSolveCategoryRef.current,
                canSolve: false,
              };
            } else {
              // 다른 카테고리는 그대로 유지
              return value;
            }
          });
          console.log(newData);
          sessionStorage.setItem('canSolveProblem', JSON.stringify(newData));
        }
        setSelectedAnswer(null);
        setProblemAnswer(null);
        setCurrentQuestionWithType(null);
        await new Promise((resolve) => setTimeout(resolve, 0));
        await getProblem(category);
      } else if ((e as ServerErrorResponse).ecode === Ecode.E0407) {
        setSelectedAnswer(null);
        setProblemAnswer(null);
        setCurrentQuestionWithType(null);
      } else {
        setSelectedAnswer(null);
        setProblemAnswer(null);
        setCurrentQuestionWithType(null);
        console.warn(e);
      }
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleNextButton = async () => {
    setCurrentQuestionWithType(null);
    setProblemAnswer(null);
    setSelectedAnswer(null);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await getProblem(category);
  };

  const sendAnswerButton = async (id: string, answer: string) => {
    if (!currentQuestionWithType) return;
    setIsLoading(true);
    try {
      if (currentQuestionWithType.problemType === ProblemCategoryType.MAQ) {
        const res = await sendMAQAnswerApi(id, answer);
        setProblemAnswer(res.payload as SendMAQAnswerRes);
        setUser({
          ...user,
          userScore: (res.payload as SendMAQAnswerRes).userScore,
        } as UserInfo);
      } else {
        const res = await sendSAQAnswerApi(id, answer);
        setProblemAnswer(res.payload as SendSAQAnswerRes);
        setUser({
          ...user,
          userScore: (res.payload as SendSAQAnswerRes).userScore,
        } as UserInfo);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const bookMarkToggle = async (questionId: string) => {
    try {
      const res = await questionBookmarkToggleApi(questionId);
      if (res.ok) {
        return res.payload as boolean;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    setDefaultCanSolveProblemInfo();
    getProblem(category);
  }, []);

  return (
    <div className="relative flex h-full w-full justify-center px-[2%] md:px-0">
      <Toaster />
      {isPageLoading ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full max-w-[1200px] flex-col rounded-xl px-[2%] pb-[2%] pt-[1%] md:max-h-full md:min-h-[50vh]">
          {!currentQuestionWithType ? (
            '더 이상 풀 문제가 없습니다'
          ) : (
            <div className="flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col pb-2 md:gap-2 md:p-2">
                <div className="flex w-full items-end justify-between">
                  <div className="space-x-1 text-xl">
                    <span>
                      {category.at(0)
                        ? category.at(0)?.toUpperCase() + category.slice(1)
                        : ''}
                    </span>
                    <span
                      className={`rounded-lg border p-0.5 px-1.5 text-[0.65rem] text-gray-800 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'bg-pointcolor-coral/40' : 'bg-pointcolor-apricot/40'}`}
                    >
                      {currentQuestionWithType?.problemType ===
                      ProblemCategoryType.MAQ
                        ? '객관식'
                        : '주관식'}
                    </span>
                  </div>
                  <button className="rounded-lg bg-pointcolor-beigebrown p-2 text-sm hover:cursor-auto">
                    레벨 {currentQuestionWithType?.difficulty}
                  </button>
                </div>
                <div className="py-3 pl-2 font-bold">
                  {currentQuestionWithType?.questionTitle}
                </div>
                <div className="w-full flex-1 overflow-y-auto rounded-3xl bg-white p-2 shadow-md">
                  <MarkdownComponent
                    markdown={currentQuestionWithType?.content ?? ''}
                  />
                </div>
              </div>

              {problemAnswer ? (
                <div className="flex w-full flex-col">
                  <div className="mt-4 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-3 md:text-base">
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.MAQ ? (
                      Array.from({ length: 4 }, (_, i) => i).map((index) => {
                        return (
                          <ChoicedItemResult
                            key={index}
                            index={index}
                            text={
                              currentQuestionWithType[
                                `choice${index + 1}` as Extract<
                                  keyof ProblemInfoMAQ,
                                  `choice${string}`
                                >
                              ]
                            }
                            userAnswer={selectedAnswer ?? ''}
                            problemAnswer={
                              (problemAnswer as SendMAQAnswerRes).answer
                            }
                          />
                        );
                      })
                    ) : (
                      <>
                        <textarea
                          className="w-full rounded-lg border p-2"
                          value={selectedAnswer ?? ''}
                          readOnly
                        />
                        <div
                          className={`mt-4 flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 inner-border ${(problemAnswer as SendSAQAnswerRes).reflectedScore > 0 ? 'bg-correctGreen' : 'bg-wrongRed'}`}
                        >
                          <p className="text-sm text-gray-600">정답 : </p>
                          <span>
                            {(problemAnswer as SendSAQAnswerRes).modelAnswer}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`flex w-full flex-col md:pl-2 md:pr-3 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'mt-4' : 'mt-2'} gap-0.5`}
                  >
                    <div className="flex w-full flex-col rounded-xl bg-white px-4 py-3 inner-border">
                      <p className="text-sm text-gray-600">해설 : </p>
                      <span>{problemAnswer.answerExplanation}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
                    {currentQuestionWithType ? (
                      <div className="mr-1 flex h-full items-center gap-2 md:mr-4 md:mt-3 md:gap-2">
                        <BookMarkCircle
                          size={20}
                          color="#b08968"
                          strokeWidth={2.2}
                          initialValue={false}
                          onClick={async () =>
                            await bookMarkToggle(currentQuestionWithType.id)
                          }
                        />
                        <button
                          disabled={problemAnswer === null}
                          className={`flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                            problemAnswer === null
                              ? 'cursor-not-allowed bg-gray-400 opacity-50'
                              : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                          } text-white`}
                          onClick={async () => {
                            await handleNextButton();
                          }}
                        >
                          <IoIosArrowForward
                            color="white"
                            className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  <div className="mt-2 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-2 md:text-base">
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.MAQ
                      ? Array.from({ length: 4 }, (_, i) => i).map((index) => {
                          return (
                            <ChoiceItem
                              key={index}
                              text={
                                currentQuestionWithType[
                                  `choice${index + 1}` as Extract<
                                    keyof ProblemInfoMAQ,
                                    `choice${string}`
                                  >
                                ]
                              }
                              isSelected={
                                selectedAnswer === (index + 1).toString()
                              }
                              onClick={() => {
                                if (isLoading) return;
                                setSelectedAnswer((index + 1).toString());
                              }}
                            />
                          );
                        })
                      : null}
                    {currentQuestionWithType?.problemType ===
                    ProblemCategoryType.SAQ ? (
                      <textarea
                        className="w-full rounded-lg border border-gray-300 p-2"
                        placeholder="답을 입력해주세요"
                        value={selectedAnswer ?? ''}
                        onChange={(e) => {
                          if (isLoading) return;
                          setSelectedAnswer(e.target.value);
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
                    {currentQuestionWithType ? (
                      <button
                        disabled={selectedAnswer === null}
                        className={`mr-1 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
                          selectedAnswer === null || isLoading
                            ? 'cursor-not-allowed bg-gray-400 opacity-50'
                            : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
                        } text-white`}
                        onClick={async () => {
                          if (!currentQuestionWithType || !selectedAnswer)
                            return;
                          await sendAnswerButton(
                            currentQuestionWithType.id,
                            selectedAnswer
                          );
                        }}
                      >
                        {isLoading ? (
                          <Spinner size="xs" />
                        ) : (
                          <PiPaperPlaneTilt className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Problem;
