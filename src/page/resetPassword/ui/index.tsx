'use client';
import HomeLogo from '@/feature/images/ui/homelogo';
import ButtonPixel, { ButtonPixelCustom } from '@/shared/button/buttonPixel';
import InputForm from '@/shared/input/inputForm';
import { sendResetPasswordEmailApi, verifyResetPasswordCodeApi } from '../api';
import { useState } from 'react';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

import FormButtonPixel from '../model/formStatus';
import { checkDuplicateEmailApi } from '@/page/signup/api';
import { SvgIcon } from '@mui/material';
import EmailIcon from '@public/assets/icons/resetPassword/email.svg';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>();
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);

  const checkDuplicateEmail = async (email: string) => {
    try {
      const res = await checkDuplicateEmailApi(email);
      if (res.payload) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const emailChecked = async (email: string) => {
    const isEmailValid = await checkDuplicateEmail(email);
    if (isEmailValid) {
      setEmail(email);
      return;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center text-black dark:text-white">
      <div className="flex h-full w-full flex-col justify-center px-4 pb-16">
        <div className="flex w-full flex-col justify-center">
          {!isPasswordResetSuccess && !email && (
            <>
              <HomeLogo />

              <span className="mt-6 whitespace-pre-line text-center font-pretandard">
                {`스터디메이트에 가입했던 이메일을 입력해주세요
비밀번호 재설정 메일을 보내드립니다.`}
              </span>
              <form
                action={async (formData) => {
                  const mail = formData.get('email');
                  if (!mail || typeof mail !== 'string') return;
                  await emailChecked(mail);
                }}
              >
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
            </>
          )}
          {!isPasswordResetSuccess && email && (
            <>
              <HomeLogo />

              <ResetPasswordAuthCodeForm
                email={email}
                setEmail={setEmail}
                setIsPasswordResetSuccess={setIsPasswordResetSuccess}
              />
            </>
          )}
          {isPasswordResetSuccess && (
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
                <p className="mt-2 whitespace-pre-line text-body-primary">{`비밀번호 초기화가 완료되었습니다.
이메일로 전송된 임시 비밀번호로 로그인 해 주세요.
`}</p>
                <div className="mt-20 w-full">
                  <Link href={RouteTo.Login}>
                    <ButtonPixel status="default">Login</ButtonPixel>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;

const ResetPasswordAuthCodeForm = ({
  email,
  setEmail,
  setIsPasswordResetSuccess,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsPasswordResetSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isResetRquestSuccess, setIsResetRequestSuccess] =
    useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<boolean>();

  const handleSendEmail = async (mail: string) => {
    try {
      setIsFetching(true);
      const res = await sendResetPasswordEmailApi(mail);
      if (res.ok) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      setIsFetching(false);
    }
  };

  const verifyAuthNumber = async (email: string, code: string) => {
    try {
      const res = await verifyResetPasswordCodeApi(email, code);
      if (res.ok) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleResetAuthCode = async (email: string, code: string) => {
    const isAuthNumberVerified = await verifyAuthNumber(email, code);
    if (isAuthNumberVerified) {
      setValidationStatus(true);
      setIsFetching(false);
      return;
    }
    setValidationStatus(false);
    setIsFetching(false);
  };
  const handleNext = () => {
    setIsPasswordResetSuccess(true);
  };
  console.log(
    'isFetching',
    isFetching,
    'validationStatus:',
    validationStatus,
    'reset',
    isResetRquestSuccess
  );

  return (
    <>
      <p className="mt-6 whitespace-pre-line text-center text-primary">
        {`비밀번호 초기화를 위해
이메일 인증이 필요해요.`}
      </p>
      <div className="mt-12 flex w-full items-center border-b border-grayscale-800 py-4 outline-1">
        <div className="flex w-full flex-col gap-1 font-pretandard">
          <span className="text-body-secondary text-white">{email}</span>
          <span className="text-body-muted text-grayscale-400">
            {'해당 이메일로 인증번호를 전송할게요.'}
          </span>
        </div>
        <ButtonPixelCustom
          status={isResetRquestSuccess || isFetching ? 'inactive' : 'default'}
          paddingX={16}
          paddingY={0}
          rounded={8}
          onClick={async () => {
            const success = await handleSendEmail(email);
            if (success) {
              setIsResetRequestSuccess(true);
            }
          }}
        >
          {!isFetching && !isResetRquestSuccess && 'Send'}
          {isFetching && !isResetRquestSuccess && <ComponentLoader size="xs" />}
          {isResetRquestSuccess && 'Completed!'}
        </ButtonPixelCustom>
      </div>
      {isResetRquestSuccess && (
        <>
          <form
            action={async (e) => {
              const authNumber = e.get('emailAuthNumber');
              if (!authNumber || typeof authNumber !== 'string') {
                setIsFetching(false);
                return;
              }
              await handleResetAuthCode(email, authNumber);
            }}
            autoComplete="off"
            className="flex w-full gap-2 border-b border-grayscale-800 pb-6 pt-12 outline-1"
          >
            <div className="flex w-full flex-col">
              <InputForm
                type="text"
                name="emailAuthNumber"
                height={38}
                onChange={() => setValidationStatus(undefined)}
                placeholder="인증번호 입력"
                status={validationStatus ? 'filled' : 'typing'}
                className="font-pretandard text-label"
              />

              <span
                className={`mt-2 pl-2 text-[11px] ${validationStatus ? 'text-success' : validationStatus === undefined ? 'text-gray-400' : 'text-error'}`}
              >
                {validationStatus === undefined &&
                  '인증번호는 최대 5분간만 유효해요.'}
                {validationStatus === false && '인증번호가 일치하지 않습니다.'}
                {validationStatus === true && '인증 완료!'}
              </span>
            </div>
            <ButtonPixelCustom
              status={validationStatus || isFetching ? 'inactive' : 'default'}
              height={38}
              paddingX={16}
              paddingY={8}
              rounded={8}
              disabled={validationStatus}
              onClick={() => setIsFetching(true)}
            >
              {!isFetching && !validationStatus && 'Verify'}
              {isFetching && !validationStatus && (
                <div className="mt-0">
                  <ComponentLoader size="xs" />
                </div>
              )}
              {!isFetching && validationStatus && 'Completed!'}
            </ButtonPixelCustom>
          </form>
          <div className="mt-16 flex w-full flex-col">
            <div className="flex w-full flex-col text-body-muted text-grayscale-600">
              <span className="text-[12px] font-semibold text-grayscale-400">
                인증 메일을 받지 못하셨나요?
              </span>
              <span>• 혹시 인증번호를 메일로 받지 못하셨나요?</span>
              <span className="ml-2">
                {' '}
                정확한 이메일 주소를 등록하셨는지 확인해주세요.
              </span>
              <span>
                • 잘못된 이메일 주소를 등록하셨다면 이메일 주소를 변경해주세요.
              </span>
            </div>
            <div className="mt-4">
              <ButtonPixelCustom
                status="default"
                width={129}
                height={24}
                paddingX={16}
                paddingY={12}
                rounded={8}
                onClick={() => {
                  setEmail(undefined);
                  setIsResetRequestSuccess(false);
                }}
              >
                Change my Email
              </ButtonPixelCustom>
            </div>
          </div>
        </>
      )}
      {validationStatus && (
        <div className="mt-12 w-full">
          <ButtonPixel status="default" onClick={handleNext}>
            Confirm
          </ButtonPixel>
        </div>
      )}
    </>
  );
};
