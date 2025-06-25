import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BoardContent, getQnABoardDetailApi } from '../api';

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
  author,
  views,
  date,
  isLast = false,
}: MobileSuggestionListProps) => {
  const [suggestion, setSuggestion] = useState<BoardContent | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getQnABoardDetailApi(Number(id));
        if (res.ok) {
          setSuggestion(res.payload);
        } else {
          console.error('상세 데이터 조회 실패', res);
        }
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };

    fetchData();
  }, [id]);
  const commentCount = suggestion?.comments?.length ?? 0;

  console.log(suggestion);
  return (
    <div className="flex-col">
      <div className="flex justify-between pb-3 pt-1">
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
      {!isLast && <div className="h-[1.5px] w-full bg-gray-200" />}
    </div>
  );
};
