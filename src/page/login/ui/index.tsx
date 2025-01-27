'use client';

import Logo from '@/assets/logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { LoginButton } from '@/entities';
import Link from 'next/link';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 여기에 실제 로그인 API 호출 로직 구현
      console.log('로그인 시도:', formData);
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (response.ok) {
      //   // 로그인 성공 처리
      // }
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[700px] flex-col justify-around gap-6 rounded-lg bg-white p-8 shadow-lg md:flex-row">
        <div className="flex justify-center md:items-center">
          <Image src={Logo} alt="" width={200} />
        </div>
        <div className="flex flex-col gap-10 sm:gap-6 md:w-[50%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex w-[100%] flex-col gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FEA1A1]"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
            >
              로그인
            </button>{' '}
            <Link href="/signup">
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-400 py-2 text-white transition-colors hover:bg-[#F0EDD4]"
              >
                아메일 회원가입{' '}
              </button>
            </Link>
            <Link href="/leveltest">
              <div className="cursor-pointer text-center text-sm text-gray-500 hover:text-gray-700">
                [로그인 없이 레벨 테스트 진행하기]
              </div>
            </Link>
          </form>

          <div className="flex flex-col justify-center gap-4">
            <div className="cursor-pointer text-center text-sm text-gray-700">
              SNS 계정으로 간단하게 시작하기!
            </div>
            <div className="flex justify-between">
              {LoginButton.map((item) => (
                <div
                  key={item.id}
                  className="flex cursor-pointer flex-col justify-center"
                >
                  <Image
                    src={item.img}
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <div className="text-center text-[1.3vh]">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
