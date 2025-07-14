import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import { QuestionFavoriteRes, removeFavoriteApi } from '../api';
import { useEffect, useState, useTransition } from 'react';

const useFavorite = (
  favoriteList: QuestionFavoriteRes[],
  setPopupProblemDetail: React.Dispatch<
    React.SetStateAction<ProblemDetailInfoRes | null>
  >,
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [currentFavoriteList, setCurrentFavoriteList] = useState([
    ...favoriteList,
  ]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmItem, setConfirmItem] = useState<QuestionFavoriteRes | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCurrentFavoriteList(favoriteList);
  }, [favoriteList]);

  const handleItemClick = (item: QuestionFavoriteRes) => {
    setPopupProblemDetail({
      questionId: item.questionId,
      questionTitle: item.questionTitle,
      content: item.questionTitle,
      answerExplanation: item.questionExplanation,
      category: item.questionCategory,
      answer: item.questionAnswer,
      difficulty: item.difficulty,
    } as ProblemDetailInfoRes);
    setIsPopupOpen(true);
  };

  const handleBookmarkClick = (
    event: React.MouseEvent,
    item: QuestionFavoriteRes
  ) => {
    event.stopPropagation();
    setConfirmItem(item); // 삭제할 아이템 저장
    setIsConfirmOpen(true); // ConfirmPopup 열기
  };

  const handleConfirmRemoval = async () => {
    if (!confirmItem) return;

    setIsConfirmOpen(false); // ConfirmPopup 닫기
    startTransition(async () => {
      try {
        await removeFavoriteApi(confirmItem.questionId);
        setCurrentFavoriteList((prevList) =>
          prevList.filter(
            (favorite) => favorite.questionId !== confirmItem.questionId
          )
        );
        setAlertMessage('즐겨찾기에서 제거되었습니다.');
      } catch (error) {
        console.error('Error removing favorite:', error);
        setAlertMessage(
          '즐겨찾기 제거 중 오류가 발생했습니다. 나중에 다시 시도하세요.'
        );
      } finally {
        setConfirmItem(null); // 삭제할 아이템 초기화
      }
    });
  };

  const handleCancelRemoval = () => {
    setIsConfirmOpen(false); // ConfirmPopup 닫기
    setConfirmItem(null); // 삭제할 아이템 초기화
  };

  return {
    currentFavoriteList,
    handleBookmarkClick,
    handleItemClick,
    isPending,
    alertMessage,
    setAlertMessage,
    isConfirmOpen,
    confirmItem,
    handleConfirmRemoval,
    handleCancelRemoval,
  };
};
export default useFavorite;
