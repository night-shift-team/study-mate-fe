import { getUserInfoApi, GetUserInfoRes } from '@/page/signup/api';

export const updateUser = async () => {
  try {
    const res = await getUserInfoApi();
    if (res.ok) {
      return res.payload as GetUserInfoRes;
    }
    throw res.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
};
