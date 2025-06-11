import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1';

export interface BoardsQnAListRes {
  content: BoardContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface BoardContent {
  id: number;
  user: User;
  title: string;
  content: string;
  category: 'FREE' | string;
  status: 'RECEIVED' | string;
  view: number;
  createdDt: string;
  comments: BoardComment[];
}

export interface User {
  userId: string;
  loginType: 'LOCAL' | string;
  loginId: string;
  nickname: string;
  profileImg: string;
  status: 'ACTIVE' | string;
  role: number;
  userScore: number;
  registeredAt: string;
}

export interface BoardComment {
  id: number;
  content: string;
  writer: string;
  createdDt: string;
}

export interface CreateQnABoardReq {
  title: string;
  content: string;
}

// ✅ 공통 응답 타입
export interface APIResponse<T> {
  ok: boolean;
  payload: T;
}

export interface BoardDetail {
  id: number;
  title: string;
  content: string;
  user: { nickname: string; loginId: string };
  view: number;
  registeredAt: string;
}

export interface CreateCommentReq {
  boardId: number;
  content: string;
}

// QnA 게시글 목록 조회
export const getQnABoardListApi = async (
  page: number,
  limit: number
): Promise<APIResponse<BoardsQnAListRes>> => {
  const query = `?page=${page}&limit=${limit}`;
  const res = await _apiFetch<BoardsQnAListRes>(
    'GET',
    `${API_Prefix}/boards/qna${query}`
  );
  if (res.ok) {
    return res as APIResponse<BoardsQnAListRes>;
  }
  throw new Error('Failed to fetch QnA board list');
};

// QnA 게시글 생성
export const createQnABoardApi = async (
  data: CreateQnABoardReq
): Promise<number> => {
  const res = await _apiFetch<number>('POST', `${API_Prefix}/boards/qna`, data);
  if (res.ok && typeof res.payload === 'number') {
    return res.payload;
  }
  throw new Error('Failed to create QnA board');
};

// QnA 게시글 상세 조회
export const getQnABoardDetailApi = async (
  id: number
): Promise<APIResponse<BoardContent>> => {
  const res = await _apiFetch<BoardContent>(
    'GET',
    `${API_Prefix}/boards/${id}/qna`
  );

  if (res.ok) {
    return res as APIResponse<BoardContent>;
  }

  throw new Error('Failed to fetch QnA board detail');
};

export const deleteQnABoardApi = async (id: number): Promise<void> => {
  const res = await _apiFetch('POST', `${API_Prefix}/boards/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to delete QnA board with id ${id}`);
  }
};

export const createCommentApi = async (
  data: CreateCommentReq
): Promise<APIResponse<null>> => {
  const res = await _apiFetch<null>('POST', `${API_Prefix}/comments`, data);

  if (res.ok) {
    return { ok: true, payload: null };
  }

  throw new Error('Failed to create comment');
};
