'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createQnABoardApi } from '../api';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const useWriteSuggestionPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createQnABoardApi({ title, content });
      setSubmitted(true);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      alert('게시글 생성 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        router.push(RouteTo.Suggestion);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  return { title, setTitle, content, setContent, submitted, handleSubmit };
};
export default useWriteSuggestionPage;
