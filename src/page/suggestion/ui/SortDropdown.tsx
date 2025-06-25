'use client';

import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const sortOptions = ['최신순', '조회순'];

export const SortDropdown = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      {/* 선택된 값 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm"
      >
        {selected}
        <IoChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 팝업 옵션 목록 */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full min-w-[100px] rounded-md border bg-white shadow-md">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                selected === option ? 'font-semibold text-blue-500' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
