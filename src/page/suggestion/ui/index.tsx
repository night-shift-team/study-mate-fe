'use client';
import { SuggestionList } from './SuggestionList';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useSuggestionPage from '../model/suggestionPageHook';

const SuggestionPage = () => {
  const { list, router } = useSuggestionPage();
  if (list === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-[100vh] w-[90vw] max-w-[1100px]">
        <SuggestionList list={list} />
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-3xl bg-orange-300 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-500"
            onClick={() => {
              router.push(RouteTo.WriteSuggestion);
            }}
          >
            글 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
