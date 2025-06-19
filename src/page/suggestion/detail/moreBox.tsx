'use client';
import { IoMdClose } from 'react-icons/io';
import { deleteQnABoardApi } from '../api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BoardAlertPopup } from './AlertPopup';
interface MoreBoxProps {
  onClose: () => void;
  boardId: number;
}

export const MoreBox = ({ onClose, boardId }: MoreBoxProps) => {
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

  return (
    <>
      <div className="absolute right-0 top-0 z-10 w-32 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
        <div className="mb-1 flex justify-end">
          <button onClick={onClose}>
            <IoMdClose className="text-xl text-gray-600 hover:text-gray-900" />
          </button>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={() => setShowConfirm(true)}
          >
            삭제하기
          </li>
        </ul>
      </div>
      {showConfirm && (
        <BoardAlertPopup
          title="정말 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showAlert && (
        <BoardAlertPopup
          title={alertMessage}
          confirmText="확인"
          hideCancel
          onConfirm={() => setShowAlert(false)}
        />
      )}
    </>
  );
};
