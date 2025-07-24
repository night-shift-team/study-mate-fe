'use client';
import { userStore } from '@/shared/state/userStore/model';
import useWriteSuggestionPage from '../model/writeSuggestionPageHook';

const WriteSuggestionPage = () => {
  const { title, setTitle, content, setContent, submitted, handleSubmit } =
    useWriteSuggestionPage();

  const user = userStore.getState().user;

  return (
    <div className="flex h-screen w-[90vw] flex-col">
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
        <div className="w-[200px] font-pixel text-[30px] font-bold leading-7 text-white">
          Hey {user?.nickname},<br /> What can I help you with
        </div>
        <div className="mt-2 text-white">
          <form className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
                className="w-full border-b border-white bg-transparent p-2 font-pixel font-semibold"
              />
            </div>

            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Text"
                className="h-80 w-full resize-none rounded-md border bg-transparent p-2 font-pixel font-semibold text-white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-3 w-full">
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-point-orange px-6 py-2 font-pixel font-semibold text-black transition-colors duration-200 hover:bg-orange-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default WriteSuggestionPage;
