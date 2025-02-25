import Image from 'next/image';
import Logo from '@/assets/logo.png';
import AdminLoginForm from './adminLoginForm';

const Admin = () => {
  return (
    <div className="flex w-[80rem] min-w-[320px] flex-col items-center justify-center p-5 md:flex-row md:p-0">
      <div className="flex w-full max-w-[30rem] items-end justify-center md:w-[50%] md:max-w-none md:justify-end md:p-[3rem]">
        <div className="aspect-square relative flex w-[80%] rounded-full border-4 border-[#fafbe7]">
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
        <AdminLoginForm />
      </div>
    </div>
  );
};
export default Admin;
