import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1/notice';

export enum NoticeCategory {
  GENERAL = 'GENERAL', // 일반공지
  URGENT = 'URGENT', // 긴급공지
  EVENT = 'EVENT', // 이벤트
  MAINTENANCE = 'MAINTENANCE', // 점검
}
export interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeCategory: NoticeCategory;
  noticePurpose: string;
  pulbisherName: string;
  backgroundImage: string;
  displayStartTime: string; // ISO 8601 형식의 날짜 문자열
  displayEndTime: string; // ISO 8601 형식의 날짜 문자열
  maintenanceStartTime: string; // ISO 8601 형식의 날짜 문자열
  maintenanceEndTime: string; // ISO 8601 형식의 날짜 문자열
}

export interface getAllNoticeListRes {
  content: Notice[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface GetValidnoticeListRes {
  displayNotices: Notice[];
  maintenaceNotices: Notice[];
  isMaintenanceNoticeExist: boolean;
  isDisplayNoticeExist: boolean;
}

export const getAllNoticeListApi = async (page: number, limit: number) => {
  const query = `page=${String(page)}&limit=${String(limit)}`;
  return await _apiFetch<getAllNoticeListRes>('GET', `${API_Prefix}?${query}`);
};
export const getNoticeDetailApi = async (id: number) => {
  const path = String(id);
  return await _apiFetch<Notice>('GET', `${API_Prefix}/${path}`);
};
export const getValidNoticeListApi = async () => {
  return await _apiFetch<GetValidnoticeListRes>(
    'GET',
    `${API_Prefix}/display/valid`
  );
};
