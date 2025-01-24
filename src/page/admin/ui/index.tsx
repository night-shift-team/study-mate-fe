import Image from 'next/image';
import Logo from '@/assets/logo.png';
import AdminLoginForm from './adminLoginForm';

const Admin = () => {
  return (
    <div className="flex h-full w-full max-w-[50rem] justify-center">
      <div className="flex h-[80%] w-[50%] items-center justify-center p-[5%] pt-[15%]">
        <div className="relative flex aspect-square w-[90%] rounded-full border-4 border-[#fafbe7]">
          <div className="absolute -bottom-[20%] -left-[10%] flex h-full w-[120%] items-end justify-center">
            <Image src={Logo} alt="" fill objectFit="contain" />
            <div className="flex h-fit w-fit font-serif text-[4vh]">ADMIN</div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-[50%] items-center justify-center p-[5%] pt-[10%]">
        <AdminLoginForm />
      </div>
    </div>
  );
};
export default Admin;
