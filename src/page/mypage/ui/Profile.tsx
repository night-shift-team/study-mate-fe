'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';

import { ProfileImage } from '@/shared/user/ui/profileImage';
import Button from '@/shared/design/ui/customButton';
import useProfile from '../model/profileHook';
import { ToastType } from '@/shared/toast/model/toastHook';
import Level1Icon from '@public/assets/icons/character/Lv1.svg';
import ArrowIcon from '@public/assets/icons/button/check/Polygon.svg';
import { SvgIcon } from '@mui/material';

const Profile = () => {
  const {
    Toaster,
    imageUrl,
    user,
    newNickname,
    setNewNickname,
    handleNicknameChange,
    isModalOpen,
    setIsModalOpen,
    isPending,
    errorMessage,
  } = useProfile();
  return (
    <div className="flex gap-16p font-pixel">
      {/* Toast 컴포넌트 */}
      <Toaster status={ToastType.success} />

      {/* 프로필 이미지 */}
      <label htmlFor="profile-upload" className="">
        <div className="flex h-[12vh] w-[12vh]">
          <div className="">
            <SvgIcon
              inheritViewBox
              component={Level1Icon}
              sx={{ width: '100%', height: '100%' }}
            />
          </div>
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
      <div className="flex flex-col">
        <div className="text-white">
          {user ? (
            <p className="text-[32px] font-bold">{user.nickname}</p>
          ) : null}
        </div>
        <button
          className="flex gap-2 text-[20px] font-bold text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Nickname
          <div className="h-[15px] w-[15px]">
            <SvgIcon
              inheritViewBox
              component={ArrowIcon}
              sx={{ width: '100%', height: '100%' }}
            />
          </div>
        </button>
      </div>

      {/* 닉네임 변경 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-[90%] rounded bg-white p-5 shadow-lg md:w-[30rem]">
            <h2 className="ml-1 text-base font-semibold">변경할 닉네임</h2>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="mt-2 w-full rounded border p-2 font-spoqa"
              placeholder="새 닉네임을 입력하세요"
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button
                size="xxs"
                rounded={true}
                className="rounded-full bg-gray-300 pl-[0.05rem] pt-0.5 font-mono text-[0.8rem] font-medium"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                size="xxs"
                rounded={true}
                className="bg-blue-500 pl-[0.05rem] pt-0.5 font-mono text-[0.8rem] font-medium text-white"
                onClick={handleNicknameChange}
              >
                {isPending ? (
                  <Spinner size={'xs'} color="#fff" />
                ) : (
                  <span>변경</span>
                )}
              </Button>
            </div>
            {errorMessage && (
              <div className="text-sm text-red-500">{errorMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
