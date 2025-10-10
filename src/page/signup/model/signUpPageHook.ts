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
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userInfoApi, UserInfoRes } from '@/page/login/api';
import { setTokenToHeader } from '@/shared/api/model/config';
import { requestSignIn } from '@/page/login/model/requestSignIn';
import { setTokens } from '@/page/login/model/setTokens';
import { userStore } from '@/shared/state/userStore/model';
const useSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as SignUpFormData);

  const [isFormChecked, setIsFormChecked] = useState({
    nickname: false,
    email: false,
    password: false,
  });

  // const [toastOpen, setToastOpen] = useState(false);
  // const { Toaster, setToastDescription, setToastIcon } = useToast(
  //   toastOpen,
  //   setToastOpen
  // );
  // const { showTooltip, updateTooltip, hideTooltip } = useTooltip();

  const [isLoading, setIsLoading] = useState(false);
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
      // 폼 입력값 검증 -> 서버 검증 순서로 진행

      // 1. 닉네임 검증
      if (nameRef.current && !formData.name.length) {
        setValidationStatus((prev) => ({
          ...prev,
          name: { status: 'error', message: TooltipContents.TypingName },
        }));
        nameRef.current.focus();
        return;
      }

      if (!isFormChecked.nickname) {
        const res = await checkNicknameDuplicate(formData.name);
        if (res) {
          setValidationStatus((prev) => ({
            ...prev,
            name: {
              status: 'error',
              message: TooltipContents.DuplicateName,
            },
          }));
          return;
        }
        setIsFormChecked((prev) => ({ ...prev, nickname: true }));
      }

      console.log('email ', !formData.email.length, ' email', emailRef.current);

      // 2. 이메일 검증
      if (!emailRef.current && !formData.email.length) return;
      if (emailRef.current && !formData.email.length) {
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

      if (!isFormChecked.email) {
        const res = await checkEmailDuplicate(formData.email);
        if (res) {
          setValidationStatus((prev) => ({
            ...prev,
            email: {
              status: 'error',
              message: TooltipContents.DuplicateEmail,
            },
          }));
          return;
        }
        setIsFormChecked((prev) => ({ ...prev, email: true }));
      }

      // 3. 패스워드 검증
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

      // 모든 검증 완료
      setIsFormChecked((prev) => ({ ...prev, password: true }));
    } catch (e) {
      console.warn('회원 가입 불가:', e);
      return;
    } finally {
      setIsLoading(false);
    }

    if (
      !isFormChecked.nickname ||
      !isFormChecked.email ||
      !isFormChecked.password
    )
      return;

    // 4. 회원 가입 요청
    setIsLoading(true);
    try {
      const signUpRes = await signUpApi(formData);
      if (signUpRes.ok) {
        // 로그인 요청
        await signInAndSetUser(formData.email, formData.password);
      }
    } catch (e) {
      console.error('회원가입 에러:', e);
    }
  };

  const signInAndSetUser = async (email: string, password: string) => {
    const setUser = userStore.getState().setUser;

    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      const tokens = await requestSignIn(email, password);
      setTokens(tokens);
      setTokenToHeader(localStorage.getItem('accessToken'));
      const res = await userInfoApi();
      if (res.ok) {
        const userData = res.payload as UserInfoRes;
        setUser(userData);
        router.push(RouteTo.SignupComplete);
        return;
      }
      throw new Error('유저 로그인 실패');
    } catch (error) {
      console.error('로그인 에러:', error);
      router.push(RouteTo.Home);
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
    router,
    handleSubmit,
    isLoading,
    validationStatus,
    isFormChecked,
    setIsFormChecked,
  };
};
export default useSignUpPage;
