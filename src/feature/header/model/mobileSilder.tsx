import React from 'react';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

interface MobileSliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileSlider: React.FC<MobileSliderProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-64 transform bg-white shadow-lg ${
        open ? 'translate-x-0' : 'translate-x-full'
      } z-50 transition-transform duration-300 ease-in-out`}
    >
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between border-b bg-[rgb(254,202,202)] p-4 text-white">
        <h2 className="text-lg font-bold">메뉴</h2>
        <IoClose
          className="cursor-pointer text-2xl transition-colors hover:text-gray-200"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* 메뉴 내용 */}
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        <Link
          href={RouteTo.Mypage}
          className="text-lg font-medium text-gray-700"
          onClick={() => setOpen(false)}
        >
          마이페이지
        </Link>

        <button
          className="text-lg font-medium text-gray-700"
          onClick={() => {
            localStorage.removeItem('accessToken');
            setOpen(false);
            window.location.href = RouteTo.Home;
          }}
        >
          로그아웃
        </button>
      </div>

      {/* 하단 데코레이션 */}
      <div className="absolute bottom-0 w-full border-t bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-500">© 2025 studymatye</p>
      </div>
    </div>
  );
};

export default MobileSlider;
