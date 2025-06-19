import { useQuery } from '@tanstack/react-query';
import { getLevelTestQuestionsApi } from '../api';
import { ProblemInfoLevelTest } from '@/shared/constants/problemInfo';

export const useChacingLevelTest = () => {
  return useQuery<ProblemInfoLevelTest[], Error>({
    queryKey: ['levelTestQuestions'],
    queryFn: async () => {
      const res = await getLevelTestQuestionsApi();
      if (!res.ok) {
        throw new Error(error.message);
      }
      return res.payload as ProblemInfoLevelTest[];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
