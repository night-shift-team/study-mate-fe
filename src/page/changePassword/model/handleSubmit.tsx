'use server';

import { ServerErrorResponse } from '@/shared/api/model/config';
// import { verifyResetPasswordCodeApi } from '@/page/resetPassword/api';
import { changePasswordApi } from '../api';

export const handleSubmit = async (loginId: string, _: any, form: FormData) => {
  //* 비밀번호, 확인용 비밀번호 일치 여부 확인
  const newPW = form.get('new-password')
    ? (form.get('new-password') as Extract<FormDataEntryValue, 'string'>)
    : ('' as string);
  const checkPW = form.get('check-new-password')
    ? (form.get('check-new-password') as Extract<FormDataEntryValue, 'string'>)
    : ('' as string);
  if (newPW !== checkPW) {
    // setPasswordAndCheckMatch(false);
    return { ok: false, errorTitle: 'Password_Mismatch' };
  }
  // setPasswordAndCheckMatch(true);

  //* 비밃먼호 변경 요청

  const changeSuccess = await changePassword(loginId, newPW, checkPW);
  if (!changeSuccess.ok) {
    // setChangeSuccess(false);
    return {
      ok: false,
      errorTitle: changeSuccess.payload,
    };
  }
  // setChangeSuccess(true);
  return { ok: true, errorTitle: '' };
};

// const confirmPrevPassword = async (userId: string, prevPW: string) => {
//   try {
//     const res = await verifyResetPasswordCodeApi(userId, prevPW);
//     if (res.ok) {
//       return true;
//     }
//     return false;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// };

const changePassword = async (userId: string, oldPW: string, newPW: string) => {
  try {
    const res = await changePasswordApi(userId, oldPW, newPW);
    console.log(res);
    if (res.ok) {
      return { ok: true, payload: '' };
    }
    return { ok: false, payload: (res.payload as ServerErrorResponse).message };
  } catch (e) {
    console.log(e);
    return { ok: false, payload: 'Change_Failed' };
  }
};
