import { _apiFetch } from '@/shared/api/model/config';
import { UserLoginType, UserStatus } from '@/shared/constants/userInfo';

const Api_Prefix = '/api/v1/users';
export interface UserInfoRes {
  userId: string;
  loginType: UserLoginType;
  loginId: string;
  nickname: string;
  profileImg: string;
  status: UserStatus;
  role: number;
  registeredAt: string;
  userScore: number;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export const userInfoApi = async () => {
  return await _apiFetch<UserInfoRes>('GET', Api_Prefix + '/');
};

export const localLoginApi = async (loginId: string, password: string) => {
  const body = { loginId: loginId, loginPw: password };
  return await _apiFetch<LoginRes>('POST', Api_Prefix + '/sign-in/local', body);
};
export const googleSignInApi = async (code: string) => {
  const body = {
    googleCode: code,
  };
  return await _apiFetch<LoginRes>(
    'POST',
    Api_Prefix + `/sign-in/google`,
    body
  );
};

export const nickNameDuplicateCheckApi = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  return await _apiFetch('GET', Api_Prefix + `/nickname/duplicate${query}`);
};
