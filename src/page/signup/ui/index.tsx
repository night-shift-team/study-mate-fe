'use client';

import { useState } from 'react';
import {
  checkDuplicateEmailApi,
  checkDuplicateNicknameApi,
  signUpApi,
} from '../model/api';
import MoonLoader from 'react-spinners/MoonLoader';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    //TODO: 알람 대신 토스트 또는 텍스트로 변경 필요
    try {
      if (await checkNicknameDuplicate(formData.name)) {
        alert('이미 사용중인 닉네임입니다.');
        return;
      }
      if (await checkEmailDuplicate(formData.email)) {
        alert('이미 사용중인 이메일입니다.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const res = await signUpApi(formData);
      console.log(res);
    } catch (e) {
      console.error('회원가입 에러:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-[550px] flex-col justify-center gap-8 rounded-lg bg-white p-4 shadow-lg md:p-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-xl font-semibold">이메일 회원가입</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 확인해주세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                  required
                />
              </div>

              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="mt-4 flex h-[42px] w-full items-center justify-center rounded-lg bg-gray-400 text-white"
                >
                  <MoonLoader size={28} color="#ffffff" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-4 h-[42px] rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
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
