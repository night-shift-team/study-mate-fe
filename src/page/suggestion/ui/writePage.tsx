'use client';
import { userStore } from '@/shared/state/userStore/model';
import useWriteSuggestionPage from '../model/writeSuggestionPageHook';
import ButtonPixel from '@/shared/button/buttonPixel';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';

const WriteSuggestionPage = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    submitted,
    handleSubmit,
    isSumitting,
  } = useWriteSuggestionPage();

  const user = userStore.getState().user;

  return (
    <div className="flex w-full flex-col px-4">
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
        <div className="mt-4 font-pretandard text-title-section leading-[1.1] text-black dark:text-white">
          Hey <span className="font-pixel">{user?.nickname}</span>,<br /> What
          can I help you with?
        </div>
        <div className="mt-2 font-pretandard text-black dark:text-white">
          <form className="space-y-4" autoComplete="off">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
                className="w-full rounded-t-2xl border-b-[1.5px] border-black bg-transparent p-3 pl-3 font-semibold focus:outline-none dark:border-white"
              />
            </div>

            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Text"
                className="h-[clamp(50px,80vh,320px)] w-full resize-none rounded-md border-[1.5px] border-black bg-transparent p-3 font-semibold focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-3 w-full">
        <ButtonPixel
          status={isSumitting ? 'inactive' : 'default'}
          onClick={handleSubmit}
        >
          {isSumitting ? <ComponentLoader /> : 'Submit'}
        </ButtonPixel>
      </div>
    </div>
  );
};
export default WriteSuggestionPage;
