import { _apiFetch } from '@/shared/apis/model/config';

const Api_Prefix = '/api/v1/users/';

// 닉네임 중복 확인 API
export const nickNameDuplicateCheckApi = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  console.log('api_Prefix', Api_Prefix + `nickname/duplicate${query}`);
  return await _apiFetch('GET', Api_Prefix + `nickname/duplicate${query}`);
};

// 회원가입 API
export const signUpUser = async (
  loginId: string,
  loginPw: string,
  nickname: string
) => {
  const body = {
    loginId,
    loginPw,
    nickname,
  };
  console.log('api_Prefix', Api_Prefix + `sign-up/local`);
  return await _apiFetch('POST', Api_Prefix + `sign-up/local`, body);
};

// 이메일 중복 확인 API
export const checkEmailDuplicate = async (email: string) => {
  const query = `?email=${email}`;
  console.log('api_Prefix', Api_Prefix + `email/duplicate${query}`);
  return await _apiFetch('GET', Api_Prefix + `email/duplicate${query}`);
};

// 닉네임 중복 확인 API
export const checkNicknameDuplicate = async (nickname: string) => {
  const query = `?nickname=${nickname}`;
  console.log('api_Prefix', Api_Prefix + `nickname/duplicate${query}`);
  return await _apiFetch('GET', Api_Prefix + `nickname/duplicate${query}`);
};

// 유저 정보 조회 API
export const getUsers = async () => {
  console.log('api_Prefix', Api_Prefix);
  return await _apiFetch('GET', Api_Prefix);
};
