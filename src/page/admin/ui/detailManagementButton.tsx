'use client';

import { useRouter } from 'next/navigation';

export const DetailManagementButton = ({
  title,
  buttonText,
}: {
  title: string;
  buttonText: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex h-[10%] w-full flex-shrink-0 items-center justify-between text-[3vh]">
      <span>{title}</span>
      <button
        onClick={() => {
          if (title === '유저 관리') router.push('/admin/management/user');
          else if (title === '문제 관리')
            router.push('/admin/management/problem');
        }}
        className="flex h-[50%] w-fit items-center justify-center rounded-2xl border border-black px-[3%] pt-[0.4%] text-[2vh] font-semibold hover:border-2 hover:border-none hover:border-[#9f8b7a] hover:bg-[#ECCDB4] hover:text-white active:scale-[0.99] active:cursor-grabbing"
      >
        {buttonText}
      </button>
    </div>
  );
};
