import { _apiFetch } from '@/shared/apis/model/config';

const Api_Prefix = '/api/v1/users/';

export interface GoogleSignInApiRes {
  accessToken: string;
  refreshToken: string;
}

export type LoginType = 'LOCAL' | 'GITHUB' | 'KAKAO' | 'NAVER' | 'GOOGLE';
export type UserStatus = 'ACTIVE' | 'PAUSE' | 'BAN';
export interface UserLoginApiRes {
  userId: bigint;
  loginType: LoginType;
  loginId: string;
  nickname: string;
  profileImg: string;
  status: UserStatus;
  role: number;
  registeredAt: string | null;
}

export const userLoginApi = async () => {
  return await _apiFetch<UserLoginApiRes>('GET', Api_Prefix);
};

export const googleSignInApi = async (code: string) => {
  const body = {
    googleCode: code,
  };
  console.log('api_Prefix', Api_Prefix + `sign-in/google`);
  return await _apiFetch<GoogleSignInApiRes>(
    'POST',
    Api_Prefix + `sign-in/google`,
    body
  );
};

export const nickNameDuplicateCheckApi = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  return await _apiFetch('GET', Api_Prefix + `nickname/duplicate${query}`);
};

export const localSignInApi = async (loginId: string, loginPw: string) => {
  const body = {
    loginId,
    loginPw,
  };
  return await _apiFetch<UserLoginApiRes>(
    'POST',
    Api_Prefix + `sign-in/local`,
    body
  );
};
