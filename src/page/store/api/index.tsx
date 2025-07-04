import {
  PageResponseDtoOrderDto,
  PageResponseDtoStoreItemDto,
} from '@/shared/api/autoGenerateTypes';
import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1/store';

export const getStoreItemListApi = async (page: number, limit: number) => {
  const query = `?page=${page}&limit=${limit}`;
  return await _apiFetch<PageResponseDtoStoreItemDto>(
    'GET',
    `${API_Prefix}${query}`
  );
};

export const buyStoreItemApi = async (itemId: string) => {
  const body = {
    itemId: itemId,
  };
  return await _apiFetch<string>('POST', `${API_Prefix}/payment/request`, body);
};

export type PaymentHistoryApiRes = PageResponseDtoOrderDto;
export const getStorePaymentHistoryApi = async (
  page: number,
  limit: number
) => {
  const query = `?page=${page}&limit=${limit}`;
  return await _apiFetch<PaymentHistoryApiRes>(
    'GET',
    `${API_Prefix}/payment/orders/my${query}`
  );
};

export const paymentSSEApi = async () => {
  return await _apiFetch(
    'GET',
    `${API_Prefix}/payment/connect`,
    undefined,
    'text/event-stream'
  );
};
