import { _fetchApi } from '@/shared/api/config';

const BffUrl = process.env.NEXT_PUBLIC_API_URL;
const Api_Prefix = BffUrl + '/api/v1/users/';

export const googleSignInApi = async (code: string) => {
  const body = {
    googleCode: code,
  };
  return await _fetchApi(Api_Prefix + `sign-in/google`, 'POST', body);
};

export const nickNameDuplicateCheckApi = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  return await _fetchApi(Api_Prefix + `nickname/duplicate${query}`, 'GET');
};
