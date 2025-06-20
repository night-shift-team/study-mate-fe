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
      const res = await getLevelTestQuestionsApi();
      if (res.ok) {
        return res.payload as ProblemInfoLevelTest[];
      }

      throw res.payload;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
