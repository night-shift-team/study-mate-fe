'use client';

import { useState, useEffect } from 'react';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('건의사항 제출됨:', { title, content });

    setSubmitted(true);
    setTitle('');
    setContent('');
  };

  // 자동으로 알림 숨기기
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="relative w-full flex-col items-center">
      <div
        className={`absolute left-1/2 top-4 z-50 w-[90%] max-w-md -translate-x-1/2 transform rounded-md bg-green-500 px-4 py-3 text-center text-white shadow-lg transition-all duration-500 ease-in-out ${
          submitted
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-10 opacity-0'
        }`}
      >
        건의사항이 제출되었습니다!
      </div>

      <div className="flex h-[50px] items-center text-lg font-bold">
        건의사항 작성하기
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
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
