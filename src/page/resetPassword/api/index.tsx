import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1/users/reset-password/email-verification';

export const sendResetPasswordEmailApi = async (email: string) => {
  const body = { email };
  return await _apiFetch<string>('POST', API_Prefix, body);
};

export const verifyResetPasswordCodeApi = async (
  email: string,
  code: string
) => {
  const body = {
    email: email,
    code: code,
  };

  return await _apiFetch('POST', API_Prefix + '/verify', body);
};
