'use client';
import ButtonPixel from '@/shared/button/buttonPixel';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/shared/state/userStore/model';
import SignUpSuccess from '@public/assets/icons/login/signup-success.svg';
import { useRouter } from 'next/navigation';

const SignUpComplete = () => {
  const { user } = userStore();
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5">
      <div className="aspect-1 w-[70px]">
        <SignUpSuccess />
      </div>
      <div className="mt-12 flex w-full flex-col items-center justify-center whitespace-nowrap text-body-primary">
        <p>{user?.nickname ? user?.nickname + ' 님' : ''} </p>
        <p>스터디메이트 가입을 완료했어요</p>
      </div>
      <div className="mt-16 w-full">
        <ButtonPixel
          onClick={() => router.push(RouteTo.Onboarding)}
          status="default"
        >
          Go to Next
        </ButtonPixel>
      </div>
    </div>
  );
};

export default SignUpComplete;
