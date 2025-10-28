'use client';

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

  const prevPW = form.get('prev-password')
    ? (form.get('prev-password') as Extract<FormDataEntryValue, 'string'>)
    : ('' as string);

  //* 비밀번호 변경 요청
  const changeSuccess = await changePassword(loginId, prevPW, checkPW);
  if (!changeSuccess.ok) {
    return { ok: false, errorTitle: changeSuccess.payload };
  }
  return { ok: true, errorTitle: '' };
};

const changePassword = async (userId: string, oldPW: string, newPW: string) => {
  try {
    const res = await changePasswordApi(userId, oldPW, newPW);
    console.log('api res', res);
    if (res.ok) {
      return { ok: true, payload: res.payload };
    }
    return { ok: false, payload: (res.payload as ServerErrorResponse).ecode };
  } catch (e) {
    console.log(e);
    return { ok: false, payload: 'Change_Failed' };
  }
};
