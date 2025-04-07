import { RefObject } from 'react';

export const checkEmailValidate = (
  emailInputRef: RefObject<HTMLInputElement | null>,
  isValid: boolean
) => {
  if (!isValid && emailInputRef.current) {
    return false;
  } else if (isValid && emailInputRef.current) {
    return true;
  }
  return false;
};

export const checkPasswordValidate = (
  passwordInputRef: RefObject<HTMLInputElement | null>,
  isValid: boolean
) => {
  if (!isValid && passwordInputRef.current) {
    return false;
  } else if (isValid && passwordInputRef.current) {
    return true;
  }
  return false;
};
