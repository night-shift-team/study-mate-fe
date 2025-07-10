import useMobileSuggestionList from '../model/mobileSuggestionListHook';

interface MobileSuggestionListProps {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string;
  isLast?: boolean;
}

export const MobileSuggestionList = ({
  id,
  title,
  date,
  isLast = false,
}: MobileSuggestionListProps) => {
  const { commentCount } = useMobileSuggestionList(id);
  return (
    <div className="flex-col">
      <div className="flex justify-between pb-1 pt-3">
        <div className="flex gap-5">
          <div className="font-bold">{id.toString().padStart(2, '0')}</div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">{title}</span>
            <span className="text-sm font-semibold text-gray-500">{date}</span>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="text-sm text-gray-600">댓글 {commentCount}</div>
        </div>
      </div>
      {!isLast && <div className="mt-2 h-[1.5px] w-full bg-gray-200" />}{' '}
    </div>
  );
};
