import { _apiFetch } from '@/shared/api/model/config';
import { ProblemCategory } from '@/shared/constants/problemInfo';

const API_Prefix = '/api/v1';

type GetLevelTestQuestionsRes = {
  id: bigint;
  description: string;
  comment: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}[];

export const getLevelTestQuestionsApi = async () => {
  return await _apiFetch<GetLevelTestQuestionsRes>(
    'GET',
    API_Prefix + '/question/level-test'
  );
};
