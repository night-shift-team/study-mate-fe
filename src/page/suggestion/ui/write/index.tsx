'use client';

import { useState } from 'react';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 여기에 실제 서버 전송 코드 추가 가능 (예: fetch, axios)
    console.log('건의사항 제출됨:', { title, content });

    setSubmitted(true);
    setTitle('');
    setContent('');
  };

  return (
    <div className="w-full flex-col items-center">
      <div className="flex h-[50px] items-center text-lg font-bold">
        건의사항 작성하기
      </div>
      <div className="rounded-xl bg-white p-6 shadow-md">
        {submitted && (
          <div className="mb-4 font-semibold text-green-600">
            건의사항이 제출되었습니다!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="제목을 입력하세요"
              className="w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="건의하고 싶은 내용을 작성해주세요"
              className="h-40 w-full resize-none rounded-md border p-2"
            />
          </div>

          <div className="text-right">
            <button className="rounded-xl bg-orange-300 px-6 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-orange-500">
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
