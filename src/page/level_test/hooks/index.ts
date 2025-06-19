import { useQuery } from '@tanstack/react-query';
import { getLevelTestQuestionsApi } from '../api';
import { ProblemInfoLevelTest } from '@/shared/constants/problemInfo';

export const useChacingLevelTest = () => {
  return useQuery<ProblemInfoLevelTest[], Error>({
    queryKey: ['levelTestQuestions'],
    queryFn: async () => {
      const res = await getLevelTestQuestionsApi();
      if (!res.ok) {
        throw new Error('문제를 불러오지 못했습니다. 서버 오류.');
      }
      if (!Array.isArray(res.payload)) {
        throw new Error('문제를 불러오지 못했습니다. 데이터 형식 오류.');
      }
      return res.payload as ProblemInfoLevelTest[];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1, // 실패 시 재시도 횟수
  });
};
