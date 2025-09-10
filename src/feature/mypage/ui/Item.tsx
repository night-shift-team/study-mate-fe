import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';

import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { FaArrowRightLong } from 'react-icons/fa6';
import Arrow from '@public/assets/icons/mypage/Arrow.svg';
import { SvgIcon } from '@mui/material';
import useQuestionItem from '../model/questionItemHook';
import { ProblemCategory } from '@/shared/problem/model/problemInfo.types';

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
  category: string;
}

export const QuestionItem: React.FC<ItemProps> = ({
  index,
  isCorrectAnswer,
  questionTitle,
  score,
  questionId,
  textColorClass,
  category,
}) => {
  const {
    questionDetail,
    isPopupOpen,
    setIsPopupOpen,
    handleClosePopup,
    truncateText,
  } = useQuestionItem(questionId);
  console.log(questionDetail, 'questionDetail');

  const BgColors: Record<string, string> = {
    OS: '#7CFC00',
    DB: '#FFB852',
    ALGORITHUM: '#FFB8FF',
    NETWORK: '#00FFFF',
  };

  return (
    <>
      {/* <div className="rounded-lg bg-[#5500FF] opacity-[40%]">
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
      </div> */}
      <div className="flex h-[100px] w-full flex-col rounded-sm bg-[#451E81] pb-8p pl-16p pr-16p pt-8p">
        <div className="flex gap-2">
          <span
            className="rounded-sm pl-16p pr-16p text-center text-[16px] font-semibold text-black"
            style={{ backgroundColor: BgColors[category] }}
          >
            {category}
          </span>
          <span className="font-semibold text-point-yellow">
            Lv.{questionDetail?.difficulty}
          </span>
        </div>
        <div className="line-clamp-1 w-full font-pretandard text-body-primary">
          {questionTitle}
        </div>
        <div></div>
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
