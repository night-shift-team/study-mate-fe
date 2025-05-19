'use client';

import { useEffect, useState, useTransition } from 'react';
import { QuestionFavoriteRes } from '../api';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { Bookmark } from 'lucide-react';
import { removeFavoriteApi } from '../api';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { ConfirmPopup } from './ConfirmPopup';

interface FavoriteListProps {
  favoriteList: QuestionFavoriteRes[];
  title: string;
}

// AlertPopup 컴포넌트 정의
const AlertPopup = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-xl">
      <p className="mb-4 text-center text-base text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="mx-auto block rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
      >
        확인
      </button>
    </div>
  </div>
);

export const Favorite = ({ favoriteList, title }: FavoriteListProps) => {
  const [questionDetail, setQuestionDetail] =
    useState<QuestionFavoriteRes | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setQuestionDetail(null);
  };

  const handleItemClick = (item: QuestionFavoriteRes) => {
    setQuestionDetail(item);
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

  return (
    <div>
      {currentFavoriteList.length !== 0 ? (
        <>
          <div className="flex flex-col items-center gap-5 overflow-auto bg-pointcolor-yogurt">
            <div className="h-[30vh] w-full overflow-auto rounded-xl p-4 shadow-md scrollbar-hide">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                {currentFavoriteList.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer justify-between rounded-lg bg-gray-100 p-2 shadow-sm transition hover:bg-gray-200"
                    onClick={() => handleItemClick(item)}
                  >
                    <h3 className="text-sm font-semibold">
                      {item.questionTitle}
                    </h3>
                    <Bookmark
                      size={28}
                      color="bg-amber-300/80"
                      fill="#FCD34D"
                      onClick={(event) => handleBookmarkClick(event, item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isPending && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <Spinner />
            </div>
          )}

          {isPopupOpen && questionDetail && (
            <PopupProblem
              size="md"
              questionTitle={questionDetail.questionTitle}
              difficulty={questionDetail.difficulty}
              content={questionDetail.questionContent}
              answer={questionDetail.questionAnswer}
              explanation={questionDetail.questionExplanation}
              onClose={handleClosePopup}
            />
          )}

          {alertMessage && (
            <AlertPopup
              message={alertMessage}
              onClose={() => setAlertMessage(null)}
            />
          )}

          {isConfirmOpen && confirmItem && (
            <ConfirmPopup
              message="정말 이 문제를 즐겨찾기에서 제거하시겠습니까?"
              onConfirm={handleConfirmRemoval}
              onCancel={handleCancelRemoval}
            />
          )}
        </>
      ) : (
        <span>즐겨찾는 문제 없음</span>
      )}
    </div>
  );
};
