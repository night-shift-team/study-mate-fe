'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { BoardContent } from '../api';
import { MobileSuggestionList } from './MobileSuggestionList';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';

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
    <>
      {/* ✅ 데스크톱 전용 테이블 */}
      <div className="hidden h-[80vh] flex-col justify-center rounded-lg p-4 md:flex">
        <h2 className="mb-4 text-lg font-bold">건의사항</h2>
        <div className="rounded-lgp-4 flex h-[80vh] flex-col justify-center">
          <div className="mx-auto flex h-[100%] w-full flex-col justify-between">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th colSpan={5} className="p-0">
                    <div className="grid grid-cols-5 overflow-hidden rounded-md bg-[#78A46D] text-center font-semibold text-white">
                      <div className="px-4 py-2">번호</div>
                      <div className="px-4 py-2">제목</div>
                      <div className="px-4 py-2">작성자</div>
                      <div
                        className="flex cursor-pointer items-center justify-center px-4 py-2"
                        onClick={() => handleSort('date')}
                      >
                        작성 시간
                        <div className="ml-1 flex flex-col items-center leading-none">
                          <TiArrowSortedUp
                            size={16}
                            className={`mb-[-4px] ${sortKey === 'date' && sortOrder === 'asc' ? 'text-white' : 'text-gray-400'}`}
                          />
                          <TiArrowSortedDown
                            size={16}
                            className={`mt-[-4px] ${sortKey === 'date' && sortOrder === 'desc' ? 'text-white' : 'text-gray-400'}`}
                          />
                        </div>
                      </div>

                      <div
                        className="flex cursor-pointer items-center justify-center px-4 py-2"
                        onClick={() => handleSort('views')}
                      >
                        조회수
                        <div className="ml-1 flex flex-col items-center leading-none">
                          <TiArrowSortedUp
                            size={16}
                            className={`mb-[-4px] ${sortKey === 'views' && sortOrder === 'asc' ? 'text-white' : 'text-gray-400'}`}
                          />
                          <TiArrowSortedDown
                            size={16}
                            className={`mt-[-4px] ${sortKey === 'views' && sortOrder === 'desc' ? 'text-white' : 'text-gray-400'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuggestions.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className="cursor-pointer"
                  >
                    <td colSpan={5} className="py-2">
                      <div className="grid grid-cols-5 overflow-hidden rounded-md bg-white shadow-md hover:bg-gray-100">
                        <div className="px-4 py-4 text-center font-medium text-gray-800">
                          {item.id.toString().padStart(2, '0')}
                        </div>
                        <div className="px-4 py-4 text-center text-gray-800">
                          {item.title}
                        </div>
                        <div className="px-4 py-4 text-center text-gray-800">
                          {item.author}
                        </div>
                        <div className="px-4 py-4 text-center text-gray-800">
                          {item.date}
                        </div>
                        <div className="px-4 py-4 text-center text-gray-800">
                          {item.views}
                        </div>
                      </div>
                    </td>
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
      </div>

      {/*모바일 */}
      <div className="mt-5 block rounded-xl bg-white px-2 shadow-lg md:hidden">
        {paginatedSuggestions.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="w-full px-4 py-2"
          >
            <MobileSuggestionList
              id={item.id}
              title={item.title}
              author={item.author}
              views={item.views}
              date={item.date}
              isLast={index === paginatedSuggestions.length - 1}
            />
          </div>
        ))}
        {/* <div className="mt-3 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
            size="small"
          />
        </div> */}
      </div>
    </>
  );
};
