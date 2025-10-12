import { _apiFetch } from '@/shared/api/model/config';

const API_Prefix = '/api/v1/change-password';

export const changePasswordApi = async (
  loginId: string,
  oldPW: string,
  newPW: string
) => {
  const body = {
    loginId: loginId,
    oldPassword: oldPW,
    newPassword: newPW,
  };
  return await _apiFetch<string>('POST', API_Prefix, body);
};
