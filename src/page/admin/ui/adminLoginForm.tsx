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
      className="relative flex h-[70%] max-h-[15rem] w-full flex-col items-center justify-center gap-y-[4%]"
    >
      <input
        placeholder="ID"
        className="flex h-[25%] w-full rounded-3xl bg-[#d9d9d9] pl-[10%]"
        required
      ></input>
      <input
        placeholder="Password"
        className="flex h-[25%] w-full rounded-3xl bg-[#d9d9d9] pl-[10%]"
        required
      ></input>
      <button
        type="submit"
        className="flex aspect-square w-[20%] items-center justify-center rounded-full bg-[#f0edd4] hover:border-2 hover:border-[#ECCDB4] active:scale-[0.99] active:cursor-grabbing"
      >
        <FaArrowRightLong />
      </button>
    </form>
  );
};
export default AdminLoginForm;
