'use client';
import { changeNicknameApi } from '@/page/mypage/api';
import FormButtonPixel from '@/page/resetPassword/model/formStatus';
import { checkDuplicateNicknameApi } from '@/page/signup/api';
import InputForm from '@/shared/input/inputForm';
import { useState } from 'react';

import SignUpSuccess from '@public/assets/icons/login/signup-success.svg';
import ButtonPixel from '@/shared/button/buttonPixel';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/shared/state/userStore/model';

const MyPageChangeNicknamePage = () => {
  const [isDuplicated, setIsDuplicated] = useState<
    'duplicated' | 'ok' | 'error'
  >('ok');
  const [isChanged, setIsChanged] = useState<string | null>(null);
  const user = userStore.getState().user;
  const setUser = userStore.getState().setUser;

  const changeNickname = async (nickname: string) => {
    try {
      const res = await changeNicknameApi(nickname);
      if (res.ok && user) {
        setIsChanged(nickname);
        setUser({ ...user, nickname: nickname });
        return;
      }
      setIsChanged(null);
    } catch (e) {
      console.log(e);
      setIsChanged(null);
    }
  };

  const checkNickanmeDuplicate = async (nickname: string) => {
    try {
      const res = await checkDuplicateNicknameApi(nickname);
      if (res.payload) {
        setIsDuplicated('duplicated');
        return;
      }
      setIsDuplicated('ok');
      await changeNickname(nickname);
    } catch (e) {
      console.log(e);
      setIsDuplicated('error');
    }
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      {!isChanged ? (
        <>
          <span className="mt-6 whitespace-pre-line text-center font-pretandard">
            {`변경하고 싶은 닉네임을 입력해주세요.`}
          </span>
          <form
            action={async (formData) => {
              const nickname = formData.get('nickname');
              if (!nickname || typeof nickname !== 'string') return;
              await checkNickanmeDuplicate(nickname);
            }}
            className="w-full"
          >
            <InputForm
              type="text"
              status="empty"
              name="nickname"
              onChange={() => setIsDuplicated('ok')}
              placeholder="Enter your Nickname"
              className="mt-14 font-pretandard text-label"
            />
            {isDuplicated === 'duplicated' && (
              <span className="pl-1 text-[11px] text-error">
                이미 존재하는 닉네임입니다.
              </span>
            )}
            {isDuplicated === 'error' && (
              <span className="pl-1 text-[11px] text-error">
                일시적인 오류가 발생했습니다. 다시 시도해주세요.
              </span>
            )}
            <div className="mt-4">
              <FormButtonPixel buttonText="Change Nickname" />
            </div>
          </form>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center px-5">
          <div className="aspect-1 w-[70px]">
            <SignUpSuccess />
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center whitespace-nowrap text-body-primary">
            <p>{isChanged + ' 님!'} </p>
            <p>닉네임을 성공적으로 변경했어요.</p>
          </div>
          <Link href={RouteTo.Mypage} className="mt-16 w-full">
            <ButtonPixel status="default">Go to Mypage</ButtonPixel>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPageChangeNicknamePage;
