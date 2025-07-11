'use client';
import { FormEvent, useLayoutEffect, useState } from 'react';
import {
  CreateAdminMAQReq,
  CreateAdminSAQReq,
  ProblemDetailInfoRes,
  updateAdminMAQApi,
  updateAdminSAQApi,
} from '../api';
import useToast, { ToastType } from '@/shared/toast/model/toastHook';
import { getProblemDetail } from './getProblemDetailInfo';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import { Problem } from '../ui';

const useUpdateProblem = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (selectedProblem && !problemDetailInfo) {
      getProblemDetail(selectedProblem.id, setProblemDetailInfo).then(() => {
        try {
          setProblemDetailInfo(
            (prev) =>
              prev && { ...prev, options: JSON.parse(prev.options as string) }
          );
        } catch (e) {
          console.log(e);
        }
      });
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
    const [, pType] = problemDetailInfo.category.split('_');
    setIsLoading(true);

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
          setToastIcon(ToastType.success);
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
          setToastIcon(ToastType.success);
          setToastDescription('문제 수정이 완료되었습니다.');
          setToastOpen(true);
          return;
        }
        throw res.payload;
      }
      return;
    } catch (e) {
      console.log(e);
      setToastIcon(ToastType.error);
      setToastDescription('문제 수정에 실패했습니다.');
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    problemDetailInfo,
    setProblemDetailInfo,
    handleSubmit,
    Toaster,
    isLoading,
  };
};
export default useUpdateProblem;
