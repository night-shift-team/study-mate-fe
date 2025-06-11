'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { BoardContent } from '../api';

interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string; // MM-DD
}

interface SuggestionListProps {
  list: SuggestionItem[];
}

type SortKey = 'date' | 'views';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export const SuggestionList = ({ list }: SuggestionListProps) => {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const sortedSuggestions = [...list].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedSuggestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSuggestions = sortedSuggestions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleClick = (id: number) => {
    router.push(`/suggestion/${id}`);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="ju flex h-[80vh] flex-col rounded-lg bg-white p-4 shadow-md">
      {/* <div className="flex h-[50px] items-center text-lg font-bold">
        건의사항
      </div> */}
      <div className="mx-auto flex h-[100%] w-full flex-col justify-between">
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
                조회
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
            {paginatedSuggestions.map((item) => (
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
        <div className="mt-3 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
            size="medium"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};
