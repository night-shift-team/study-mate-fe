'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { userStore } from '@/state/userStore';
import { changeNicknameApi } from '../api';
import Image from 'next/image';
import Button from '@/components/buttons';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useToast, { ToastType } from '@/shared/toast/toast';

const DEFAULT_PROFILE_IMG = '/default-profile.png';

const Profile = () => {
  const { user, setUser } = userStore();
  const [imageUrl, setImageUrl] = useState<string>(
    user?.profileImg || DEFAULT_PROFILE_IMG
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState<string>(user?.nickname || '');
  const [isPending, startTransition] = useTransition();
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const { Toaster, setToastDescription } = useToast(
    isToastOpen,
    setIsToastOpen
  );

  const handleNicknameChange = async () => {
    if (user?.nickname === newNickname) {
      setErrorMessage('현재와 다른 닉네임을 입력해주세요.');
      return;
    }
    if (!newNickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    startTransition(async () => {
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
          setIsNicknameChanged(true);
          setToastDescription('닉네임이 변경되었습니다.');
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
    });
  };

  useEffect(() => {
    if (isNicknameChanged) {
      setIsToastOpen(true);
      setIsNicknameChanged(false);
    }
  }, [isNicknameChanged]);
  return (
    <div className="flex items-center gap-3">
      {<Toaster status={ToastType.success} />}
      <label htmlFor="profile-upload" className="block h-full w-full">
        <div className="flex h-[12vh] w-[12vh] items-center justify-center md:w-[15vh]">
          <Image
            src={user?.profileImg || DEFAULT_PROFILE_IMG}
            alt=""
            className="rounded-[50%]"
            width={80}
            height={80}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-[90%] rounded bg-white p-5 shadow-lg md:w-[50%]">
            <h2 className="ml-1 text-base font-semibold">변경할 닉네임</h2>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="mt-2 w-full rounded border p-2"
              placeholder="새 닉네임을 입력하세요"
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button
                size="xxs"
                rounded={true}
                className="rounded-full bg-gray-300 text-[0.8rem]"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                size="xxs"
                rounded={true}
                className="bg-blue-500 text-[0.8rem] text-white"
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
