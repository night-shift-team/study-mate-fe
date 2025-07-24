import { useEffect, useState } from 'react';
import { getQnABoardListApi } from '../api';
import { useRouter } from 'next/navigation';
interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  content: string;
  date: string; // MM-DD
}

const useSuggestionPage = () => {
  const router = useRouter();
  const [list, setList] = useState<SuggestionItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQnABoardListApi(0, 10);
        if (res.ok && Array.isArray(res.payload?.content)) {
          const mappedList: SuggestionItem[] = res.payload.content.map(
            (item) => ({
              id: item.id,
              title: item.title,
              content: item.content,
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
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return { list, router };
};
export default useSuggestionPage;
