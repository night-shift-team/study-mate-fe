import { accessTokenRefreshApi, AuthTokenRes } from '@/shared/user/api';
import { ServerErrorResponse, setTokenToHeader } from './config';
import { Ecode, EcodeMessage } from './ecode';

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    setTokenToHeader(accessToken);
    return accessToken;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAccessTokenFromRefreshToken = async (
  refreshToken: string | null
) => {
  if (!refreshToken) throw new Error('no refresh token');
  try {
    const res = await accessTokenRefreshApi(refreshToken);
    if (res.ok) {
      const data = res.payload as AuthTokenRes;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return (res.payload as AuthTokenRes).accessToken;
    }
    if ((res.payload as ServerErrorResponse).ecode === Ecode.E0005) {
      throw EcodeMessage(Ecode.E0005);
    }
    throw res.payload as ServerErrorResponse;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
