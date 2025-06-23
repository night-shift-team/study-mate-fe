'use client';
import { useState } from 'react';
interface CategoryProps {
  data: {
    key: string;
    title: string;
    correct: number;
    total: number;
    color: string;
    border: string;
    text: string;
  }[];
  onSelectCategory: (key: string) => void;
}

export const Category = ({ data, onSelectCategory }: CategoryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    onSelectCategory(data[idx].key);
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-300 md:hidden">
        {data.map((category, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`pb-2 text-sm font-bold transition-colors ${
              selectedIndex === idx ? category.text : 'text-gray-400'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="hidden w-full flex-col gap-2 md:flex">
        {data.map((category, idx) => {
          const percentage =
            category.total > 0 ? (category.correct / category.total) * 100 : 0;

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`h-[80px] cursor-pointer flex-col justify-center rounded-md border-2 bg-white p-3 shadow-md transition-all duration-200 ${
                selectedIndex === idx ? category.border : 'border-transparent'
              }`}
            >
              <div className="flex w-full justify-between">
                <span className="text-sm font-bold">{category.title}</span>
                <span className="text-sm font-bold">
                  {category.correct}/{category.total}
                </span>
              </div>
              <div className="relative mt-2 h-[5px] w-full rounded-md bg-gray-300">
                <div
                  className={`absolute left-0 top-0 h-full rounded-md ${category.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
