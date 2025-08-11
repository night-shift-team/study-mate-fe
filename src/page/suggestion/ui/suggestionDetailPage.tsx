'use client';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import MoreButton from '../../../../public/assets/icons/suggestion/more.png';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import useSuggestionDetailPage from '../model/suggestionDetailPageHook';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import { MoreBox } from './moreBox';
import CommentSection from './commentSection';
import { userStore } from '@/shared/state/userStore/model';

const SuggestionDetailPage = () => {
  const { suggestion, user, id, handleMoreClick, open, isOpen } =
    useSuggestionDetailPage();
  const isuser = userStore.getState().user;

  if (!suggestion)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <div className="mt-5 flex w-full flex-col">
          <div className="flex-1 p-16p text-white">
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

            <div className="flex flex-col gap-16p">
              <div className="flex gap-2">
                <span className="w-[30px]">Q</span>
                <h1 className="mb-4t ext-xl font-semibold">
                  {suggestion.title}
                </h1>
              </div>

              <div className="whitespace-pre-wrap">{suggestion.content}</div>
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
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default SuggestionDetailPage;
