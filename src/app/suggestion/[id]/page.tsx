'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentSection from '@/page/suggestion/detail/comment/commentSection';
import { getQnABoardDetailApi, BoardContent } from '@/page/suggestion/api';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import MoreButton from '../../../../public/assets/icons/suggestion/more.png';
import Image from 'next/image';
import { userStore } from '@/state/userStore';
import { MoreBox } from '@/page/suggestion/detail/moreBox';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const SuggestionDetailPage = () => {
  const { user } = userStore();
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

  if (!suggestion)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner />
      </div>
    );

  const handleMoreClick = () => {
    isOpen(true);
  };

  return (
    <PageAnimationWrapper>
      <div className="mt-5 flex h-[80vh] w-[90vw] max-w-[1100px] flex-col">
        <div className="flex-1 rounded-xl bg-white p-4 shadow-md">
          <div className="mb-2 flex w-[100%] items-center justify-between text-sm text-gray-500">
            #{suggestion.id}
            <span className="relative">
              {user?.userId === suggestion.user.userId && (
                <Image
                  src={MoreButton}
                  alt="More"
                  width={20}
                  height={5}
                  className="cursor-pointer"
                  onClick={handleMoreClick}
                />
              )}
              {open && (
                <div className="">
                  {typeof id === 'string' && (
                    <MoreBox
                      onClose={() => isOpen(false)}
                      boardId={Number(id)}
                    />
                  )}
                </div>
              )}
            </span>
          </div>

          <h1 className="mb-4t ext-xl font-semibold">{suggestion.title}</h1>

          <div className="mb-6 flex flex-wrap gap-6 text-sm text-gray-600">
            <span>
              작성자: {suggestion.user.nickname || suggestion.user.loginId}
            </span>
            <span>
              작성일: {new Date(suggestion.createdDt).toLocaleDateString()}
            </span>
            <span>조회수: {suggestion.view}</span>
          </div>
          <div className="whitespace-pre-wrap rounded-md border p-4 text-gray-800">
            {suggestion.content}
          </div>
        </div>
        <CommentSection
          initialComments={suggestion.comments.map((c) => ({
            id: c.id,
            author: c.writer,
            content: c.content,
            date: new Date(c.createdDt).toISOString().split('T')[0],
          }))}
          currentUserNickname={user?.loginId ?? ''}
          boardId={suggestion.id}
        />
      </div>
    </PageAnimationWrapper>
  );
};

export default SuggestionDetailPage;
