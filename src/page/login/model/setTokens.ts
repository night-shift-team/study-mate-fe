import { LoginRes } from '../api';

export const setTokens = (tokens: LoginRes) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};
