'use client';
import HomeLogo from '@/feature/images/ui/homelogo';
import ButtonPixel from '@/shared/button/buttonPixel';
import InputForm from '@/shared/input/inputForm';
import { sendResetPasswordEmailApi } from '../api';
import { useState } from 'react';
import { SvgIcon } from '@mui/material';
import EmailIcon from '@public/assets/icons/resetPassword/email.svg';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import NewHeader from '@/feature/header/ui/newheader';
import LeftArrow from '@public/assets/icons/header/left_arrow.svg';
import FormButtonPixel from '../model/formStatus';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>();

  const sendPasswordResetLink = async (formData: FormData) => {
    const email = formData.get('email');
    if (!email || typeof email !== 'string') return;
    try {
      const res = await sendResetPasswordEmailApi(email);
      if (res.ok) {
        setEmail(email);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex h-full w-full flex-col items-center px-4 text-black dark:text-white">
      <NewHeader
        left={
          <Link href={RouteTo.Home} className="h-5 w-5">
            <LeftArrow className="h-full w-full" />
          </Link>
        }
        center={<></>}
        right={<></>}
      />
      <div className="mt-16 flex h-full w-full flex-col">
        {!email ? (
          <div className="flex w-full flex-col justify-center">
            <HomeLogo />
            <span className="mt-6 whitespace-pre-line text-center font-pretandard">
              {`스터디메이트에 가입했던 이메일을 입력해주세요
비밀번호 재설정 메일을 보내드립니다.`}
            </span>
            <form action={async (e) => await sendPasswordResetLink(e)}>
              <InputForm
                type="email"
                status="empty"
                name="email"
                placeholder="Enter your Email"
                className="mt-14 font-pretandard text-label"
              />
              <div className="mt-4">
                <FormButtonPixel buttonText="Send Reset Link" />
              </div>
            </form>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-center">
            <SvgIcon
              component={EmailIcon}
              inheritViewBox
              sx={{ width: 'auto', height: '40px' }}
            />
            <div className="mt-6 w-full font-pretandard">
              <span className="line-[28px] text-[20px] text-point-orange">
                {email}
              </span>
              <p className="mt-2 text-body-primary">{`비밀번호 재설정 메일이 발송되었습니다.`}</p>
              <div className="mt-20 w-full">
                <Link href={RouteTo.Home} className="w-full">
                  <ButtonPixel status="default">Okay</ButtonPixel>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;
