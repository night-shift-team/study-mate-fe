'use client';
import Logo from '@public/assets/backgroundImages/main/studyMate_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import AuthHoc from '@/shared/auth/model/authHoc';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';
import { LoginButton } from '../model/loginButtonMeta';
import useLoginPage from '../model/loginPageHook';

const LoginPage = () => {
  const {
    Toaster,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    formData,
    handleChange,
    hideTooltip,
    testToast,
    loginLoading,
    windowReference,
  } = useLoginPage();

  return (
    <div className="relative z-[1000] flex h-full w-full animate-fade-in flex-col items-center overflow-hidden overflow-y-auto bg-white/60 duration-300 scrollbar-hide md:flex-row md:justify-center md:bg-transparent md:pb-[4rem]">
      <Toaster />
      <div className="md:inner-border-left nd:shadow-xl flex h-full w-full max-w-[900px] flex-col justify-evenly bg-white/60 px-8 py-3 md:h-auto md:flex-row md:justify-around md:gap-6 md:rounded-[1rem] md:border md:p-8">
        <div className="flex flex-col justify-center md:items-center">
          {/* <PushNotificationButton /> */}
          <Image
            src={Logo}
            alt=""
            className="h-[20vh] w-[20vh] md:h-[240px] md:w-[240px]"
          />
          <div className="flex w-full flex-col">
            <span className="text-lg font-bold text-pointcolor-apricot md:text-2xl">
              Study Mate
            </span>
            <span className="mt-1 break-words text-sm md:max-w-[240px] md:text-base">
              Online platform for solving computer science problems and
              enhancing learning.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 md:w-[50%] md:gap-10">
          <span className="font-doodle text-xl font-bold md:text-3xl">
            Welcome
          </span>
          <form
            id={'loginForm'}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 md:gap-4"
            noValidate
          >
            <div className="flex w-[100%] flex-col">
              <span className="text-[0.8rem]">Email</span>

              <input
                ref={emailInputRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  if (emailInputRef.current) {
                    hideTooltip(emailInputRef.current);
                  }
                }}
                placeholder="이메일"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
              <span className="mt-2 text-[0.8rem]">Password</span>
              <input
                ref={passwordInputRef}
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  if (passwordInputRef.current) {
                    hideTooltip(passwordInputRef.current);
                  }
                }}
                placeholder="비밀번호"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />

              <div className="mt-4 flex w-full justify-between">
                <div>
                  <input
                    type="checkbox"
                    disabled={true}
                    className="mr-2"
                    checked
                  />
                  <span className="text-[0.8rem]">로그인 상태 유지</span>
                </div>
                <div>
                  <button
                    disabled={true}
                    className={`text-[0.8rem] font-bold ${
                      true
                        ? 'text-gray-400'
                        : 'text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      testToast();
                    }}
                  >
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </div>
            <button
              id="loginButton"
              type="submit"
              disabled={loginLoading}
              className={`text-balck flex h-[2.5rem] w-full items-center justify-center rounded-lg bg-pointcolor-sand/80 py-1 text-gray-600 transition-colors inner-border-pointcolor-beigebrown hover:text-black md:py-2 ${loginLoading ? 'hover:none' : 'hover:inner-border-[1.2px]'}`}
            >
              {loginLoading ? <Spinner color="#6b7280" /> : '로그인'}
            </button>{' '}
          </form>

          <div className="flex w-full flex-col justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#fcfdf6] px-2 text-xs text-gray-500 md:text-sm">
                  간편 로그인
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center gap-4">
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
                  className="flex h-[4rem] w-1/3 cursor-pointer flex-col justify-center md:h-[5rem]"
                >
                  <div className="flex w-full justify-center rounded-md border py-1">
                    <Image
                      src={item.img}
                      alt=""
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-0.5 flex justify-center whitespace-pre-wrap text-[0.8rem]">
              <span>계정이 없으신가요? </span>
              <Link
                href={loginLoading ? '#' : '/signup'}
                onClick={(e) => (loginLoading ? e.preventDefault() : null)}
              >
                <span className="font-bold text-[#5761eb] hover:cursor-pointer hover:underline hover:underline-offset-4">
                  회원가입
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHoc(LoginPage);
