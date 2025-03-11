import { accessTokenRefreshApi, AuthTokenRes } from '@/shared/user/api';
import {
  ServerErrorResponse,
  setAccessTokenToHeader,
  setRefreshTokenToHeader,
} from './config';

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('accessToken', accessToken, 'refreshToken', refreshToken);
    if (accessToken) {
      setAccessTokenToHeader(accessToken);
      return accessToken;
    }
    //* header에 refresh Token을 담아서 보내야 함
    if (refreshToken) {
      setRefreshTokenToHeader(refreshToken);
      const res = await accessTokenRefreshApi(refreshToken);
      if (res.ok) {
        const data = res.payload as AuthTokenRes;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return res.payload as AuthTokenRes;
      } else {
        throw res.payload as ServerErrorResponse;
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
