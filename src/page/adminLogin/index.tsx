'use client';
import Image from 'next/image';
import Logo from '@public/assets/logo.png';
import AdminLoginForm from './ui/adminLoginForm';
import { useState } from 'react';
import useToast from '@/shared/toast/toast';
import AuthHoc from '@/shared/auth/model/authHoc';

const AdminPage = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const { Toaster, setToastDescription, setToastIcon } = useToast(
    toastOpen,
    setToastOpen
  );
  //TODO: 로그인 상태 일 시 로그아웃
  console.log(toastOpen);
  return (
    <div className="relative flex w-full min-w-[320px] flex-col items-center justify-center p-5 md:w-[80rem] md:flex-row md:p-0">
      <Toaster />
      <div className="flex w-full max-w-[30rem] items-end justify-center md:w-[50%] md:max-w-none md:justify-end md:p-[3rem]">
        <div className="relative flex aspect-1 w-[80%] rounded-full border-4 border-[#fafbe7]">
          <div className="flex h-full w-full items-end justify-center">
            <Image
              src={Logo}
              alt="Logo"
              className="mt-[22%]"
              fill
              objectFit="contain"
              priority
            />
            <div className="flex h-fit w-fit font-serif text-[2rem]">ADMIN</div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center md:w-[50%] md:justify-start md:p-[3rem]">
        <AdminLoginForm
          open={toastOpen}
          setOpen={setToastOpen}
          setToastText={setToastDescription}
          setToastIcon={setToastIcon}
        />
      </div>
    </div>
  );
};
export default AuthHoc(AdminPage);
