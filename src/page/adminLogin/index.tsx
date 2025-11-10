'use client';
import Logo from '@public/assets/backgroundImages/main/logo.svg';
import AdminLoginForm from './ui/adminLoginForm';
import AuthHoc from '@/shared/auth/model/authHoc';
import { useEffect } from 'react';

const AdminPage = () => {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', false);
  });

  return (
    <div className="relative flex w-full !min-w-[600px] flex-col items-center justify-center p-5 md:w-[80rem] md:flex-row md:p-0">
      <div className="flex w-full max-w-[30rem] items-end justify-center md:w-[50%] md:max-w-none md:justify-end md:p-[3rem]">
        <div className="relative flex aspect-1 w-[80%] rounded-full border-4 border-[#fafbe7]">
          <div className="flex h-full w-full items-end justify-center">
            <div className="mt-[22%]">
              <Logo />
            </div>
            <div className="flex h-fit w-fit font-serif text-[2rem]">ADMIN</div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center md:w-[50%] md:justify-start md:p-[3rem]">
        <AdminLoginForm />
      </div>
    </div>
  );
};
export default AuthHoc(AdminPage);
