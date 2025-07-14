import { useQuery } from '@tanstack/react-query';
import { getLevelTestQuestionsApi } from '../api';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { ProblemInfoLevelTest } from '@/shared/problem/model/problemInfo.types';

export type ApiResponse<T> = {
  ok: boolean;
  payload: ServerErrorResponse | T;
};

export const levelTestCaching = () => {
  return useQuery<ProblemInfoLevelTest[], Error>({
    queryKey: ['levelTestQuestions'],
    queryFn: async () => {
      try {
        const res: ApiResponse<ProblemInfoLevelTest[]> =
          await getLevelTestQuestionsApi();

        if (res.ok) {
          return res.payload as ProblemInfoLevelTest[];
        }

        throw res.payload;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
