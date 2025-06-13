import { ServerErrorResponse } from '@/shared/api/model/config';
import { localLoginApi, LoginRes } from '../api';

export const requestSignIn = async (email: string, password: string) => {
  try {
    const res = await localLoginApi(email, password);
    console.log(res);
    if (res.ok) {
      return res.payload as LoginRes;
    }
    throw res.payload as ServerErrorResponse;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
