import { _apiFetch } from '@/shared/api/model/config';
const API_Prefix = '/api/v1/users';

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
interface SolveStats {
  solveDay: string;
  solveCount: number;
}

interface SolveStatsResponse {
  solveStats: SolveStats[];
  startDate: string;
  endDate: string;
}

export const getUserRankingApi = async (page: number, limit: number) => {
  return await _apiFetch<UserRankingRes>(
    'GET',
    `${API_Prefix}/${page}/${limit}/rank`
  );
};

export const getQuestionHistoryApi = async (monthBefore: number) => {
  return await _apiFetch<QuestionHistoryRes>(
    'GET',
    `/api/v1/history/${monthBefore}/monthly`
  );
};

export const getQuestionDetailApi = async (questionId: string) => {
  return await _apiFetch<QuestionDetailRes>(
    'GET',
    `/api/v1/question/${questionId}`
  );
};

export const getSolveStatsApi = async () => {
  return await _apiFetch<SolveStatsResponse>(
    'GET',
    `/api/v1/history/solve-stats`
  );
};
