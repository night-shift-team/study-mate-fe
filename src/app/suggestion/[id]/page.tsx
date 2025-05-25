'use client';

import { useParams } from 'next/navigation';

const SuggestionDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="flex h-screen w-[90vw] max-w-[1100px] flex-col">
      <div className="flex h-[50px] items-center text-lg font-bold">
        건의사항
      </div>
      <div className="rounded-xl bg-white p-6 shadow-md">
        작성자 :<p>건의 ID: {id}</p>
        <div>
          <label className="mb-1 block font-medium">제목</label>
          <div className="w-full rounded-md border p-2"></div>
        </div>
        <div>
          <label className="mb-1 block font-medium">내용</label>
          <div className="h-40 w-full resize-none rounded-md border p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionDetailPage;
