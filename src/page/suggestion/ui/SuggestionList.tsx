'use client';

import { Pagination } from '@mui/material';
import { MobileSuggestionList } from './MobileSuggestionList';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import useSuggestionList, { SuggestionItem } from '../model/suggestionListHook';
import { NoticeList } from '@/shared/components/notice/NoticeList';
import useSuggestionDetailPage from '../model/suggestionDetailPageHook';

interface SuggestionListProps {
  list: SuggestionItem[];
  suggestionListHook: ReturnType<typeof useSuggestionList>;
}

export const SuggestionList = ({ suggestionListHook }: SuggestionListProps) => {
  const {
    paginatedSuggestions,
    currentPage,
    totalPages,
    handleChangePage,
    handleClick,
  } = suggestionListHook;

  return (
    <>
      {/* <div className="hidden h-[80vh] flex-col justify-center rounded-lg p-4 md:flex">
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
      </div> */}

      {/*모바일 */}
      <div className="flex flex-col gap-2">
        {paginatedSuggestions.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="flex flex-col gap-4"
          >
            <NoticeList
              status="Q"
              title={item.title}
              content={item.content}
              createdAt={item.date}
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
