'use client';
import { userLoginApi } from '@/page/login/api';
import { ServerErrorResponse, handleServerErrors } from '@/shared/api/config';
import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { getRoutePath } from '@/shared/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useLoginHook = () => {
  const router = useRouter();
  useEffect(() => {
    userLogin();
  }, []);

  const userLogin = async () => {
    try {
      const res = await userLoginApi();

      if (!res.ok) {
        const errData = res.payload as ServerErrorResponse;
        if (errData.ecode === Ecode.E0002) {
          EcodeMessage(Ecode.E0002);
          router.push(getRoutePath('Home'));
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  };
};
