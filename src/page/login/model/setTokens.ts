import { LocalLoginRes } from '../api';

export const setTokens = (tokens: LocalLoginRes) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};
