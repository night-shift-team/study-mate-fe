'use client';
import { getQuestionDetailApi } from '@/page/mypage/api';
import { getWithCache } from '@/shared/api/model/apiCacheHook';
import { useEffect, useState } from 'react';

const useQuestionItem = (questionId: string) => {
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

  return {
    questionDetail,
    isPopupOpen,
    setIsPopupOpen,
    handleClosePopup,
    truncateText,
  };
};
export default useQuestionItem;
