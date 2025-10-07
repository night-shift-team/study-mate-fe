import { PopupProblem } from '@/shared/popUp/ui/popupV2';

import useQuestionItem from '../model/questionItemHook';

interface ItemProps {
  index: number;
  isCorrectAnswer: boolean;
  questionTitle: string;
  userAnswer?: string | null;
  userId: string;
  questionId: string;
  historyId: number;
  score: number;
  textColorClass?: string;
  category: string;
  createdDt?: string;
}

export const QuestionItem: React.FC<ItemProps> = ({
  questionTitle,
  questionId,
  category,
  createdDt,
}) => {
  const { questionDetail, isPopupOpen, handleClosePopup } =
    useQuestionItem(questionId);

  const BgColors: Record<string, string> = {
    OS: '#7CFC00',
    DB: '#FFB852',
    ALGORITHUM: '#FFB8FF',
    NETWORK: '#00FFFF',
  };

  return (
    <>
      <div className="flex h-[100px] w-full flex-col rounded-sm bg-[#451E81] pb-8p pl-16p pr-16p pt-8p">
        <div className="flex gap-2">
          <span
            className="rounded-sm pl-16p pr-16p text-center text-[16px] font-semibold text-black"
            style={{ backgroundColor: BgColors[category] }}
          >
            {category}
          </span>
          <span className="font-semibold text-point-yellow">
            Lv.{questionDetail?.difficulty}
          </span>
        </div>
        <div className="line-clamp-1 w-full font-pretandard text-body-primary">
          {questionTitle}
        </div>
        <div className="font-pretandard text-body-secondary text-grayscale-400">
          {createdDt?.slice().replace('T', ' ').slice(0, 10)}
        </div>
      </div>
      {isPopupOpen && questionDetail && (
        <PopupProblem
          size="md"
          questionTitle={questionTitle}
          difficulty={questionDetail.difficulty}
          content={questionDetail.content}
          answer={questionDetail.answer}
          explanation={questionDetail.explanation}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};
