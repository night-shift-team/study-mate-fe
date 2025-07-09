import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { getQuestionDetailApi } from '@/page/mypage/api';
import { useEffect, useState } from 'react';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { getWithCache } from '@/entities/apiCacheHook';
import { FaArrowRightLong } from 'react-icons/fa6';
import Arrow from '@public/assets/icons/mypage/Arrow.svg';
import { SvgIcon } from '@mui/material';

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
  const [questionDetail, setQuestionDetail] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 텍스트를 지정된 길이로 자르는 함수
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // API 호출 함수
  const fetchQuestionDetail = async () => {
    try {
      const res = await getWithCache({
        key: `QuestionItem-fetchQuestionDetail-${questionId}`,
        fetcher: async () => await getQuestionDetailApi(questionId),
        expires: 3 * 24 * 60 * 60 * 1000, // 3일
      });
      if (res.ok && res.payload) {
        setQuestionDetail(res.payload);
      } else {
        console.error('API 요청 실패 또는 payload 없음:', res);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  // questionId가 변경될 때 API 호출
  useEffect(() => {
    if (questionId) {
      fetchQuestionDetail();
    } else {
      console.error('questionId가 없습니다.');
    }
  }, [questionId]);

  // questionDetail 업데이트 로그
  useEffect(() => {
    if (questionDetail) {
    }
  }, [questionDetail]);

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
