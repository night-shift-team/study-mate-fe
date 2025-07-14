import { _apiFetch } from '@/shared/api/model/config';
const API_Prefix = '/api/v1/users/rank';

export interface UserRankingRes {
  myRanking: number;
  otherUsers: {
    userId: string;
    loginId: string;
    nickname: string;
    profileImg: string;
    userScore: number;
    rankNo: number;
  }[];
  pageSize: number;
  pageNumber: number;
}

export const getUserRankingApi = async (page: number, limit: number) => {
  const query = `?page=${page}&limit=${limit}`;
  return await _apiFetch<UserRankingRes>('GET', `${API_Prefix}${query}`);
};
