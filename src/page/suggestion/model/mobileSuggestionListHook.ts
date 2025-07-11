'use client';
import { useEffect, useState } from 'react';
import { BoardContent, getQnABoardDetailApi } from '../api';

const useMobileSuggestionList = (id: number) => {
  const [suggestion, setSuggestion] = useState<BoardContent | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getQnABoardDetailApi(Number(id));
        if (res.ok) {
          setSuggestion(res.payload);
        } else {
          console.error('상세 데이터 조회 실패', res);
        }
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };

    fetchData();
  }, [id]);
  const commentCount = suggestion?.comments?.length ?? 0;

  return { commentCount };
};
export default useMobileSuggestionList;
