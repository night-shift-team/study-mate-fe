import { SuggestionList } from './SuggestionList';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { usePathname, useRouter } from 'next/navigation';

export const Suggestion = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[90vw]">
      <div className="flex h-[50px] items-center text-lg font-bold">
        {' '}
        건의사항
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <SuggestionList />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="rounded-xl bg-orange-300 px-6 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-orange-500"
          onClick={() => {
            router.push(RouteTo.WriteSuggestion);
          }}
        >
          글 작성하기
        </button>
      </div>
    </div>
  );
};
