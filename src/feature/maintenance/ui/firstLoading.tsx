import Image from 'next/image';
import Logo from '@public/assets/backgroundImages/main/logo.png';

export const FirstLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-fade-in">
        <Image src={Logo} alt="Logo" objectFit="contain" priority width={300} />
      </div>
    </div>
  );
};
