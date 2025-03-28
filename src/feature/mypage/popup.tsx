import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { QuestionDetailRes } from '@/page/mypage/api';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';

interface PopupProps {
  questionTitle: string;
  onClick: () => void; // onClose 함수 props
  questionDetail: QuestionDetailRes;
}

const Popup: React.FC<PopupProps> = ({
  onClick,
  questionTitle,
  questionDetail,
}) => {
  const [markdown, _] = useState(`
#### 문제 :  ${questionDetail.content}  
#### 정답 : ${questionDetail.answer}

> 해설 : 
 ${questionDetail.answerExplanation}
- List item 1


`);
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-[90%] max-w-lg scale-100 transform rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300">
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <span className="text-[2vh] font-semibold text-gray-800">
            title : {questionTitle}
          </span>
          <span className="text-[1.8vh] font-semibold text-gray-800">
            난이도 : {questionDetail.difficulty}
          </span>
          <IoMdClose
            onClick={onClick}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-800"
            style={{ fontSize: '24px' }}
          />
        </div>
        <MarkdownComponent markdown={markdown} />
      </div>
    </div>
  );
};

export default Popup;
