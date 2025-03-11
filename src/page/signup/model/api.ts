import { _apiFetch } from '@/shared/apis/model/config';
import { SignUpFormData } from '../ui';

const API_Prefix = '/api/v1/users';

export interface SignUpReq {
  loginId: string;
  loginPw: string;
  nickname: string;
}

export enum EnumUserLoginType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}
export enum EnumUserStatus {
  ACTIVE = 'ACTIVE',
  PAUSE = 'PAUSE',
  BAN = 'BAN',
}

export type UserLoginType =
  | EnumUserLoginType.GITHUB
  | EnumUserLoginType.GOOGLE
  | EnumUserLoginType.KAKAO
  | EnumUserLoginType.LOCAL
  | EnumUserLoginType.NAVER;
export type UserStatus =
  | EnumUserStatus.ACTIVE
  | EnumUserStatus.BAN
  | EnumUserStatus.PAUSE;

export interface GetUserInfoRes {
  userId: bigint;
  loginType: UserLoginType;
  loginId: string;
  nickname: string;
  profileImg: string;
  status: UserStatus;
  role: number;
  registeredAt: string;
  userScore: number;
}

export const checkDuplicateNicknameApi = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  return await _apiFetch('GET', API_Prefix + '/nickname/duplicate' + query);
};

export const checkDuplicateEmailApi = async (email: string) => {
  const query = `?email=${email}`;
  return await _apiFetch('GET', API_Prefix + '/email/duplicate' + query);
};

export const signUpApi = async (data: SignUpFormData) => {
  const body: SignUpReq = {
    loginId: data.email,
    loginPw: data.password,
    nickname: data.name,
  };
  return await _apiFetch('POST', API_Prefix + '/sign-up/local', body);
};

export const getUserInfoApi = async () => {
  return await _apiFetch('GET', API_Prefix + '/');
};
