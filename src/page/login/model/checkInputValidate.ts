import { RefObject } from 'react';

export const checkEmailValidate = (
  emailInputRef: RefObject<HTMLInputElement | null>,
  isValid: boolean
) => {
  if (!isValid && emailInputRef.current) {
    emailInputRef.current.setCustomValidity('이메일 정보가 일치하지 않습니다.');
    emailInputRef.current.reportValidity();
    return;
  } else if (isValid && emailInputRef.current) {
    emailInputRef.current.setCustomValidity('');
    return;
  }
};

export const checkPasswordValidate = (
  passwordInputRef: RefObject<HTMLInputElement | null>,
  isValid: boolean
) => {
  if (!isValid && passwordInputRef.current) {
    passwordInputRef.current.setCustomValidity(
      '패스워드 정보가 일치하지 않습니다.'
    );
    passwordInputRef.current.reportValidity();
    return;
  } else if (isValid && passwordInputRef.current) {
    passwordInputRef.current.setCustomValidity('');
    return;
  }
};
