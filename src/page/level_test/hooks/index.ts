import { useQuery } from '@tanstack/react-query';
import { getLevelTestQuestionsApi } from '../api';
import { ProblemInfoLevelTest } from '@/shared/constants/problemInfo';

export const useChachingLevelTest = () => {
  return useQuery<ProblemInfoLevelTest[], Error>({
    queryKey: ['levelTestQuestions'],
    queryFn: async () => {
      const res = await getLevelTestQuestionsApi();
      if (!res.ok) {
        throw new Error(
          (res.payload as { message?: string })?.message ||
            '문제를 불러오지 못했습니다. 서버 오류.'
        );
      }

      if (!Array.isArray(res.payload)) {
        throw new Error(
          `문제 목록이 배열이 아닙니다: ${JSON.stringify(res.payload)}`
        );
      }

      return res.payload;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
