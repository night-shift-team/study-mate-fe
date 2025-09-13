'use client';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useSuggestionDetailPage from '../model/suggestionDetailPageHook';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import CommentSection from './commentSection';
import { userStore } from '@/shared/state/userStore/model';

const SuggestionDetailPage = () => {
  const { suggestion, user } = useSuggestionDetailPage();
  const isuser = userStore.getState().user;

  if (!suggestion)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <UserStateWrapper>
      <div className="flex w-full flex-col bg-point-logo font-pretandard">
        <div className="bg-white p-16p text-white dark:bg-black">
          {/* <div className="mb-2 flex w-[100%] items-center justify-between text-sm text-gray-500">
              #{suggestion.id}
              <span className="relative">
                {user?.userId === suggestion.user.userId && (
                  <Image
                    src={MoreButton}
                    alt="More"
                    width={20}
                    height={5}
                    className="cursor-pointer"
                    onClick={handleMoreClick}
                  />
                )}
                {open && (
                  <div className="">
                    {typeof id === 'string' && (
                      <MoreBox
                        onClose={() => isOpen(false)}
                        boardId={Number(id)}
                      />
                    )}
                  </div>
                )}
              </span>
            </div> */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 font-pretandard text-[12px] text-black dark:text-white">
              <span>작성일: {suggestion.createdDt.slice(0, 10)}</span>
              <span>문의 닉네임: {suggestion.user.nickname}</span>
            </div>
            <div className="flex flex-col gap-16p text-black dark:text-white">
              <div className="flex gap-2">
                <span className="w-[30px]">Q</span>
                <h1 className="mb-4t ext-xl font-semibold">
                  {suggestion.title}
                </h1>
              </div>

              <div className="whitespace-pre-wrap">{suggestion.content}</div>
            </div>
          </div>
        </div>

        <CommentSection
          initialComments={suggestion.comments.map((c) => ({
            id: c.id,
            author: c.writer,
            content: c.content,
            date: new Date(c.createdDt).toISOString().split('T')[0],
          }))}
          role={isuser?.role}
          currentUserNickname={user?.loginId ?? ''}
          boardId={suggestion.id}
        />
      </div>
    </UserStateWrapper>
  );
};

export default SuggestionDetailPage;
