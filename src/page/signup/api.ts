// api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 공통 fetch 함수
const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: object
) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error(`API 요청 에러: ${error}`);
    throw error;
  }
};

// 회원가입 API
export const signUpUser = async (
  loginId: string,
  loginPw: string,
  nickname: string
) => {
  return await apiRequest('/user/sign-up/local', 'POST', {
    loginId,
    loginPw,
    nickname,
  });
};

// 이메일 중복 확인 API
export const checkEmailDuplicate = async (email: string) => {
  return await apiRequest(`/users/email/duplicate?email=${email}`);
};

// 닉네임 중복 확인 API
export const checkNicknameDuplicate = async (nickname: string) => {
  return await apiRequest(`/users/nickname/duplicate?nickname=${nickname}`);
};

// 유저 정보 조회 API
export const getUsers = async () => {
  return await apiRequest('/users/');
};
