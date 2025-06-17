'use client';

import { useState } from 'react';
import { createCommentApi } from '../../api';
import seedrandom from 'seedrandom';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  initialComments: Comment[];
  currentUserNickname: string;
  boardId: number;
}

const CommentSection = ({
  initialComments,
  currentUserNickname,
  boardId,
}: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      await createCommentApi({
        boardId,
        content: newComment.trim(),
      });

      const comment: Comment = {
        id: Date.now(),
        author: currentUserNickname,
        content: newComment.trim(),
        date: new Date().toISOString().split('T')[0],
      };

      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const changeAuthor = (email: string) => {
    const cmail = seedrandom(email);
    const number = Math.floor(cmail() * 10000);
    return `사용자${number.toString().padStart(4, '0')}`;
  };

  return (
    <div className="mt-8 overflow-auto rounded-xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-sm font-semibold">댓글</h2>

      {comments.length > 0 ? (
        <ul className="mb-4 space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-md border p-3 text-xs">
              <div className="mb-1 text-gray-600">
                {changeAuthor(comment.author)} | {comment.date}
              </div>
              <div className="whitespace-pre-wrap text-gray-800">
                {comment.content}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-sm text-gray-500">아직 댓글이 없습니다.</p>
      )}

      <div className="flex flex-col gap-2">
        <textarea
          className="w-full resize-none rounded-md border p-2 text-xs"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          disabled={loading}
        />
        <button
          className="self-end rounded-md bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600 disabled:opacity-50"
          onClick={handleAddComment}
          disabled={loading}
        >
          {loading ? '작성 중...' : '댓글 작성'}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
