import { _apiFetch } from '@/shared/api/model/config';
import {
  ProblemCategory,
  ProblemCategoryType,
} from '@/shared/problem/model/problemInfo.types';

const API_PREFIX = '/api/v1/question';

export interface GetAdminMAQListRes {
  content: GetAdminMAQ[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface GetAdminSAQListRes {
  content: GetAdminSAQ[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface SearchAdminProblemCommonProps {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
}
export interface GetAdminMAQ extends SearchAdminProblemCommonProps {
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
}

export type GetAdminSAQ = SearchAdminProblemCommonProps;

export interface CreateAdminMAQReq {
  questionTitle: string;
  questionContent: string;
  answer: string;
  answerExplanation: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}

export interface CreateAdminSAQReq {
  questionTitle: string;
  questionContent: string;
  difficulty: number;
  category: ProblemCategory;
  answer: string;
  answerExplanation: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
}

export interface ProblemDetailInfoRes {
  questionId: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  options: string | string[];
  category: ProblemCategory;
  answer: string;
  answerExplanation: string;
}

export const getProblemDetailInfoApi = async (id: string) => {
  const path = id;
  return await _apiFetch<ProblemDetailInfoRes>('GET', `${API_PREFIX}/${path}`);
};

export const getAdminMAQListApi = async (page: number, limit: number) => {
  const query = `?page=${String(page)}&limit=${String(limit)}`;
  return await _apiFetch<GetAdminMAQListRes>(
    'GET',
    `${API_PREFIX}/admin/maq${query}`
  );
};

export const getAdminSAQListApi = async (page: number, limit: number) => {
  const query = `?page=${String(page)}&limit=${String(limit)}`;
  return await _apiFetch<GetAdminSAQListRes>(
    'GET',
    `${API_PREFIX}/admin/saq${query}`
  );
};

export const createAdminMAQApi = async (
  questionInfoData: CreateAdminMAQReq
) => {
  const body = questionInfoData;
  return await _apiFetch<string>(
    'POST',
    `${API_PREFIX}/admin/${ProblemCategoryType.MAQ.toLowerCase()}`,
    body
  );
};

export const createAdminSAQApi = async (
  questionInfoData: CreateAdminSAQReq
) => {
  const body = questionInfoData;
  return await _apiFetch<string>(
    'POST',
    `${API_PREFIX}/admin/${ProblemCategoryType.SAQ.toLowerCase()}`,
    body
  );
};

export const updateAdminMAQApi = async (
  id: string,
  questionInfoData: CreateAdminMAQReq
) => {
  const path = `/admin/${id}/${ProblemCategoryType.MAQ.toLowerCase()}`;
  const body = questionInfoData;
  return await _apiFetch<string>('PATCH', API_PREFIX + path, body);
};
export const updateAdminSAQApi = async (
  id: string,
  questionInfoData: CreateAdminSAQReq
) => {
  const path = `/admin/${id}/${ProblemCategoryType.SAQ.toLowerCase()}`;
  const body = questionInfoData;
  return await _apiFetch<string>('PATCH', API_PREFIX + path, body);
};

export const searchAdminMAQListApi = async (
  page: number,
  limit: number,
  keyword: string
) => {
  const query = `page=${page.toString()}&limit=${limit.toString()}&keyword=${keyword}`;
  return await _apiFetch<GetAdminMAQListRes>(
    'GET',
    `${API_PREFIX}/admin/search-maq?${query}`
  );
};

export const searchAdminSAQListApi = async (
  page: number,
  limit: number,
  keyword: string
) => {
  const query = `page=${page.toString()}&limit=${limit.toString()}&keyword=${keyword}`;
  return await _apiFetch<GetAdminSAQListRes>(
    'GET',
    `${API_PREFIX}/admin/search-saq?${query}`
  );
};
