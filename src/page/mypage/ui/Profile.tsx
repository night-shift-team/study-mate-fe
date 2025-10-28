'use client';

import useProfile from '../model/profileHook';
import Level1Icon from '@public/assets/icons/character/Lv1.svg';
import ArrowIcon from '@public/assets/icons/button/check/Polygon.svg';
import { SvgIcon } from '@mui/material';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const Profile = () => {
  const { user } = useProfile();
  return (
    <div className={`flex gap-16p font-pixel`}>
      {/* 프로필 이미지 */}
      <label htmlFor="profile-upload" className="">
        <div className="flex h-[12vh] w-[12vh]">
          <SvgIcon
            inheritViewBox
            component={Level1Icon}
            sx={{ width: '100%', height: '100%' }}
          />
        </div>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={() => {}}
          className="hidden"
        />
      </label>

      {/* 닉네임 및 버튼 */}
      <div className="flex flex-col gap-3">
        <div className="text-black dark:text-white">
          {user ? (
            <p className="text-title-page font-bold">{user.nickname}</p>
          ) : null}
        </div>
        <Link
          href={RouteTo.MyPageChangeNickname}
          className="flex gap-2 text-button-1 font-bold text-black dark:text-white"
        >
          Edit Nickname
          <span className="relative h-[15px] w-[15px]">
            <SvgIcon
              className="absolute left-0 top-0 h-[15px] w-[15px] fill-black dark:fill-white"
              component={ArrowIcon}
              inheritViewBox
              sx={{ width: '15px', height: '15px' }}
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
