'use client';
import { userStore } from '@/shared/state/userStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BoardContent, getQnABoardDetailApi } from '../api';

const useSuggestionDetailPage = () => {
  const user = userStore.getState().user;
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState<BoardContent | null>(null);
  const [open, isOpen] = useState(false);

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

  const handleMoreClick = () => {
    isOpen(true);
  };
  return { suggestion, user, id, handleMoreClick, open, isOpen };
};
export default useSuggestionDetailPage;
