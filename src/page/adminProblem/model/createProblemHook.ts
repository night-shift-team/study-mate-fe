import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  createAdminMAQApi,
  CreateAdminMAQReq,
  createAdminSAQApi,
  CreateAdminSAQReq,
  ProblemDetailInfoRes,
} from '../api';
import {
  ProblemCategory,
  ProblemCategoryType,
} from '@/shared/problem/model/problemInfo.types';
import useToast, { ToastType } from '@/shared/toast/model/toastHook';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { Ecode, EcodeMessage } from '@/shared/api/model/ecode';

const useCreateProblem = () => {
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
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  const [isLoading, setIsLoading] = useState(false);

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
    const [, pType] = problemDetailInfo.category.split('_')[1];

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
        const res = await createAdminMAQApi(body);
        if (res.ok) {
          setToastIcon(ToastType.success);
          setToastDescription('문제 생성이 완료되었습니다.');
          setToastOpen(true);
          setTimeout(() => {
            router.push(RouteTo.AdminManagementProblem);
          }, 2500);
          return;
        }
        if ((res.payload as ServerErrorResponse).ecode === Ecode.E0405) {
          setToastIcon(ToastType.error);
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
        const res = await createAdminSAQApi(body);
        if (res.ok) {
          setToastIcon(ToastType.success);
          setToastDescription('문제 생성이 완료되었습니다.');
          setToastOpen(true);
          setTimeout(() => {
            router.push(RouteTo.AdminManagementProblem);
          }, 2500);
          return;
        }
        if ((res.payload as ServerErrorResponse).ecode === Ecode.E0405) {
          setToastIcon(ToastType.error);
          setToastDescription(EcodeMessage(Ecode.E0405));
          setToastOpen(true);
          return;
        }
        throw res.payload;
      }
      return;
    } catch (e) {
      console.log(e);
      setToastIcon(ToastType.error);
      setToastDescription('문제 생성에 실패했습니다.');
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    problemDetailInfo,
    setProblemDetailInfo,
    Toaster,
    isLoading,
    handleSubmit,
  };
};
export default useCreateProblem;
