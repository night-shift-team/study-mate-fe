import useToast, { ToastType } from '@/shared/toast/model/toastHook';
import { useEffect, useRef, useState } from 'react';
import {
  checkDuplicateEmailApi,
  checkDuplicateNicknameApi,
  signUpApi,
} from '../api';
import { useRouter } from 'next/navigation';
import { SignUpFormData } from '../ui';
import useTooltip from '@/feature/tooltip/model/tooltipController';
import tooltipMountHook from '@/feature/tooltip/model/tooltipMount';
import { TooltipContents } from '@/shared/state/tooltip/model/tooltipContents';

const useSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as SignUpFormData);

  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  const { showTooltip, updateTooltip, hideTooltip } = useTooltip();

  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { setMountTooltip } = tooltipMountHook();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    hideTooltip(e.target);
  };

  const checkNicknameDuplicate = async (nickname: string) => {
    try {
      const res = await checkDuplicateNicknameApi(nickname);
      return res.payload;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const checkEmailDuplicate = async (email: string) => {
    try {
      const res = await checkDuplicateEmailApi(email);
      return res.payload;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 프론트 검증
      if (nameRef.current && !formData.name.length) {
        showTooltip(nameRef.current);
        nameRef.current.focus();
        return;
      }
      if (emailRef.current && !formData.email.length) {
        showTooltip(emailRef.current);
        emailRef.current.focus();
        return;
      }
      if (emailRef.current && !emailRef.current?.value.includes('@')) {
        updateTooltip(emailRef.current, TooltipContents.NotEmailForm);
        showTooltip(emailRef.current);
        emailRef.current.focus();
        return;
      }
      if (passwordRef.current && !formData.password.length) {
        showTooltip(passwordRef.current);
        passwordRef.current.focus();
        return;
      }
      if (confirmPasswordRef.current && !formData.confirmPassword.length) {
        showTooltip(confirmPasswordRef.current);
        confirmPasswordRef.current.focus();
        return;
      }
      if (
        passwordRef.current &&
        confirmPasswordRef.current &&
        formData.password !== formData.confirmPassword
      ) {
        updateTooltip(
          confirmPasswordRef.current,
          TooltipContents.InvalidConfirmPassword
        );
        showTooltip(confirmPasswordRef.current);
        confirmPasswordRef.current.focus();
        return;
      }

      // 서버 검증
      if (await checkNicknameDuplicate(formData.name)) {
        setToastIcon(ToastType.warning);
        setToastDescription('이미 사용중인 닉네임입니다.');
        setToastOpen(true);
        return;
      }
      if (await checkEmailDuplicate(formData.email)) {
        setToastIcon(ToastType.warning);
        setToastDescription('이미 사용중인 이메일입니다.');
        setToastOpen(true);
        return;
      }

      // 회원 가입 요청
      await signUpApi(formData);
      setPopupOpen(true);
    } catch (e) {
      console.error('회원가입 에러:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMountTooltip(nameRef.current as HTMLElement, TooltipContents.TypingName);
    setMountTooltip(
      emailRef.current as HTMLElement,
      TooltipContents.TypingEmail
    );
    setMountTooltip(
      passwordRef.current as HTMLElement,
      TooltipContents.TypingPassword
    );
    setMountTooltip(
      confirmPasswordRef.current as HTMLElement,
      TooltipContents.TypingConfirmPassword
    );
  }, []);

  return {
    nameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    formData,
    handleChange,
    Toaster,
    popupOpen,
    router,
    handleSubmit,
    isLoading,
  };
};
export default useSignUpPage;
