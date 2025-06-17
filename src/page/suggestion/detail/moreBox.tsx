'use client';
import { IoMdClose } from 'react-icons/io';
import { deleteQnABoardApi } from '../api';
import { useRouter } from 'next/navigation';

interface MoreBoxProps {
  onClose: () => void;
  boardId: number;
}

export const MoreBox = ({ onClose, boardId }: MoreBoxProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deleteQnABoardApi(boardId);
      alert('게시글이 삭제되었습니다.');
      router.push('/suggestion');
    } catch (error: any) {
      alert(`삭제 실패: ${error.message}`);
    }
  };

  return (
    <div className="absolute right-0 top-0 z-10 w-32 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
      <div className="mb-1 flex justify-end">
        <button onClick={onClose}>
          <IoMdClose className="text-xl text-gray-600 hover:text-gray-900" />
        </button>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        <li
          className="cursor-pointer hover:text-red-500"
          onClick={handleDelete}
        >
          삭제하기
        </li>
      </ul>
    </div>
  );
};
