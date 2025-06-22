'use client';

import { useEffect, useState, useTransition } from 'react';
import { QuestionFavoriteRes } from '../api';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { Bookmark } from 'lucide-react';
import { removeFavoriteApi } from '../api';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { ConfirmPopup } from './ConfirmPopup';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import { getQuestionDetailApi } from '../api';
import { getWithCache } from '@/entities/apiCacheHook';

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
  const [solvedStatus, setSolvedStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCurrentFavoriteList(favoriteList);
    SearchQuestion();
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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}` : text;
  };
  const questionIds = currentFavoriteList.map((item) => item.questionId);

  const SearchQuestion = async () => {
    try {
      const res = await Promise.all(
        questionIds.map((id) => getQuestionDetailApi(id))
      );
      console.log('즐겨찾기 API 응답:', res);

      // Do something with results if needed
    } catch (error) {}
  };

  return (
    <div className="animate-fade-up">
      {currentFavoriteList.length !== 0 ? (
        <div>
          <div className="flex flex-col items-center gap-5 overflow-auto bg-pointcolor-yogurt">
            <div className="h-[35vh] w-full overflow-auto rounded-xl p-4 shadow-md scrollbar-hide">
              <div className="flex gap-2">
                {currentFavoriteList.map((item, index) => {
                  const categoryBgColors: Record<ProblemCategoryTitle, string> =
                    {
                      [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                      [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                      [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                      [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
                      [ProblemCategoryTitle.DESIGN]: 'bg-[#FFF5E1]',
                    };
                  const categoryTextColors: Record<
                    ProblemCategoryTitle,
                    string
                  > = {
                    [ProblemCategoryTitle.ALGORITHUM]: 'text-[#1E88E5]',
                    [ProblemCategoryTitle.NETWORK]: 'text-[#8F1EE5]',
                    [ProblemCategoryTitle.DB]: 'text-[#41B963]',
                    [ProblemCategoryTitle.OS]: 'text-[#FF969C]',
                    [ProblemCategoryTitle.DESIGN]: 'text-white',
                  };

                  const categoryKey = item.questionCategory.split(
                    '_'
                  )[0] as ProblemCategoryTitle;
                  const bgColorClass =
                    categoryBgColors[categoryKey] ?? 'bg-white';

                  const textColorCss =
                    categoryTextColors[categoryKey] ?? 'text-white';

                  return (
                    <div
                      key={index}
                      className="bg-whiteshadow- flex h-[180px] w-[320px] cursor-pointer flex-col rounded-lg bg-white shadow-lg transition"
                    >
                      <div className="flex h-[60px] w-full items-center justify-between">
                        <div className="flex flex-col truncate pl-4 text-sm">
                          <span className="font-semibold">
                            {truncateText(item.questionTitle, 20)}
                          </span>

                          <span className="text-xs text-gray-400">
                            스크랩 날짜
                          </span>
                        </div>
                        <div
                          className={`flex h-[32px] w-[100px] items-center justify-center rounded-l-lg text-xs ${textColorCss} font-medium ${bgColorClass}`}
                        >
                          {categoryKey}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col gap-1 pl-4 text-xs">
                        <span>난이도:{item.difficulty}</span>
                        <span>풀이상태:</span>
                      </div>
                      {/* <Bookmark
                        size={28}
                        color="bg-amber-300/80"
                        fill="#FCD34D"
                        onClick={(event) => handleBookmarkClick(event, item)}
                      /> */}
                      <div className="w-ful mt-auto h-[30px]">
                        <span
                          onClick={() => handleItemClick(item)}
                          className="flex justify-end pr-4 text-xs text-[#6E6E6E] underline"
                        >
                          자세히 보기
                        </span>
                      </div>
                    </div>
                  );
                })}
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
        </div>
      ) : (
        <span>즐겨찾는 문제 없음</span>
      )}
    </div>
  );
};
