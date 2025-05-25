'use client';

interface SuggestionItem {
  id: number;
  title: string;
  author: string;
  views: number;
  date: string;
}

const suggestions: SuggestionItem[] = [
  {
    id: 1,
    title: '문제가 엉망임',
    author: '헬로우',
    views: 231,
    date: '05-25',
  },
  {
    id: 2,
    title: '문제가 엉망임',
    author: '헬로우',
    views: 231,
    date: '05-25',
  },
];

export const SuggestionList = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">번호</th>
            <th className="border px-4 py-2">제목</th>
            <th className="border px-4 py-2">작성자</th>
            <th className="border px-4 py-2">조회</th>
            <th className="border px-4 py-2">날짜</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50">
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 text-center">{item.author}</td>
              <td className="border px-4 py-2 text-center">{item.views}</td>
              <td className="border px-4 py-2 text-center">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
