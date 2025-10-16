'use client';

import { ScrapsList } from '../ui/list/ScrapList';
import useMyPage from '../model/myPageHook';
import { useState } from 'react';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

export const ScrapsListPage = () => {
  const { favoriteList, isLoading } = useMyPage();
  const [selectedCategory, setSelectedCategory] =
    useState<string>('ALGORITHUM');

  const TapButton = [
    { id: 1, title: 'ALGORITHUM', textColor: 'text-point-pink' },
    { id: 2, title: 'NETWORK', textColor: 'text-point-cyan' },
    { id: 3, title: 'DB', textColor: 'text-point-orange' },
    { id: 4, title: 'OS', textColor: 'text-success' },
  ];
  const filteredList = (favoriteList || []).filter((item) =>
    item.questionCategory.startsWith(selectedCategory)
  );

  return (
    <div className="h-full w-full p-4 pt-20">
      <div className="flex flex-col gap-[20px]">
        <div className="text-title-page text-black dark:text-white">
          Scrap folders
        </div>
        <div className="flex gap-4 text-black dark:text-white">
          {TapButton.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedCategory(button.title)}
              className={`text-button-1 transition-colors ${
                selectedCategory === button.title
                  ? `${button.textColor}` // 선택된 색
                  : 'text-black dark:text-white'
              }`}
            >
              {button.title}
            </button>
          ))}
        </div>
        {!isLoading ? (
          <div className="h-[80vh] overflow-auto pb-[80px]">
            <ScrapsList
              favoriteList={(filteredList || []).map((item) => ({
                ...item,
                createdDt: String(item.createdDt),
              }))}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
