import React from 'react';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import Image from 'next/image';
import RankingIcon from '@public/assets/icons/ranking-factor.png';
import MypageIcon from '@public/assets/icons/user.png';
import AnnouncementIcon from '@public/assets/icons/announcement.png';
import { MdLogout } from 'react-icons/md';

interface MobileSliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileSlider: React.FC<MobileSliderProps> = ({ open, setOpen }) => {
  const { setUser } = userStore();
  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-full max-h-[100vh] w-full transform flex-col bg-white text-xs ${
        open ? 'translate-x-0 shadow-2xl drop-shadow-lg' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {/* 상단 헤더 */}
      <div className="relative flex h-[3.2rem] w-full items-center justify-between border-b bg-pointcolor-coral/100 p-4 text-white">
        <h2 className="flex w-full justify-center font-spoqa text-lg font-bold">
          Menu
        </h2>
        <IoClose
          className="absolute right-5 cursor-pointer text-2xl transition-colors hover:text-gray-200"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* 메뉴 내용 */}
      <div className="flex flex-1 flex-col items-center justify-between p-6 font-doodle">
        <div className="flex flex-col gap-5">
          <Link
            href={RouteTo.Announcement}
            className="flex items-center justify-center gap-2 font-medium text-gray-700"
            onClick={() => setOpen(false)}
          >
            <Image
              src={AnnouncementIcon}
              alt="announcement"
              width={24}
              height={24}
            />{' '}
            공지사항
          </Link>
          <Link
            href={RouteTo.Rank}
            className="flex items-center justify-center gap-2 font-medium text-gray-700"
            onClick={() => setOpen(false)}
          >
            <Image src={RankingIcon} alt="ranking" width={24} height={24} />
            랭킹
          </Link>
          <Link
            href={RouteTo.Mypage}
            className="flex items-center justify-center gap-2 font-medium text-gray-700"
            onClick={() => setOpen(false)}
          >
            <Image src={MypageIcon} alt="mypage" width={24} height={24} />내
            정보
          </Link>
        </div>

        <button
          className="flex items-center justify-center gap-2 font-doodle font-medium text-gray-700"
          onClick={() => {
            setUser(null);
            setOpen(false);
            window.location.href = RouteTo.Login;
          }}
        >
          <MdLogout size={24} /> 로그아웃
        </button>
      </div>

      {/* 하단 데코레이션 */}
      <div className="flex h-[4rem] w-full justify-center border-t bg-gray-100 py-4">
        <p className="text-sm text-gray-500">© 2025 studymatye</p>
      </div>
    </div>
  );
};

export default MobileSlider;
