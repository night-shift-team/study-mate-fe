'use client';

import Link from 'next/link';
import AuthHoc from '@/shared/auth/model/authHoc';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import { LoginButton } from '../model/loginButtonMeta';
import useLoginPage from '../model/loginPageHook';
import InputForm from '@/shared/input/inputForm';
import { SvgIcon } from '@mui/material';
import ButtonPixel from '@/shared/button/buttonPixel';
import HomeLogo from '@public/assets/icons/header/mobile_logo.svg';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';

const LoginPage = () => {
  const {
    // Toaster,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    formData,
    handleChange,
    // hideTooltip,
    loginLoading,
    windowReference,
    validationStatus,
    handleGuestLogin,
    // animationClass,
  } = useLoginPage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-black dark:text-white">
      <div className="flex w-full flex-col justify-center">
        <SvgIcon
          component={HomeLogo}
          inheritViewBox
          sx={{ width: 'auto', height: '40px' }}
        />
        <span className="mt-6 text-center text-title-main">Sign In</span>

        <form
          id={'loginForm'}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4"
          noValidate
          autoComplete="off"
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
                className="mt-14 font-pretandard text-label"
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
                type="text"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  // if (passwordInputRef.current) {
                  //   hideTooltip(passwordInputRef.current);
                  // }
                }}
                onClick={(e) => e.currentTarget.focus()}
                placeholder="Password"
                className="password-hide font-pretandard text-label"
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
                <Link
                  href={RouteTo.ResetPassword}
                  className={`font-pretandard text-label ${'text-grayscale-600 hover:cursor-pointer hover:text-[#5761eb] hover:underline hover:underline-offset-4'}`}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ButtonPixel
              status="default"
              id="loginButton"
              type="submit"
              disabled={loginLoading}
              style={{
                backgroundColor: loginLoading ? '#D3D3D3' : '',
              }}
            >
              {loginLoading ? (
                <div className="mb-0">
                  <ComponentLoader color="#6b7280" />
                </div>
              ) : (
                'Sign In'
              )}
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
                onClick={async () => {
                  if (item.id === 2) {
                    await handleGuestLogin();
                    return;
                  }
                  openNewWindowWithoutDuplicate(windowReference, item.link);
                }}
                className="aspect-1 h-[44px]"
              >
                {item.id === 2 ? (
                  <div className="flex aspect-1 w-[44px] items-center justify-center rounded-full bg-grayscale-100">
                    <span className="text-[16px] font-bold text-grayscale-600">
                      Guest
                    </span>
                  </div>
                ) : (
                  <SvgIcon
                    component={item.img}
                    inheritViewBox
                    sx={{ width: 44, height: 44 }}
                  />
                )}

                <span className="font-pretandard text-sm">{item.title}</span>
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
