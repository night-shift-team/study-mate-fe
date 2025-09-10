'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import useSignUpPage from '../model/signUpPageHook';
import InputForm from '@/shared/input/inputForm';
import ButtonPixel from '@/shared/button/buttonPixel';
import Link from 'next/link';

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
  } = useSignUpPage();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4">
      {/* <Toaster /> */}

      <span className="text-title-main">Register</span>
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
            <div className="mt-4">
              {isLoading ? (
                <ButtonPixel type="submit" disabled status="inactive">
                  <Spinner color="#ffffff" />
                </ButtonPixel>
              ) : (
                <ButtonPixel type="submit" status="default">
                  Sign Up
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
    </div>
  );
};

export default SignUpPage;
