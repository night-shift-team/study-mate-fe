import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface PopupProps {
  index: number;
  userAnswer: number | null;
  correctAnswer: string;
  explanation: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  index,
  userAnswer,
  correctAnswer,
  explanation,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-[90%] max-w-lg scale-100 transform rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            문제 {index + 1}
          </h2>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-800"
            style={{ fontSize: '24px' }}
          />
        </div>

        {/* 콘텐츠 */}
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">유저 답변:</span>{' '}
            {userAnswer !== null ? (
              <span className="font-medium">{userAnswer}</span>
            ) : (
              <span className="">선택 안 함</span>
            )}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">정답:</span>{' '}
            <span className="font-medium text-green-600">
              {correctAnswer + 1}
            </span>
          </p>
          <div className="flex flex-col leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">설명</span>
            <span>{explanation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
