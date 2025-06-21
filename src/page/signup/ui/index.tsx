'use client';

import { useEffect, useRef, useState } from 'react';
import {
  checkDuplicateEmailApi,
  checkDuplicateNicknameApi,
  signUpApi,
} from '../api';
import MoonLoader from 'react-spinners/MoonLoader';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { DialogPopup } from '@/shared/popUp/ui/dialogPopup';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import useToast, { ToastType } from '@/shared/toast/toast';
import useTooltip from '@/feature/tooltip/tooltipController';
import { TooltipContents } from '@/state/tooltip/tooltipContents';
import { PopupConfirm } from '@/shared/popUp/ui/popupV2';
import tooltipMountHook from '@/feature/tooltip/tooltipMount';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
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
  const [popupOpen, setPopupOpen] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const signUpPopupRef = useRef<HTMLElement>(null);
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
      console.log(res);
      return res.payload;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const checkEmailDuplicate = async (email: string) => {
    try {
      const res = await checkDuplicateEmailApi(email);
      console.log(res);
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
      const res = await signUpApi(formData);
      console.log(res);
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

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <Toaster />
      {popupOpen && (
        <PopupConfirm
          size="sm"
          title="회원가입"
          content="회원가입이 정상적으로 완료되었습니다"
          onConfirm={() => {
            router.push(RouteTo.Login);
          }}
        />
      )}
      <div className="flex w-full max-w-[550px] flex-col justify-center gap-8 rounded-[1rem] bg-white p-4 shadow-lg md:p-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="mt-5 text-xl font-semibold">이메일 회원가입</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[400px]"
            noValidate
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 pl-1 text-sm text-gray-600">
                  이름 <span className="text-red-500">&#9913;</span>
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 pl-1 text-sm text-gray-600">
                  이메일 <span className="text-red-500">&#9913;</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 pl-1 text-sm text-gray-600">
                  비밀번호 <span className="text-red-500">&#9913;</span>
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 pl-1 text-sm text-gray-600">
                  비밀번호 확인 <span className="text-red-500">&#9913;</span>
                </label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 확인해주세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                />
              </div>

              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="mt-4 flex h-[42px] w-full items-center justify-center rounded-lg bg-gray-400 p-2 text-white"
                >
                  <Spinner color="#ffffff" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-4 h-[42px] rounded-lg bg-pointcolor-sand/80 py-2 text-gray-600 transition-colors inner-border-pointcolor-beigebrown hover:bg-[#F0EDD4] hover:text-black hover:inner-border-[1.2px]"
                >
                  회원가입
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
