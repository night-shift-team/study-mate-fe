'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string; // MM-DD
}

const rawSuggestions: SuggestionItem[] = [
  {
    id: 1,
    title: '문제가 엉망임',
    author: '헬로우',
    views: 231,
    date: '05-25',
  },
  {
    id: 2,
    title: '좀 고쳐주세요',
    author: '헬로우',
    views: 123,
    date: '05-20',
  },
  {
    id: 3,
    title: '좋은 점도 있어요',
    author: '월드',
    views: 555,
    date: '04-15',
  },
];

type SortKey = 'date' | 'views';
type SortOrder = 'asc' | 'desc';

export const SuggestionList = () => {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc'); // 기본 최신순

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // 새로운 키를 누르면 기본은 내림차순으로 시작
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedSuggestions = [...rawSuggestions].sort((a, b) => {
    if (sortKey === 'date') {
      const dateA = new Date(`2024-${a.date}`);
      const dateB = new Date(`2024-${b.date}`);
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else if (sortKey === 'views') {
      return sortOrder === 'asc' ? a.views - b.views : b.views - a.views;
    }
    return 0;
  });

  const handleClick = (id: number) => {
    router.push(`/suggestion/${id}`);
  };

  return (
    <div className="mx-auto w-full">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">번호</th>
            <th className="border px-4 py-2">제목</th>
            <th className="border px-4 py-2">작성자</th>
            <th
              className="cursor-pointer border px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort('views')}
            >
              조회{' '}
            </th>
            <th
              className="cursor-pointer border px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort('date')}
            >
              날짜
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSuggestions.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="cursor-pointer transition-colors hover:bg-blue-50"
            >
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 text-center">{item.author}</td>
              <td className="border px-4 py-2 text-center">{item.views}</td>
              <td className="border px-4 py-2 text-center">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
