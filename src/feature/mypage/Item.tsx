import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { getQuestionDetailApi, QuestionDetailRes } from '@/page/mypage/api';
import { useEffect, useState } from 'react';
import Popup from './popup';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  questionTitle: string;
  userAnswer?: string | null;
  userId: string;
  questionId: string;
  historyId: number;
  score: number;
}

export const QuestionItem: React.FC<ItemProps> = ({
  index,
  isCorrectAnswer,
  userAnswer,
  userId,
  historyId,
  questionTitle,
  score,
  questionId,
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
      const res = await getQuestionDetailApi(questionId);
      console.log('API 응답:', res); // 전체 응답 확인
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
      <div
        className="flex w-[40%] items-center justify-between gap-4 rounded-lg bg-white p-2 shadow-lg"
        onClick={() => setIsPopupOpen(true)} // 팝업 열기
      >
        <span className="text-[1.5vh] font-semibold">
          문제 {truncateText(questionTitle, 10)}
        </span>
        <p
          className={`text-[1.8vh] ${
            score < 0 ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {score} 점
        </p>
        {isCorrectAnswer ? (
          <CircleCheck size={20} className="text-green-600" strokeWidth={2.5} />
        ) : (
          <CircleX size={20} className="text-red-600" strokeWidth={2.5} />
        )}
      </div>
      {isPopupOpen && (
        <Popup
          questionTitle={questionTitle}
          onClick={handleClosePopup}
          questionDetail={questionDetail}
        />
      )}
    </>
  );
};
