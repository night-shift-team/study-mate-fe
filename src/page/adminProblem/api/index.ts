import { _apiFetch } from '@/shared/api/model/config';
import {
  ProblemCategory,
  ProblemCategoryType,
} from '@/shared/constants/problemInfo';

const API_PREFIX = '/api/v1';

export interface GetAdminMAQListRes {
  content: GetAdminMAQList[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface GetAdminSAQListRes {
  content: GetAdminSAQList[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface GetAdminMAQList {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}

export interface GetAdminSAQList {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
}

export const getAdminMAQListApi = async (page: number, limit: number) => {
  const path = `${page.toString()}/${limit.toString()}/${ProblemCategoryType.MAQ.toLowerCase()}`;
  return await _apiFetch<GetAdminMAQListRes>(
    'GET',
    `${API_PREFIX}/question/admin/${path}`
  );
};

export const getAdminSAQListApi = async (page: number, limit: number) => {
  const path = `${page.toString()}/${limit.toString()}/${ProblemCategoryType.SAQ.toLowerCase()}`;
  return await _apiFetch<GetAdminSAQListRes>(
    'GET',
    `${API_PREFIX}/question/admin/${path}`
  );
};
