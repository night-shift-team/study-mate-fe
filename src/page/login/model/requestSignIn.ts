import { ServerErrorResponse } from '@/shared/api/model/config';
import { localLoginApi, LocalLoginRes } from '../api';

export const requestSignIn = async (email: string, password: string) => {
  try {
    const res = await localLoginApi(email, password);
    console.log(res);
    if (res.ok) {
      return res.payload as LocalLoginRes;
    }
    throw res.payload as ServerErrorResponse;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
