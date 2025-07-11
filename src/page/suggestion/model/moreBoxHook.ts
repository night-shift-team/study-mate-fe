'use client';
import { useRouter } from 'next/navigation';
import { deleteQnABoardApi } from '../api';
import { useState } from 'react';

const useMoreBox = (boardId: number) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      await deleteQnABoardApi(boardId);
      setAlertMessage('게시글이 삭제되었습니다.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push('/suggestion');
      }, 1500);
    } catch (error: any) {
      setAlertMessage(`삭제 실패: ${error.message}`);
      setShowAlert(true);
    }
  };
  return {
    showConfirm,
    showAlert,
    alertMessage,
    handleDelete,
    setShowConfirm,
    setShowAlert,
  };
};
export default useMoreBox;
