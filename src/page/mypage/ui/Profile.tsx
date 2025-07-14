'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';

import { ProfileImage } from '@/shared/user/ui/profileImage';
import Button from '@/shared/design/ui/customButton';
import useProfile from '../model/profileHook';
import { ToastType } from '@/shared/toast/model/toastHook';

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
    <div className="flex items-center gap-3">
      {/* Toast 컴포넌트 */}
      <Toaster status={ToastType.success} />

      {/* 프로필 이미지 */}
      <label htmlFor="profile-upload" className="block h-full w-full">
        <div className="flex h-[12vh] w-[12vh] items-center justify-center lg:w-[15vh]">
          <div className="relative aspect-1 w-[8vh] md:w-[10vh]">
            <ProfileImage src={imageUrl} fill={true} />
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
      <div className="flex w-full flex-col gap-3 text-nowrap md:flex-col">
        <div className="flex gap-1 text-[2vh] text-white">
          <span>닉네임:</span>{' '}
          {user ? (
            <p className="animate-fade-up font-bold">{user.nickname}</p>
          ) : null}
        </div>
        <button
          className="rounded-lg bg-white p-1 text-[1.8vh] shadow-xl"
          onClick={() => setIsModalOpen(true)}
        >
          닉네임 변경
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
