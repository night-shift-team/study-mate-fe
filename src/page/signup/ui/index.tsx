'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { PopupConfirm } from '@/shared/popUp/ui/popupV2';
import useSignUpPage from '../model/signUpPageHook';

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

export default SignUpPage;
