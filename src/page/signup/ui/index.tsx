'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signUpUser,
  checkEmailDuplicate,
  checkNicknameDuplicate,
} from '../api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const [isNameChecked, setIsNameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNameCheck = async () => {
    try {
      await checkNicknameDuplicate(formData.name);
      alert('사용 가능한 닉네임입니다.');
      setIsNameChecked(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || '닉네임 중복 확인에 실패했습니다.');
      } else {
        alert('닉네임 중복 확인에 실패했습니다.');
      }
      setIsNameChecked(false);
    }
  };

  const handleEmailCheck = async () => {
    try {
      await checkEmailDuplicate(formData.email);
      alert('사용 가능한 이메일입니다.');
      setIsEmailChecked(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || '이메일 중복 확인에 실패했습니다.');
      } else {
        alert('이메일 중복 확인에 실패했습니다.');
      }
      setIsEmailChecked(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isNameChecked) {
      alert('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signUpUser(formData.email, formData.password, formData.name);
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || '회원가입에 실패했습니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-[550px] flex-col justify-center gap-8 rounded-lg bg-white p-2 shadow-lg md:p-4">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-xl font-semibold">이메일 회원가입</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">닉네임</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="닉네임을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNameCheck}
                  className="w-[20%] rounded-lg bg-gray-400 p-1 text-[2vh] text-white hover:bg-[#F0EDD4]"
                >
                  중복확인
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">이메일</label>
                <div className="flex gap-2">
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
                <button
                  type="button"
                  onClick={handleEmailCheck}
                  className="w-[20%] rounded-lg bg-gray-400 p-1 text-[2vh] text-white hover:bg-[#F0EDD4]"
                >
                  중복확인
                </button>
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

              <button
                type="submit"
                className="mt-4 rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
