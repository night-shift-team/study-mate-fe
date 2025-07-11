import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string; // MM-DD
}
type SortKey = 'date' | 'views';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

const useSuggestionList = (list: SuggestionItem[]) => {
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
  return {
    paginatedSuggestions,
    totalPages,
    currentPage,
    sortKey,
    sortOrder,
    handleChangePage,
    handleClick,
    handleSort,
  };
};
export default useSuggestionList;
