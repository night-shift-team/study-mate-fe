import { _apiFetch } from '@/shared/api/model/config';

const Api_Prefix = '/api/v1';

export interface AuthTokenRes {
  accessToken: string;
  refreshToken: string;
}
export const accessTokenRefreshApi = async (refreshToken: string) => {
  const body = { refreshToken: refreshToken };
  return await _apiFetch<AuthTokenRes>(
    'POST',
    Api_Prefix + '/users/refresh',
    body
  );
};
