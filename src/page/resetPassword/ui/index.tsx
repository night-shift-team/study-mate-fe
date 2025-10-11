import HomeLogo from '@/feature/images/ui/homelogo';
import ButtonPixel from '@/shared/button/buttonPixel';
import InputForm from '@/shared/input/inputForm';

const ResetPasswordPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-black dark:text-white">
      <div className="flex w-full flex-col justify-center">
        <HomeLogo />
        <span className="mt-6 whitespace-pre-line text-center font-pretandard">
          {`스터디메이트에 가입했던 이메일을 입력해주세요
비밀번호 재설정 메일을 보내드립니다.`}
        </span>
        <InputForm
          type="email"
          status="empty"
          name="email"
          placeholder="Enter your Email"
          className="mt-14 font-pretandard text-label"
        />
        <div className="mt-4">
          <ButtonPixel type="button" status="default">
            Send Email
          </ButtonPixel>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
