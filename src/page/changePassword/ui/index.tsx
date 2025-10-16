'use client';
import NewHeader from '@/feature/header/ui/newheader';
import Link from 'next/link';
import LeftArrow from '@public/assets/icons/header/left_arrow.svg';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import HomeLogo from '@/feature/images/ui/homelogo';
import ButtonPixel from '@/shared/button/buttonPixel';
import { useEffect, useState } from 'react';
import Checked from '@public/assets/icons/changePassword/checked.svg';
import { UserInfo } from '@/shared/user/model/userInfo.types';
import { toastStore, ToastType } from '@/shared/state/toast/toastStore';
import { useRouter } from 'next/navigation';
import ChangePasswordForm from './changePWform';

const ChangePasswordPage = ({ user }: { user: UserInfo | null }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toastStore.show({
        status: ToastType.warning,
        title: '로그인이 이후 진행해주세요.',
      });
      router.push(RouteTo.Home);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  // 첫 화면 버튼 클릭 용도 변수
  const [changeClicked, setChangeClicked] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);

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
          <ChangePasswordForm
            loginId={user.loginId}
            setChangeSuccess={setChangeSuccess}
          />
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
