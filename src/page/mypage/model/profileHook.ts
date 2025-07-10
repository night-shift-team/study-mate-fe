import { userStore } from '@/shared/state/userStore';
import useToast from '@/shared/toast/model/toastHook';
import { useEffect, useState, useTransition } from 'react';
import { changeNicknameApi } from '../api';

const useProfile = () => {
  const { user, setUser } = userStore.getState();
  const [imageUrl] = useState<string>(user ? user.profileImg : '');
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

  // 닉네임 변경 처리
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
            profileImg: user.profileImg,
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

  return {
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
  };
};
export default useProfile;
