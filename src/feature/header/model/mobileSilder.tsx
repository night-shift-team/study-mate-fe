import React from 'react';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import Image from 'next/image';
import RankingIcon from '@/assets/icons/ranking-factor.png';
import MypageIcon from '@/assets/icons/user.png';
import AnnouncementIcon from '@/assets/icons/announcement.png';
import { MdLogout } from 'react-icons/md';

interface MobileSliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileSlider: React.FC<MobileSliderProps> = ({ open, setOpen }) => {
  const { setUser } = userStore();
  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg ${
        open ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between border-b bg-[rgb(254,202,202)] p-4 text-white">
        <h2 className="font-spoqa text-lg font-bold">Menu</h2>
        <IoClose
          className="cursor-pointer text-2xl transition-colors hover:text-gray-200"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* 메뉴 내용 */}
      <div className="flex h-[85%] flex-col items-center justify-between gap-6 p-6 font-doodle">
        <div className="flex flex-col gap-4">
          <Link
            href={RouteTo.Anouncement}
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
            <Image src={MypageIcon} alt="mypage" width={24} height={24} />
            마이 페이지
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
      <div className="absolute bottom-0 w-full border-t bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-500">© 2025 studymatye</p>
      </div>
    </div>
  );
};

export default MobileSlider;
