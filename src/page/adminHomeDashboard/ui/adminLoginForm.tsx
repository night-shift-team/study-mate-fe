'use client';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const AdminLoginForm = () => {
  const router = useRouter();

  const adminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hi');
    router.push('/admin/dashboard');
  };
  return (
    <form
      onSubmit={adminLogin}
      className="relative mt-[3rem] flex h-full w-[80%] flex-col items-start gap-y-[0.6rem] md:items-center md:justify-center md:gap-y-[1rem]"
    >
      <input
        placeholder="ID"
        className="flex h-[2.6rem] w-full rounded-3xl bg-[#d9d9d9] pl-[10%] md:h-[4rem]"
        required
      ></input>
      <input
        placeholder="Password"
        className="flex h-[2.6rem] w-full rounded-3xl bg-[#d9d9d9] pl-[10%] md:h-[4rem]"
        required
      ></input>
      <div className="mt-[0.5rem] flex w-full items-center justify-center md:mt-[1rem] md:w-[4rem]">
        <button
          type="submit"
          className="aspect-square flex w-[3.5rem] items-center justify-center rounded-full bg-[#f0edd4] hover:border-2 hover:border-[#ECCDB4] active:scale-[0.99] active:cursor-grabbing"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
};
export default AdminLoginForm;
