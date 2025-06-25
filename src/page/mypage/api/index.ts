import { _apiFetch } from '@/shared/api/model/config';
import { ProblemCategory } from '@/shared/constants/problemInfo';
const API_Prefix = '/api/v1';

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

export interface QuestionHistoryRes {
  payload: any;
  content: {
    historyId: number;
    questionId: string;
    questionTitle: string;
    userId: string;
    userAnswer: string;
    score: number;
    isCorrect: boolean;
    questionType: string;
  }[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface QuestionDetailRes {
  questionId: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  options: string;
  category: string;
  answer: string;
  answerExplanation: string;
}
export interface SolveStats {
  solveDay: string;
  solveCount: number;
}

export interface SolveStatsResponse {
  solveStats: SolveStats[];
  startDate: string;
  endDate: string;
}
export interface GetMyTodaySolveDataByCategory {
  historyId: number;
  questionId: string;
  questionTitle: string;
  userAnswer: string;
  userId: string;
  score: number;
  isCorrect: boolean;
  questionType: ProblemCategory;
}
export type GetMyTodaySolveDataByCategoryRes = GetMyTodaySolveDataByCategory[];

export interface QuestionFavoriteRes {
  questionId: string;
  questionTitle: string;
  questionContent: string;
  questionCategory: string;
  questionAnswer: string;
  questionExplanation: string;
  difficulty: number;
  createdDt: number;
}

export const getUserRankingApi = async (page: number, limit: number) => {
  const query = `?page=${page}&limit=${limit}`;
  return await _apiFetch<UserRankingRes>(
    'GET',
    `${API_Prefix}/users/rank${query}`
  );
};

export const getQuestionHistoryApi = async (
  monthBefore: number,
  size: number
) => {
  const query = `?month-before=${monthBefore}&page=0&size=${size}`;
  return await _apiFetch<QuestionHistoryRes>(
    'GET',
    `${API_Prefix}/history/monthly${query}`
  );
};

export const getQuestionDetailApi = async (questionId: string) => {
  return await _apiFetch<QuestionDetailRes>(
    'GET',
    `${API_Prefix}/question/${questionId}`
  );
};

export const getSolveStatsApi = async () => {
  return await _apiFetch<SolveStatsResponse>(
    'GET',
    `${API_Prefix}/history/solve-stats`
  );
};

export const changeNicknameApi = async (nickname: string) => {
  return await _apiFetch<{ nickname: string }>(
    'PATCH',
    `${API_Prefix}/users/nickname`,
    {
      nickname: nickname.trim(), // 혹시라도 공백이 있다면 제거
    }
  );
};

export const getMyTodaySolveDataByCategoryApi = async (
  category: ProblemCategory
) => {
  const query = `?category=${category}`;
  return await _apiFetch<GetMyTodaySolveDataByCategoryRes>(
    'GET',
    `${API_Prefix}/history/{category}/category/today${query}`
  );
};

export const getQuestionFavoriteApi = async (page: number, size: number) => {
  return await _apiFetch<QuestionFavoriteRes>(
    'GET',
    `${API_Prefix}/question-favorite/?page=${page}&size=${size}`
  );
};
export const removeFavoriteApi = async (questionId: string) => {
  const path = questionId;
  return await _apiFetch('POST', `${API_Prefix}/question-favorite/${path}`);
};
