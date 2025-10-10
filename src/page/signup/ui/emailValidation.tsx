import ButtonPixel, { ButtonPixelCustom } from '@/shared/button/buttonPixel';
import InputForm from '@/shared/input/inputForm';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { SignUpFormData } from '.';
import { sendSignUpEmailVerificationApi } from '../api';

const EmailValidationPage = ({
  ref: AuthNumberRef,
  email,
  setIsEmailAuthComplete,
  checkEmailAuthFunc: isAuthNumberValid,
  resetEmail,
  resetEmailChcked,
}: {
  ref: RefObject<HTMLInputElement | null>;
  email: string;
  setIsEmailAuthComplete: Dispatch<SetStateAction<boolean>>;
  checkEmailAuthFunc: (value: string | undefined) => Promise<boolean>;
  resetEmail: Dispatch<SetStateAction<SignUpFormData>>;
  resetEmailChcked: Dispatch<
    SetStateAction<{
      nickname: boolean;
      email: boolean;
      password: boolean;
    }>
  >;
}) => {
  const [isSendButtonClicked, setIsSendButtonClicked] = useState(false);
  const [authNumber, setAuthNumber] = useState('');
  const [validationStatus, setValidationStatus] = useState<boolean>();

  const handleSendEmail = async (email: string) => {
    try {
      //TODO: 이메일 전송 api
      const res = await sendSignUpEmailVerificationApi(email);
      if (res.ok) {
        setIsSendButtonClicked(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 상태 정의
  // 1. 제출 전
  // 2. 틀린 후
  // 3. 성공 후
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authNumber.length === 0) {
      setValidationStatus(undefined);
      return;
    }
    const isSuccess = await isAuthNumberValid(authNumber);
    if (isSuccess) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false);
    }
  };

  const handleNext = () => {
    setIsEmailAuthComplete(true);
  };
  return (
    <>
      <p className="mt-6 whitespace-pre-line text-center text-primary">
        {`회원가입을 위해
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
          status={isSendButtonClicked ? 'inactive' : 'default'}
          paddingX={16}
          paddingY={0}
          rounded={8}
          onClick={async () => await handleSendEmail(email)}
        >
          {isSendButtonClicked ? 'Completed!' : 'Send'}
        </ButtonPixelCustom>
      </div>
      {isSendButtonClicked && (
        <>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex w-full gap-2 border-b border-grayscale-800 pb-6 pt-12 outline-1"
          >
            <div className="flex w-full flex-col">
              <InputForm
                ref={AuthNumberRef}
                type="text"
                name="emailAuthNumber"
                height={38}
                onChange={(e) => {
                  setAuthNumber(e.target.value);
                }}
                value={AuthNumberRef.current?.value || ''}
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
              status={validationStatus ? 'inactive' : 'default'}
              height={38}
              paddingX={16}
              paddingY={8}
              rounded={8}
              disabled={validationStatus}
            >
              {validationStatus ? 'Completed!' : 'Verify'}
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
                  resetEmail((prev) => ({ ...prev, email: '' }));
                  resetEmailChcked((prev) => ({ ...prev, email: false }));
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
            Next
          </ButtonPixel>
        </div>
      )}
    </>
  );
};
export default EmailValidationPage;
