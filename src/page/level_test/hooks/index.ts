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
      try {
        const res: ApiResponse<ProblemInfoLevelTest[]> =
          await getLevelTestQuestionsApi();

        if (res.ok) {
          return res.payload as ProblemInfoLevelTest[];
        }

        throw res.payload;
      } catch (e) {
        console.log('레벨 테스트 문제 로딩 실패:', e);
      }
    },
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
