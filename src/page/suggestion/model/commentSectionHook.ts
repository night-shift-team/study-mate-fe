import { useState } from 'react';
import { createCommentApi } from '../api';
import { Comment } from '../ui/commentSection';
import seedrandom from 'seedrandom';

const useCommentSection = (
  initialComments: Comment[],
  currentUserNickname: string,
  boardId: number
) => {
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
  return {
    comments,
    newComment,
    loading,
    changeAuthor,
    setNewComment,
    handleAddComment,
  };
};
export default useCommentSection;
