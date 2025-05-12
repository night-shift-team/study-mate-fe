import { useState } from 'react';
import { useEffect } from 'react';
import { QuestionFavoriteRes } from '../api';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { BookMarkCircle } from '@/feature/boomMark/ui/bookmarkCircle';
import { Bookmark } from 'lucide-react';
import { removeFavoriteApi } from '../api';
import { useTransition } from 'react';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

interface FavoriteListProps {
  favoriteList: QuestionFavoriteRes[];
  title: string;
}

export const Favorite = ({ favoriteList, title }: FavoriteListProps) => {
  const [questionDetail, setQuestionDetail] =
    useState<QuestionFavoriteRes | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentFavoriteList, setCurrentFavoriteList] = useState(favoriteList);
  const [isPending, startTransition] = useTransition();

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setQuestionDetail(null);
  };

  const handleItemClick = (item: QuestionFavoriteRes) => {
    setQuestionDetail(item);
    setIsPopupOpen(true);
  };

  const handleBookmarkClick = async (
    event: React.MouseEvent,
    item: QuestionFavoriteRes
  ) => {
    event.stopPropagation();

    const confirmRemoval = window.confirm(
      '정말 이 문제를 즐겨찾기에서 제거하시겠습니까?'
    );
    if (confirmRemoval) {
      startTransition(async () => {
        try {
          await removeFavoriteApi(item.questionId);
          setCurrentFavoriteList((prevList) =>
            prevList.filter(
              (favorite) => favorite.questionId !== item.questionId
            )
          );
          window.alert('제거되었습니다');
        } catch (error) {
          console.error('Error removing favorite:', error);
          window.alert(
            '즐겨찾기 제거 중 오류가 발생했습니다. 나중에 다시 시도하세요.'
          );
        }
      });
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-xl font-bold">{title}</h2>
      <div className="flex flex-col items-center gap-5 overflow-auto bg-pointcolor-yogurt">
        <div className="h-[30vh] w-[100%] overflow-auto rounded-xl bg-white p-4 shadow-md scrollbar-hide">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {currentFavoriteList.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer justify-between rounded-lg bg-gray-100 p-2 shadow-sm transition hover:bg-gray-200"
                onClick={() => handleItemClick(item)}
              >
                <h3 className="text-sm font-semibold">{item.questionTitle}</h3>
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
    </div>
  );
};
