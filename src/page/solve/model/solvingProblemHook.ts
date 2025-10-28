'use client';
import { questionBookmarkToggleApi } from '@/feature/boomMark/api';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryType,
  ProblemInfoMAQ,
  ProblemInfoSAQ,
} from '@/shared/problem/model/problemInfo.types';
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
  // getRandomProblemType,
} from './getRandomCategory';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Ecode } from '@/shared/api/model/ecode';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { ProblemProps } from '../ui/solvingProblemPage';
import { userStore } from '@/shared/state/userStore/model';
import { useRouter } from 'next/navigation';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';

export interface QuestionType extends ProblemInfoMAQ, ProblemInfoSAQ {
  problemType: ProblemCategoryType;
}
interface CanSolveProblemInfo {
  category: ProblemCategory;
  canSolve: boolean;
}

const DEFAULT_CANSOLVE_PROBLEM_INFO = (() => {
  const value: CanSolveProblemInfo[] = [];
  for (const key in ProblemCategory) {
    const problemType = key as keyof typeof ProblemCategory;
    if (Object.prototype.hasOwnProperty.call(ProblemCategory, key)) {
      if (ProblemCategory[problemType] === ProblemCategory.LEVEL_TEST) {
        continue;
      }
    }
    value.push({
      category: ProblemCategory[problemType],
      canSolve: problemType.includes('SAQ') ? false : true,
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

  const { user, setUser } = userStore.getState();

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const answerFormRef = useRef<HTMLDivElement>(null);
  const [answerListOpen, setAnswerListOpen] = useState(false);
  const answerClosedFormRef = useRef<HTMLDivElement>(null);

  const [userSolvingStatus, setUserSolvingStatus] = useState<
    'No_Data' | 'Can_Not_Solve' | 'Can_Solve' | 'Unknown_Error'
  >('Can_Solve');

  const router = useRouter();
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        answerFormRef.current &&
        !answerFormRef.current.contains(event.target as Node)
      ) {
        closeAnswerList();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const closeAnswerList = () => {
    setAnswerListOpen(false);
  };
  const openAnswerList = () => {
    setAnswerListOpen(true);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(String(index));
  };

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
        //* 현재는 MAQ만 풀 수 있으므로 주석처리
        // solveType === 'BOTH' ? getRandomProblemType() : solveType;
        ProblemCategoryType.MAQ;
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
        // MAQ, SAQ 순서대로 0인덱스, 1인덱스에 들어있음
        const canSolveMAQ = canSolveData[0].canSolve
          ? (canSolveData[0].category.split('_')[1] as ProblemCategoryType)
          : null;
        const canSolveSAQ = canSolveData[1].canSolve
          ? (canSolveData[1].category.split('_')[1] as ProblemCategoryType)
          : null;
        if (canSolveMAQ && canSolveSAQ) {
          return 'BOTH';
        } else if (!canSolveMAQ && canSolveSAQ) {
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
          return canSolveSAQ as ProblemCategoryType.SAQ;
        } else if (canSolveMAQ && !canSolveSAQ) {
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
          return canSolveMAQ as ProblemCategoryType.MAQ;
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
      console.log('error occured', e);
      if ((e as ServerErrorResponse).ecode === Ecode.E0404) {
        setSelectedAnswer(null);
        setProblemAnswer(null);
        setCurrentQuestionWithType(null);
        setUserSolvingStatus('No_Data');
      } else if ((e as ServerErrorResponse).ecode === Ecode.E0406) {
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
        if (res.ok) {
          setProblemAnswer(res.payload as SendMAQAnswerRes);
          setUser({
            ...user,
            userScore: (res.payload as SendMAQAnswerRes).userScore,
          } as UserInfo);
          return;
        }
        throw res.payload as ServerErrorResponse;
      } else {
        const res = await sendSAQAnswerApi(id, answer);
        if (res.ok) {
          setProblemAnswer(res.payload as SendSAQAnswerRes);
          setUser({
            ...user,
            userScore: (res.payload as SendSAQAnswerRes).userScore,
          } as UserInfo);
          return;
        }
        throw res.payload as ServerErrorResponse;
      }
    } catch (e) {
      console.log(e);
      console.log('problemAnswer', problemAnswer);
      if ((e as ServerErrorResponse).ecode !== undefined) {
        switch ((e as ServerErrorResponse).ecode) {
          case Ecode.E0407:
            setUserSolvingStatus('Can_Not_Solve');
            return;
          case Ecode.E0406:
            setUserSolvingStatus('No_Data');
            return;
          default:
            setUserSolvingStatus('Unknown_Error');
            return;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bookMarkToggle = async (questionId: string) => {
    try {
      const res = await questionBookmarkToggleApi(questionId);
      if (res.ok) {
        if (res.payload) {
          toastStore.update({
            status: ToastType.success,
            title: '북마크가 추가되었습니다.',
          });
        } else {
          toastStore.update({
            status: ToastType.success,
            title: '북마크가 삭제되었습니다.',
          });
        }
        return res.payload as boolean;
      }
      return false;
    } catch (e) {
      console.log(e);
      toastStore.update({
        status: ToastType.error,
        title: '일시적인 오류가 발생하였습니다.',
      });

      return false;
    }
  };

  useEffect(() => {
    setDefaultCanSolveProblemInfo();
    getProblem(category);
  }, []);

  useEffect(() => {
    if (
      !isPageLoading &&
      category === 'random' &&
      !currentQuestionWithType &&
      userSolvingStatus === 'Can_Solve'
    ) {
      getProblem(category);
    }
  }, [isPageLoading]);

  return {
    selectedAnswer,
    currentQuestionWithType,
    problemAnswer,
    userSolvingStatus,
    setSelectedAnswer,
    sendAnswerButton,
    bookMarkToggle,
    handleNextButton,
    isLoading,
    isPageLoading,
    router,
    answerFormRef,
    answerListOpen,
    openAnswerList,
    closeAnswerList,
    answerClosedFormRef,
    handleAnswerSelect,
  };
};
export default useSolvingProblem;
