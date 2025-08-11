'use client';

import useCommentSection from '../model/commentSectionHook';

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  initialComments: Comment[];
  currentUserNickname: string;
  boardId: number;
  role?: number;
}

const CommentSection = ({
  initialComments,
  currentUserNickname,
  boardId,
  role,
}: CommentSectionProps) => {
  const { comments, newComment, loading, setNewComment, handleAddComment } =
    useCommentSection(initialComments, currentUserNickname, boardId);

  return (
    <div className="mt-8 flex h-[40vh] flex-col justify-between bg-[#e7924a] p-4 shadow-md">
      <div className="flex items-start gap-2">
        <h2 className="mb-4 text-sm font-semibold">A .</h2>

        {comments.length > 0 ? (
          <ul className="mb-4 space-y-4 text-center">
            {comments.map((comment) => (
              <li key={comment.id} className="text-xs">
                <div className="whitespace-pre-wrap text-gray-800">
                  {comment.content}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-sm text-gray-500">아직 댓글이 없습니다.</p>
        )}
      </div>
      {/* 운영자만 댓글 달 수 있게 */}
      {role === 0 && (
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
      )}
    </div>
  );
};

export default CommentSection;
