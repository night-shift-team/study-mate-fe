'use client';
import { SuggestionList } from './SuggestionList';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { userStore } from '@/state/userStore';
import { getQnABoardListApi } from '../api';
import { useEffect, useState } from 'react';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string; // MM-DD
}

const Suggestion = () => {
  const router = useRouter();
  const [list, setList] = useState<SuggestionItem[] | null>(null);

  console.log(list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQnABoardListApi(0, 10);
        if (res.ok && Array.isArray(res.payload?.content)) {
          const mappedList: SuggestionItem[] = res.payload.content.map(
            (item) => ({
              id: item.id,
              title: item.title,
              author: item.user.nickname || item.user.loginId,
              views: item.view,
              date: formatDate(item.createdDt),
            })
          );
          setList(mappedList);
        } else {
          setList([]);
          console.error(
            'QnA 불러오기 실패: payload.content is not an array',
            res
          );
        }
      } catch (error) {
        setList([]);
        console.error('QnA 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  // 날짜 포맷터: ISO 날짜 → MM-DD
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${month}-${day}`;
  };

  if (list === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-[100vh] w-[90vw] max-w-[1100px]">
        <SuggestionList list={list} />
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-xl bg-orange-300 px-6 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-orange-500"
            onClick={() => {
              router.push(RouteTo.WriteSuggestion);
            }}
          >
            글 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
