'use client';

import { ScrapsList } from '../ui/list/ScrapList';
import useMyPage from '../model/myPageHook';

export const ScrapsListPage = () => {
  const { favoriteList } = useMyPage();

  return (
    <div className="flex flex-col gap-2 p-8p">
      <div className="text-title-page text-black dark:text-white">
        Scrap folders
      </div>
      <div className="mt-[20px] h-[85vh] overflow-auto pb-[100px]">
        <ScrapsList
          favoriteList={(favoriteList || []).map((item) => ({
            ...item,
            createdDt: String(item.createdDt),
          }))}
        />
      </div>
    </div>
  );
};
