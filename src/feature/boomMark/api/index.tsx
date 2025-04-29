import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1/question-favorite';

export const questionBookmarkToggleApi = async (questionId: string) => {
  const path = questionId;
  return await _apiFetch('POST', `${API_Prefix}/${path}`);
};
