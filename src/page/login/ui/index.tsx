'use client';

import Link from 'next/link';
import AuthHoc from '@/shared/auth/model/authHoc';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import { LoginButton } from '../model/loginButtonMeta';
import useLoginPage from '../model/loginPageHook';
import InputForm from '@/shared/input/inputForm';
import { SvgIcon } from '@mui/material';
import ButtonPixel from '@/shared/button/buttonPixel';

const LoginPage = () => {
  const {
    Toaster,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    formData,
    handleChange,
    // hideTooltip,
    testToast,
    loginLoading,
    windowReference,
    validationStatus,
  } = useLoginPage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <Toaster />
      <span className="text-title-main">Sign In</span>
      <div className="flex w-full flex-col justify-center">
        <form
          id={'loginForm'}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4"
          noValidate
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-col">
              <InputForm
                ref={emailInputRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  // if (emailInputRef.current) {
                  //   hideTooltip(emailInputRef.current);
                  // }
                }}
                placeholder="Enter your Email"
                className="mt-20 font-pretandard text-label"
                status={validationStatus.email.status}
              />
              <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                {validationStatus.email.status !== 'empty' &&
                  validationStatus.email.message}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <InputForm
                ref={passwordInputRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  // if (passwordInputRef.current) {
                  //   hideTooltip(passwordInputRef.current);
                  // }
                }}
                placeholder="Password"
                className="font-pretandard text-label"
                status={validationStatus.password.status}
              />
              <span className="mt-2 pl-2 text-[11px] text-[#ED3241]">
                {validationStatus.password.status !== 'empty' &&
                  validationStatus.password.message}
              </span>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  disabled={true}
                  className="mr-2 aspect-1 h-[18px] items-center"
                  checked
                />
                <span className="font-pretandard text-label text-grayscale-600">
                  Remember me
                </span>
              </div>
              <div>
                <button
                  disabled={true}
                  className={`font-pretandard text-label ${
                    true
                      ? 'text-grayscale-600'
                      : 'text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    testToast();
                  }}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ButtonPixel
              status="default"
              id="loginButton"
              type="submit"
              disabled={loginLoading}
            >
              {loginLoading ? <Spinner color="#6b7280" /> : 'Sign In'}
            </ButtonPixel>{' '}
          </div>
        </form>

        <div className="mt-8 flex w-full flex-col justify-center">
          <span className="flex w-full justify-center font-pretandard text-label">
            Or
          </span>
          <div className="mt-4 flex w-full justify-center gap-4">
            {LoginButton.map((item) => (
              <button
                key={item.id}
                disabled={loginLoading}
                onClick={(e) => {
                  if (item.title != 'google') {
                    e.preventDefault();
                    testToast();
                    return;
                  }
                  openNewWindowWithoutDuplicate(windowReference, item.link);
                }}
                className="aspect-1 h-[44px]"
              >
                <SvgIcon
                  component={item.img}
                  inheritViewBox
                  sx={{ width: 44, height: 44 }}
                />
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center whitespace-pre-wrap font-pretandard text-label">
            <span>{"Don't have an account? "}</span>
            <Link
              href={loginLoading ? '#' : '/signup'}
              onClick={(e) => (loginLoading ? e.preventDefault() : null)}
            >
              <span className="text-point-orange">Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHoc(LoginPage);
