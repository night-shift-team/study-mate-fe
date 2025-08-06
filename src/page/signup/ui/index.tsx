'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { PopupConfirm } from '@/shared/popUp/ui/popupV2';
import useSignUpPage from '../model/signUpPageHook';
import InputForm from '@/shared/input/inputForm';
import ButtonPixel from '@/shared/button/buttonPixel';

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
    Toaster,
    popupOpen,
    router,
    handleSubmit,
    isLoading,
  } = useSignUpPage();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4">
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
      <span className="text-title-main">Register</span>
      <div className="mt-12 flex w-full flex-col gap-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px]"
          noValidate
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <InputForm
                ref={nameRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nickname"
                status="empty"
                className="font-pretandard text-label"
              />
            </div>

            <div className="flex flex-col gap-2">
              <InputForm
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                status="empty"
                className="font-pretandard text-label"
              />
            </div>

            <div className="flex flex-col gap-2">
              <InputForm
                ref={passwordRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                status="empty"
                className="font-pretandard text-label"
              />
            </div>

            <div className="flex flex-col gap-2">
              <InputForm
                ref={confirmPasswordRef}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Check Password"
                status="empty"
                className="font-pretandard text-label"
              />
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
