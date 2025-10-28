'use client';
// import { verifyResetPasswordCodeApi } from '@/page/resetPassword/api';
import FormButtonPixel from '@/page/resetPassword/model/formStatus';
import InputForm from '@/shared/input/inputForm';
// import { changePasswordApi } from '../api';
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';
import { handleSubmit } from '../model/handleSubmit';

const ChangePasswordForm = ({
  loginId,
  setChangeSuccess,
}: {
  loginId: string;
  setChangeSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState({
    prevPassword: '',
    newPassword: '',
    checkNewPassword: '',
  });
  const [passwordAndCheckMatch, setPasswordAndCheckMatch] = useState(true);
  const [prevPasswordConfirmed, setPrevPasswordConfirmed] = useState(true);

  const passwordValidation = (value: string) => {
    const ASCII_UPPER_RE = /[A-Z]/;
    const ASCII_PUNCT_RE = /[!-\/:-@\[-`{-~]/; // ASCII punctuation ranges

    if (!value) return false;
    return ASCII_UPPER_RE.test(value) || ASCII_PUNCT_RE.test(value);
  };

  const boundAction = handleSubmit.bind(null, loginId);
  const [state, formAction] = useActionState(boundAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.ok) {
      setChangeSuccess(true);
      return;
    } else {
      switch (state.errorTitle) {
        case 'Password_Mismatch':
          setPasswordAndCheckMatch(false);
          break;
        case 'invalid password':
          setPrevPasswordConfirmed(false);
          break;
        case 'Change_Failed':
          toastStore.show({
            status: ToastType.error,
            title: '비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
          });
          break;
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="font-pretandard">
      <h1 className="mt-8 text-center font-pixel text-title-main">
        Change Password
      </h1>
      <h6 className="mt-12 text-xs font-medium">
        이메일로 받은 현재 비밀번호를 작성해주세요.
      </h6>
      <InputForm
        type="text"
        status="empty"
        name="prev-password"
        placeholder="Password"
        value={formData.prevPassword}
        onChange={(e) => {
          setFormData({ ...formData, prevPassword: e.target.value });
          setPrevPasswordConfirmed(true);
        }}
        className="password-hide mt-2 font-pretandard text-label"
      />
      {!prevPasswordConfirmed && (
        <span className="text-[11px] text-error">
          이전 비밀번호가 올바르지 않습니다.
        </span>
      )}
      <h6 className="mt-6 text-xs font-medium">
        신규 비밀번호를 입력해주세요.
      </h6>
      <InputForm
        type="text"
        status="empty"
        name="new-password"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={(e) => {
          setFormData({ ...formData, newPassword: e.target.value });
        }}
        className="password-hide mt-2 font-pretandard text-label"
      />
      <p
        className={`mt-2 pl-1 text-[11px] ${formData.newPassword.length >= 6 ? 'text-success-lightMode dark:text-success' : 'text-[#ED3241]'} `}
      >
        • 6글자 이상
      </p>
      <p
        className={`pl-1 text-[11px] ${passwordValidation(formData.newPassword) ? 'text-success-lightMode dark:text-success' : 'text-[#ED3241]'}`}
      >
        • 영문 대문자 또는 특수문자 포함
      </p>
      <InputForm
        type="text"
        status="empty"
        name="check-new-password"
        placeholder="Check Password"
        value={formData.checkNewPassword}
        onChange={(e) => {
          setFormData({ ...formData, checkNewPassword: e.target.value });
          setPasswordAndCheckMatch(true);
        }}
        className="password-hide mt-4 font-pretandard text-label"
      />
      {!passwordAndCheckMatch && (
        <span className="text-[11px] text-error">
          비밀번호가 일치하지 않습니다.
        </span>
      )}
      <div className="mt-6">
        <FormButtonPixel buttonText="Change" />
      </div>
    </form>
  );
};
export default ChangePasswordForm;
