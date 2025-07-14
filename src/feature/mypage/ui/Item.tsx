import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';

import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { FaArrowRightLong } from 'react-icons/fa6';
import Arrow from '@public/assets/icons/mypage/Arrow.svg';
import { SvgIcon } from '@mui/material';
import useQuestionItem from '../model/questionItemHook';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  questionTitle: string;
  userAnswer?: string | null;
  userId: string;
  questionId: string;
  historyId: number;
  score: number;
  textColorClass?: string;
}

export const QuestionItem: React.FC<ItemProps> = ({
  index,
  isCorrectAnswer,
  questionTitle,
  score,
  questionId,
  textColorClass,
}) => {
  const {
    questionDetail,
    isPopupOpen,
    setIsPopupOpen,
    handleClosePopup,
    truncateText,
  } = useQuestionItem(questionId);
  return (
    <>
      <div className="hidden items-center justify-between gap-4 rounded-lg bg-white p-2 shadow-lg md:flex">
        <div className="flex gap-5">
          <span className="text-[1.5vh] font-semibold">
            {truncateText(questionTitle, 40)}
          </span>
          <p className="text-[1.5vh] text-gray-500">
            난이도 : {Math.floor(Math.abs(score))}
          </p>
        </div>

        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center justify-center gap-5 rounded-xl bg-[#FEBA73] p-2 text-[1.5vh] text-white"
        >
          자세히 보기
          <FaArrowRightLong />
        </button>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-lg md:hidden">
        <div className="flex items-center gap-5">
          <span className={`ml-2 text-sm font-semibold ${textColorClass}`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          {isCorrectAnswer ? (
            <CircleCheck
              size={20}
              className="text-green-600"
              strokeWidth={2.5}
            />
          ) : (
            <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
          )}
          <div className="flex items-center">
            <span className="text-[1.5vh] font-semibold">
              <h2>문제 제목</h2> {truncateText(questionTitle, 30)}
            </span>
          </div>
        </div>

        <div className="h-7 w-7" onClick={() => setIsPopupOpen(true)}>
          <SvgIcon inheritViewBox component={Arrow} />
        </div>
      </div>
      {isPopupOpen && questionDetail && (
        <PopupProblem
          size="md"
          questionTitle={questionTitle}
          difficulty={questionDetail.difficulty}
          content={questionDetail.content}
          answer={questionDetail.answer}
          explanation={questionDetail.explanation}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};
