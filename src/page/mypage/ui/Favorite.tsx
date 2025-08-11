'use client';
import { QuestionFavoriteRes } from '../api';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { ConfirmPopup } from './ConfirmPopup';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import Arrow from '@public/assets/icons/button/check/Polygon.svg';
import { SvgIcon } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import useFavorite from '../model/favoriteHook';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import { QuestionHistory } from '../model/checkListHook';
import { AlertPopup } from './AlertPopup';

interface FavoriteListProps {
  favoriteList: QuestionFavoriteRes[];
  title: string;
  setPopupProblemDetail: React.Dispatch<
    React.SetStateAction<ProblemDetailInfoRes | null>
  >;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionHistory: QuestionHistory[];
}
const Favorite = ({
  favoriteList,
  setPopupProblemDetail,
  setIsPopupOpen,
  questionHistory,
}: FavoriteListProps) => {
  const {
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
  } = useFavorite(favoriteList, setPopupProblemDetail, setIsPopupOpen);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}` : text;
  };

  return (
    <div className="animate-fade-up">
      {currentFavoriteList.length !== 0 ? (
        <div>
          <div className="flex flex-col items-center gap-3 overflow-auto scrollbar-hide">
            <div className="w-full overflow-auto rounded-xl scrollbar-hide">
              <div className="flex w-full gap-1 overflow-x-auto scroll-smooth pb-2">
                {currentFavoriteList.map((item, index) => {
                  const categoryBgColors: Record<ProblemCategoryTitle, string> =
                    {
                      [ProblemCategoryTitle.ALGORITHUM]: 'bg-[#DDEDFB]',
                      [ProblemCategoryTitle.NETWORK]: 'bg-[#EEDDFB]',
                      [ProblemCategoryTitle.DB]: 'bg-[#E3F5E8]',
                      [ProblemCategoryTitle.OS]: 'bg-[#FDDCDE]',
                    };
                  const categoryTextColors: Record<
                    ProblemCategoryTitle,
                    string
                  > = {
                    [ProblemCategoryTitle.ALGORITHUM]: 'text-[#1E88E5]',
                    [ProblemCategoryTitle.NETWORK]: 'text-[#8F1EE5]',
                    [ProblemCategoryTitle.DB]: 'text-[#41B963]',
                    [ProblemCategoryTitle.OS]: 'text-[#FF969C]',
                  };

                  const categoryKey = item.questionCategory.split(
                    '_'
                  )[0] as ProblemCategoryTitle;
                  const bgColorClass =
                    categoryBgColors[categoryKey] ?? 'bg-white';

                  const textColorCss =
                    categoryTextColors[categoryKey] ?? 'text-white';

                  const history = questionHistory.find(
                    (h) => h.questionId === item.questionId
                  );
                  const solveStatus =
                    history?.isCorrect === true
                      ? '완료'
                      : history
                        ? '미완료'
                        : '-';

                  return (
                    <div
                      key={index}
                      className="flex h-[140px] w-[200px] shrink-0 snap-start flex-col rounded-lg bg-point-purple bg-opacity-60 transition"
                    >
                      {/* <div className="flex w-full justify-end p-2">
                        <IoClose
                          onClick={(event) => handleBookmarkClick(event, item)}
                          size={20}
                        />
                      </div> */}

                      <div className="flex h-[50px] w-full items-center justify-between gap-4">
                        <div className="flex flex-col truncate pl-4 text-sm">
                          <span className="font-semibold text-white">
                            {truncateText(item.questionTitle, 20)}
                          </span>
                        </div>
                        {/* <div
                          className={`flex h-[32px] w-[100px] items-center justify-center rounded-l-lg text-xs ${textColorCss} font-medium ${bgColorClass}`}
                        >
                          {categoryKey}
                        </div> */}
                      </div>
                      {/* <div className="mt-2 flex flex-col gap-1 pl-4 text-xs">
                        <span>난이도:{item.difficulty}</span>
                        <span>풀이상태: {solveStatus}</span>
                      </div> */}
                      {/* <Bookmark
                        size={28}
                        color="bg-amber-300/80"
                        fill="#FCD34D"
                        onClick={(event) => handleBookmarkClick(event, item)}
                      /> */}
                      <div className="mt-auto flex h-[30px] w-full justify-between pl-16p pr-16p">
                        <span className="text-xs text-gray-400">
                          {/* 스크랩 날짜 */}
                          {item.createdDt.toString().slice(0, 10)}
                        </span>
                        {/* <span
                          onClick={() => handleItemClick(item)}
                          className="flex cursor-pointer justify-end pr-4 text-xs text-[#6E6E6E] underline"
                        >
                          자세히 보기
                        </span> */}
                        <SvgIcon
                          onClick={() => handleItemClick(item)}
                          inheritViewBox
                          component={Arrow}
                          sx={{ width: '10%', height: '50%' }}
                        />
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

export default Favorite;
