import { useQuery } from '@tanstack/react-query';
import { getLevelTestQuestionsApi } from '../api';
import { ProblemInfoLevelTest } from '@/shared/constants/problemInfo';
import { ServerErrorResponse } from '@/shared/api/model/config';

export type ApiResponse<T> = {
  ok: boolean;
  payload: ServerErrorResponse | T;
};

export const useChachingLevelTest = () => {
  return useQuery<ProblemInfoLevelTest[], Error>({
    queryKey: ['levelTestQuestions'],
    queryFn: async () => {
      const res: ApiResponse<ProblemInfoLevelTest[]> =
        await getLevelTestQuestionsApi();

      if (!res.ok) {
        const errorPayload = res.payload as ServerErrorResponse;
        throw new Error(
          errorPayload.message || '레벨 테스트 문제를 불러오지 못했습니다.'
        );
      }

      return res.payload as ProblemInfoLevelTest[];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
