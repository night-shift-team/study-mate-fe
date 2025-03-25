import Button from '@/components/buttons';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Spinner } from '../spinner/ui/spinnerUI';

interface PopupProps {
  index: number | undefined;
  title: string | undefined;
  content: string | undefined;
  userAnswer: number | undefined;
  correctAnswer: string | undefined;
  explanation: string | undefined;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  index,
  title,
  userAnswer,
  content,
  correctAnswer,
  explanation,
  onClose,
}) => {
  const [showContent, setShowContent] = React.useState(true);

  return (
    <div className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative min-h-[20rem] w-[90%] max-w-lg scale-100 transform rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h2 className="text-ellipsis whitespace-pre-wrap text-sm font-semibold text-gray-800">
            {`문제 ${index ? index + 1 : ''} \n${title ?? ''}`}
          </h2>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-800"
            style={{ fontSize: '24px' }}
          />
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-col justify-center space-y-4">
          <Button
            size="sm"
            className="w-full"
            onClick={() => setShowContent((prev) => !prev)}
          >
            문제 {showContent ? '숨기기' : '보기'}
          </Button>
          {index ? null : <Spinner />}
          {showContent ? <MarkdownComponent markdown={content ?? ''} /> : ''}
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">유저 답변:</span>{' '}
            <span className="font-medium">{userAnswer ?? ''}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">정답:</span>{' '}
            <span className="font-medium text-green-600">
              {isNaN(Number(correctAnswer).valueOf())
                ? ''
                : Number(correctAnswer).valueOf()}
            </span>
          </p>
          <div className="flex flex-col leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">설명</span>
            <span>{explanation ?? ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
