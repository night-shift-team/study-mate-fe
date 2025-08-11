// import useToast, { ToastType } from '@/shared/toast/model/toastHook';
import { useEffect, useRef, useState } from 'react';
import {
  checkDuplicateEmailApi,
  checkDuplicateNicknameApi,
  signUpApi,
} from '../api';
import { useRouter } from 'next/navigation';
import { SignUpFormData } from '../ui';
// import useTooltip from '@/feature/tooltip/model/tooltipController';
import tooltipMountHook from '@/feature/tooltip/model/tooltipMount';
import { TooltipContents } from '@/shared/state/tooltip/model/tooltipContents';
import { InputStatus } from '@/shared/components/input/useInput';
const useSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as SignUpFormData);

  // const [toastOpen, setToastOpen] = useState(false);
  // const { Toaster, setToastDescription, setToastIcon } = useToast(
  //   toastOpen,
  //   setToastOpen
  // );
  // const { showTooltip, updateTooltip, hideTooltip } = useTooltip();

  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [validationStatus, setValidationStatus] = useState({
    name: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingName,
    },
    email: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingEmail,
    },
    password: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingPassword,
    },
    confirmPassword: {
      status: 'empty' as InputStatus,
      message: TooltipContents.TypingConfirmPassword,
    },
  });

  const { setMountTooltip } = tooltipMountHook();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('handleChange called with:', name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // hideTooltip(e.target);
    setValidationStatus((prev) => ({
      ...prev,
      [name]: {
        status: 'filled',
        message: '',
      },
    }));
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
        // showTooltip(nameRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          name: { status: 'error', message: TooltipContents.TypingName },
        }));
        nameRef.current.focus();
        return;
      }
      if (emailRef.current && !formData.email.length) {
        // showTooltip(emailRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          email: { status: 'error', message: TooltipContents.TypingEmail },
        }));
        emailRef.current.focus();
        return;
      }
      if (emailRef.current && !emailRef.current?.value.includes('@')) {
        // updateTooltip(emailRef.current, TooltipContents.NotEmailForm);
        // showTooltip(emailRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          email: { status: 'error', message: TooltipContents.NotEmailForm },
        }));
        emailRef.current.focus();
        return;
      }
      if (passwordRef.current && !formData.password.length) {
        // showTooltip(passwordRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          password: {
            status: 'error',
            message: TooltipContents.TypingPassword,
          },
        }));
        passwordRef.current.focus();
        return;
      }
      if (confirmPasswordRef.current && !formData.confirmPassword.length) {
        // showTooltip(confirmPasswordRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          confirmPassword: {
            status: 'error',
            message: TooltipContents.TypingConfirmPassword,
          },
        }));
        confirmPasswordRef.current.focus();
        return;
      }
      if (
        passwordRef.current &&
        confirmPasswordRef.current &&
        formData.password !== formData.confirmPassword
      ) {
        // updateTooltip(
        //   confirmPasswordRef.current,
        //   TooltipContents.InvalidConfirmPassword
        // );
        // showTooltip(confirmPasswordRef.current);
        setValidationStatus((prev) => ({
          ...prev,
          confirmPassword: {
            status: 'error',
            message: TooltipContents.InvalidConfirmPassword,
          },
        }));
        confirmPasswordRef.current.focus();
        return;
      }

      // 서버 검증
      if (await checkNicknameDuplicate(formData.name)) {
        setValidationStatus((prev) => ({
          ...prev,
          name: {
            status: 'error',
            message: TooltipContents.DuplicateName,
          },
        }));
        // setToastIcon(ToastType.warning);
        // setToastDescription('이미 사용중인 닉네임입니다.');
        // setToastOpen(true);
        return;
      }
      if (await checkEmailDuplicate(formData.email)) {
        // setToastIcon(ToastType.warning);
        // setToastDescription('이미 사용중인 이메일입니다.');
        // setToastOpen(true);
        setValidationStatus((prev) => ({
          ...prev,
          email: {
            status: 'error',
            message: TooltipContents.DuplicateEmail,
          },
        }));
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
    // Toaster,
    popupOpen,
    router,
    handleSubmit,
    isLoading,
    validationStatus,
  };
};
export default useSignUpPage;
