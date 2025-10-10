'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import useSignUpPage from '../model/signUpPageHook';
import InputForm from '@/shared/input/inputForm';
import ButtonPixel, { ButtonPixelCustom } from '@/shared/button/buttonPixel';
import Link from 'next/link';
import { useRef } from 'react';
import { SvgIcon } from '@mui/material';
import HomeLogo from '@public/assets/icons/header/mobile_logo.svg';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const {
    nameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    formData,
    handleChange,
    // Toaster,
    handleSubmit,
    isLoading,
    validationStatus,
    isFormChecked,
  } = useSignUpPage();

  const getButtonText = (checkForm: typeof isFormChecked) => {
    if (!checkForm.nickname) return 'Check Nickname';
    if (!checkForm.email) return 'Verify Email';
    if (!checkForm.password) return 'Sign Up';
    return 'Sign Up';
  };

  const AuthNumberRef = useRef<HTMLInputElement>(null);
  const isAuthNumberValid = (value: string | undefined) => {
    try {
      if (!value) return false;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4">
      <SvgIcon
        component={HomeLogo}
        inheritViewBox
        sx={{ width: 'auto', height: '40px' }}
      />
      {isFormChecked.nickname && !isFormChecked.email ? (
        <>
          <span className="mt-6 text-title-main">Sign Up</span>
          <div className="mt-12 flex w-full flex-col items-center gap-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[400px]"
              noValidate
              autoComplete="off"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <InputForm
                    ref={nameRef}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nickname"
                    status={validationStatus.name.status}
                    className="font-pretandard text-label"
                  />
                  <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                    {validationStatus.name.status !== 'empty' &&
                      validationStatus.name.message}
                  </span>
                </div>
                {isFormChecked.nickname && (
                  <div className="flex flex-col">
                    <InputForm
                      ref={emailRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      status={validationStatus.email.status}
                      className="font-pretandard text-label"
                    />
                    <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                      {validationStatus.email.status !== 'empty' &&
                        validationStatus.email.message}
                    </span>
                  </div>
                )}
                {isFormChecked.email && (
                  <>
                    <div className="flex flex-col">
                      <InputForm
                        ref={passwordRef}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        status={validationStatus.password.status}
                        className="font-pretandard text-label"
                      />
                      <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                        {validationStatus.password.status !== 'empty' &&
                          validationStatus.password.message}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <InputForm
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Check Password"
                        status={validationStatus.confirmPassword.status}
                        className="font-pretandard text-label"
                      />
                      <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                        {validationStatus.confirmPassword.status !== 'empty' &&
                          validationStatus.confirmPassword.message}
                      </span>
                    </div>
                  </>
                )}
                <div className="mt-4">
                  {isLoading ? (
                    <ButtonPixel type="submit" disabled status="inactive">
                      <Spinner color="#ffffff" />
                    </ButtonPixel>
                  ) : (
                    <ButtonPixel type="submit" status="default">
                      {getButtonText(isFormChecked)}
                    </ButtonPixel>
                  )}
                </div>
                <div className="mt-12 flex justify-center whitespace-pre-wrap font-pretandard text-label">
                  <span>{'Already have an account? '}</span>
                  <Link href={RouteTo.Login}>
                    <span className="text-point-orange">Login here</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="mt-6 whitespace-pre-line text-center text-primary">
            {`회원가입을 위해
이메일 인증이 필요해요.`}
          </p>
          <div className="mt-12 flex w-full items-center border-b border-grayscale-800 py-4 outline-1">
            <div className="flex w-full flex-col gap-1 font-pretandard">
              <span className="text-body-secondary text-white">
                {'hyemione17@gmail.com'}
              </span>
              <span className="text-body-muted text-grayscale-400">
                {'해당 이메일로 인증번호를 전송할게요.'}
              </span>
            </div>
            <ButtonPixelCustom
              status="default"
              width={72}
              paddingX={16}
              paddingY={0}
              rounded={8}
            >
              Send
            </ButtonPixelCustom>
          </div>
          <div className="flex w-full gap-2 border-b border-grayscale-800 pb-6 pt-12 outline-1">
            <div className="flex w-full flex-col">
              <InputForm
                ref={AuthNumberRef}
                type="text"
                name="name"
                height={38}
                value={AuthNumberRef.current?.value || ''}
                onChange={handleChange}
                placeholder="인증번호 입력"
                status={validationStatus.name.status}
                className="font-pretandard text-label"
              />

              <span
                className={`mt-2 pl-2 text-[11px] ${isAuthNumberValid(AuthNumberRef.current?.value) ? 'text-success' : 'text-gray-400'}`}
              >
                {!isAuthNumberValid(AuthNumberRef.current?.value)
                  ? '인증번호는 최대 10분간만 유효해요.'
                  : '인증 완료!'}
              </span>
            </div>
            <ButtonPixelCustom
              status="default"
              width={72}
              height={38}
              paddingX={16}
              paddingY={8}
              rounded={8}
            >
              Verify
            </ButtonPixelCustom>
          </div>
          <div className="mt-16 flex w-full flex-col">
            <div className="flex w-full flex-col text-body-muted text-grayscale-600">
              <span className="text-[12px] font-semibold text-grayscale-400">
                인증 메일을 받지 못하셨나요?
              </span>
              <span>• 혹시 인증번호를 메일로 받지 못하셨나요?</span>
              <span className="ml-2">
                {' '}
                정확한 이메일 주소를 등록하셨는지 확인해주세요.
              </span>
              <span>
                • 잘못된 이메일 주소를 등록하셨다면 이메일 주소를 변경해주세요.
              </span>
            </div>
            <div className="mt-4">
              <ButtonPixelCustom
                status="default"
                width={129}
                height={24}
                paddingX={16}
                paddingY={12}
                rounded={8}
              >
                Change my Email
              </ButtonPixelCustom>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
