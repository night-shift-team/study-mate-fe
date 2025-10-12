'use client';
import NewHeader from '@/feature/header/ui/newheader';
import Link from 'next/link';
import LeftArrow from '@public/assets/icons/header/left_arrow.svg';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import HomeLogo from '@/feature/images/ui/homelogo';
import ButtonPixel from '@/shared/button/buttonPixel';
import { useState } from 'react';
import InputForm from '@/shared/input/inputForm';
import FormButtonPixel from '@/page/resetPassword/model/formStatus';
import Checked from '@public/assets/icons/changePassword/checked.svg';

const ChangePasswordPage = () => {
  //TODO: 유저 로그인 상태 확인
  const [changeClicked, setChangeClicked] = useState(false);
  const [formData, setFormData] = useState({
    prevPassword: '',
    newPassword: '',
    checkNewPassword: '',
  });
  const [prevPasswordConfirmed, setPrevPasswordConfirmed] = useState(true);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const passwordValidation = (value: string) => {
    const ASCII_UPPER_RE = /[A-Z]/;
    const ASCII_PUNCT_RE = /[!-\/:-@\[-`{-~]/; // ASCII punctuation ranges

    if (!value) return false;
    return ASCII_UPPER_RE.test(value) || ASCII_PUNCT_RE.test(value);
  };

  const confirmPrevPassword = async () => {
    try {
      //TODO: 이전 비밀번호 확인 api
    } catch (e) {
      console.log(e);
    }
  };

  const changePassword = async () => {
    try {
      //TODO: 비밀번호 변경 api
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormData) => {
    await confirmPrevPassword();
    // TODO: 이전 비밀번호 확인 실패 시 처리
    // setPrevPasswordConfirmed(false)
    // return
    await changePassword();
    // setChangeSuccess(true)
    // Link
  };

  return (
    <div className="flex h-full w-full flex-col items-center text-black dark:text-white">
      <NewHeader
        left={
          <Link href={RouteTo.Solve} className="h-5 w-5">
            <LeftArrow className="h-full w-full" />
          </Link>
        }
        center={<></>}
        right={<></>}
      />

      {!changeSuccess && !changeClicked && (
        <div className="flex h-full w-full flex-col justify-center px-4 pb-16">
          <HomeLogo />
          <span className="mt-20 whitespace-pre-line text-center font-pretandard text-body-primary">
            {`회원님의 계정 보안 강화를 위해
비밀번호 변경을 권장합니다.
아래 버튼을 눌러 지금 바로 변경해주세요.`}
          </span>
          <div className="mt-20">
            <ButtonPixel
              status="default"
              onClick={() => setChangeClicked(true)}
            >
              Change Password
            </ButtonPixel>
          </div>
        </div>
      )}

      {!changeSuccess && changeClicked && (
        <div className="mt-10 flex h-full w-full flex-col px-4">
          <HomeLogo />
          <form
            action={async (e) => await handleSubmit(e)}
            className="font-pretandard"
          >
            <h1 className="mt-8 text-center font-pixel text-title-main">
              Change Password
            </h1>

            <h6 className="mt-12 text-xs font-medium">
              이메일로 받은 현재 비밀번호를 작성해주세요.
            </h6>
            <InputForm
              type="text"
              status="empty"
              name="prev-password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, prevPassword: e.target.value })
              }
              className="password-hide mt-2 font-pretandard text-label"
            />

            <h6 className="mt-6 text-xs font-medium">
              신규 비밀번호를 입력해주세요.
            </h6>
            <InputForm
              type="text"
              status="empty"
              name="new-password"
              placeholder="New Password"
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="password-hide mt-2 font-pretandard text-label"
            />
            <p
              className={`mt-2 pl-1 text-[11px] ${formData.newPassword.length >= 6 ? 'text-success' : 'text-[#ED3241]'} `}
            >
              • 6글자 이상
            </p>
            <p
              className={`pl-1 text-[11px] ${passwordValidation(formData.newPassword) ? 'text-success' : 'text-[#ED3241]'}`}
            >
              • 영문 대문자 또는 특수문자 포함
            </p>

            <InputForm
              type="text"
              status="empty"
              name="confirm-new-password"
              placeholder="Check Password"
              onChange={(e) =>
                setFormData({ ...formData, checkNewPassword: e.target.value })
              }
              className="password-hide mt-4 font-pretandard text-label"
            />

            <div className="mt-6">
              <FormButtonPixel buttonText="Change" />
            </div>
          </form>
        </div>
      )}

      {changeSuccess && (
        <div className="flex h-full w-full flex-col items-center justify-center px-4 pb-16 text-center">
          <Checked className="w-[70px]" />
          <p className="mt-12 font-pretandard text-body-primary">
            비밀번호 변경을 완료했어요.
          </p>
          <Link href={RouteTo.Solve} className="mt-12 w-full">
            <ButtonPixel status="default">Go to Home</ButtonPixel>
          </Link>
        </div>
      )}
    </div>
  );
};
export default ChangePasswordPage;
