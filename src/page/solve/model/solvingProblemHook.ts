'use client';
import { questionBookmarkToggleApi } from '@/feature/boomMark/api';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryType,
  ProblemInfoMAQ,
  ProblemInfoSAQ,
} from '@/shared/problem/model/problemInfo.types';
import useToast, { ToastType } from '@/shared/toast/model/toastHook';
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
} from './getRandomCategory';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Ecode } from '@/shared/api/model/ecode';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { ProblemProps } from '../ui/solvingProblemPage';
import { userStore } from '@/shared/state/userStore/model';

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

const useSolvingProblem = (category: ProblemProps['category']) => {
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
  const { user, setUser } = userStore.getState();

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
      const randomCategory = getRandomProblemCategory([...availabaleSolveData]);
      await getProblemByCategory(randomCategory);
    } catch (e) {
      throw e;
    }
  };

  const getProblemByCategory = async (targetCategory: ProblemCategoryTitle) => {
    try {
      const solveType = checkCanSolveProblemType(targetCategory);
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
      const canSolveData:
        | { category: ProblemCategory; canSolve: boolean }[]
        | undefined = data.filter(
        (item: { category: ProblemCategory }) =>
          item.category.split('_')[0] === targetCategory
      );
      if (canSolveData.length) {
        // MAQ, SAQ
        const first = canSolveData[0].canSolve
          ? (canSolveData[0].category.split('_')[1] as ProblemCategoryType)
          : null;
        const second = canSolveData[1].canSolve
          ? (canSolveData[1].category.split('_')[1] as ProblemCategoryType)
          : null;
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
        if (res.payload) {
          setToastDescription('북마크가 추가되었습니다.');
        } else {
          setToastDescription('북마크가 삭제되었습니다.');
        }
        setToastIcon(ToastType.success);
        return res.payload as boolean;
      }
      return false;
    } catch (e) {
      console.log(e);
      setToastDescription('일시적인 오류가 발생하였습니다.');
      setToastIcon(ToastType.error);
      return false;
    } finally {
      setToastOpen(true);
    }
  };

  useEffect(() => {
    setDefaultCanSolveProblemInfo();
    getProblem(category);
  }, []);

  useEffect(() => {
    if (!isPageLoading && category === 'random' && !currentQuestionWithType) {
      getProblem(category);
    }
  }, [isPageLoading]);

  return {
    selectedAnswer,
    currentQuestionWithType,
    problemAnswer,
    setSelectedAnswer,
    sendAnswerButton,
    bookMarkToggle,
    handleNextButton,
    isLoading,
    isPageLoading,
    Toaster,
  };
};
export default useSolvingProblem;
