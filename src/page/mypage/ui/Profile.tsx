'use client';

import React, { useState } from 'react';
import { userStore } from '@/state/userStore';
import { changeNicknameApi } from '../api';

const DEFAULT_PROFILE_IMG = '/default-profile.png';

const Profile = () => {
  const { user, setUser } = userStore();
  const [imageUrl, setImageUrl] = useState<string>(
    user?.profileImg || DEFAULT_PROFILE_IMG
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState<string>(user?.nickname || '');

  const handleNicknameChange = async () => {
    if (!newNickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await changeNicknameApi(newNickname);

      if (response.ok && user) {
        setUser({
          ...user,
          nickname: newNickname,
          userId: user.userId || '',
          loginType: user.loginType || '',
          loginId: user.loginId || '',
          profileImg: user.profileImg || '',
          status: user.status || '',
          role: user.role || 0,
          registeredAt: user.registeredAt || '',
          userScore: user.userScore || 0,
        });
        setIsModalOpen(false);
        setErrorMessage('');
      } else {
        if (
          'message' in response.payload &&
          response.payload.message === 'nickname already exist'
        ) {
          setErrorMessage('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
        } else {
          setErrorMessage('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
      setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="profile-upload" className="block h-full w-full">
        <div className="flex h-[12vh] w-[12vh] items-center justify-center md:w-[15vh]">
          <img src={user?.profileImg} alt="" className="rounded-[50%]" />
        </div>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={() => {}}
          className="hidden"
        />
      </label>
      <div className="flex w-full flex-col gap-3 text-nowrap md:flex-col">
        <div className="flex gap-1 text-[2vh] text-white">
          <span>닉네임:</span> <p className="font-bold">{user?.nickname}</p>
        </div>

        <button
          className="rounded-lg bg-white p-1 text-[1.8vh] shadow-xl"
          onClick={() => setIsModalOpen(true)}
        >
          닉네임 변경
        </button>
      </div>

      {isModalOpen && (
        <div className="z- fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-[90%] rounded bg-white p-5 shadow-lg md:w-[50%]">
            <h2 className="text-lg font-semibold">닉네임 변경</h2>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="새 닉네임을 입력하세요"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded-lg bg-gray-300 p-2"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="rounded-lg bg-blue-500 p-2 text-white"
                onClick={handleNicknameChange}
              >
                변경
              </button>
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
