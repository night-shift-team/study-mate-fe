import { _apiFetch } from '@/shared/apis/model/config';

const Api_Prefix = '/api/v1/users/';

export interface GoogleSignInApiRes {
  accessToken: string;
  refreshToken: string;
}

export interface GitHubSignInApiRes {
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

export const githubSigninApi = async (code: string) => {
  const body = {
    googleCode: code,
  };
  return await _apiFetch<GitHubSignInApiRes>(
    'POST',
    Api_Prefix + `sign-in/github`,
    body
  );
};
