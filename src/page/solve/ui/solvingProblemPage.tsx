'use client';

// import { PiPaperPlaneTilt } from 'react-icons/pi';
// import { Spinner } from '@/feature/spinner/ui/spinnerUI';
// import { IoIosArrowForward } from 'react-icons/io';
// import { BookMarkCircle } from '@/feature/boomMark/ui/bookmarkCircle';
import useSolvingProblem, { QuestionType } from '../model/solvingProblemHook';
import MarkdownComponent from '@/shared/lexical/model/markdownConfig';
import {
  ProblemCategoryTitle,
  // ProblemCategoryType,
  ProblemInfoMAQ,
} from '@/shared/problem/model/problemInfo.types';
// import { SendMAQAnswerRes, SendSAQAnswerRes } from '../api';
// import {
//   ChoicedItemResult,
//   ChoiceItem,
// } from '@/feature/level_test/ui/ChoiceItem';
import CircleCheck from '@public/assets/icons/leveltest/checkedCircle.svg';
import { Icon } from '@iconify/react';
import arrow from '@iconify/icons-mdi/play-arrow';

// import Link from 'next/link';
import useSolveMainPage from '../model/solveMainPageHook';
import SelectAnswerRow from '@/page/level_test/ui/levelTestAnswer';
import AnswerListForm from '@/page/level_test/ui/answerListForm';
import ButtonPixel from '@/shared/button/buttonPixel';
import { ChoiceAttrs } from '@/page/level_test/ui';
import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import { SendMAQAnswerRes } from '../api';
import { useEffect, useLayoutEffect } from 'react';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { LucideHome } from 'lucide-react';
import Link from 'next/link';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Cancel from '@public/assets/icons/leveltest/cancel.svg';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';

export interface ProblemProps {
  category: 'random' | ProblemCategoryTitle;
}

const SolvingProblemPage = ({ category }: ProblemProps) => {
  const {
    currentQuestionWithType,
    problemAnswer,
    selectedAnswer,
    // setSelectedAnswer,
    sendAnswerButton,
    // bookMarkToggle,
    // handleNextButton,
    isLoading,
    // isPageLoading,
    // Toaster,
    // user,
    router,
    openAnswerList,
    answerListOpen,
    closeAnswerList,
    answerFormRef,
    answerClosedFormRef,
    handleAnswerSelect,
  } = useSolvingProblem(category as ProblemProps['category']);

  const { myTodaySolveData } = useSolveMainPage();
  const currentMyRemainQuizCount = myTodaySolveData?.find(
    (quiz) =>
      quiz.categoryName === currentQuestionWithType?.category.split('_')[0]
  );
  // "[\"Choice 1 for question 100\", \"Choice 2 for question 100\", \"Choice 3 for question 100\", \"Choice 4 for question 100\"]"
  const problemSolutionInfo =
    ((currentQuestionWithType && problemAnswer) ?? undefined) &&
    ({
      questionId: currentQuestionWithType!.id,
      questionTitle: currentQuestionWithType!.questionTitle,
      difficulty: currentQuestionWithType!.difficulty,
      options: `[\"${currentQuestionWithType!.choice1}\", \"${currentQuestionWithType!.choice2}\", \"${currentQuestionWithType!.choice3}\", \"${currentQuestionWithType!.choice4}\"]`,
      category: currentQuestionWithType!.category,
      answer: (problemAnswer as SendMAQAnswerRes).answer,
      answerExplanation: problemAnswer!.answerExplanation,
    } as ProblemDetailInfoRes);

  useEffect(() => {
    if (problemAnswer && problemSolutionInfo) {
      router.push(
        RouteTo.SolveSolution +
          `?problemInfo=${encodeURIComponent(JSON.stringify(problemSolutionInfo))}&userAnswer=${selectedAnswer}`
      );
    }
  }, [problemAnswer]);

  const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    if (currentQuestionWithType) {
      setPageLoader('loaded');
    }
  }, [currentQuestionWithType]);

  useLayoutEffect(() => {
    setPageLoader('loading');
    console.log('page loader status:', getPageLoader);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <>
        <div className="relative flex h-56p w-full shrink-0 items-center justify-center">
          <div className="absolute left-4 mt-2 flex">
            <Link href={RouteTo.Home}>
              <Cancel className="h-6 w-6" />
            </Link>
          </div>
          <Link
            href={RouteTo.Home}
            className="mt-2 flex h-40p w-40p items-center justify-center rounded-12p bg-point-orange"
          >
            <LucideHome />
          </Link>
          <div className="absolute right-4 mt-3 flex">
            <span className="mt-1 flex h-full w-auto items-center font-plusJakarta text-[16px] font-semibold leading-none">
              {currentMyRemainQuizCount?.userSolvingCount ?? 0}/
              {currentMyRemainQuizCount?.solvingLimit ?? 0}
            </span>
          </div>
        </div>
        <div className="mt-2 flex h-full w-full overflow-y-auto bg-grayscale-800 scrollbar-hide">
          <div className="flex h-full w-full flex-col">
            <span className="mt-6 flex w-full justify-center px-4 text-[28px] font-bold leading-[20px] text-[#FFD900]">
              Lv. {currentQuestionWithType?.difficulty ?? '0'}
            </span>{' '}
            <div className="mt-4 flex justify-center px-4 font-pretandard text-quiz-question">
              {currentQuestionWithType?.questionTitle}
            </div>
            <div className="w-full flex-1 basis-full p-1">
              <MarkdownComponent
                markdown={currentQuestionWithType?.content ?? ''}
              />
            </div>
            <div className="flex h-[18rem] w-full flex-col gap-6 bg-grayscale-900 px-4">
              <div ref={answerClosedFormRef} className="relative h-auto w-full">
                <>
                  {selectedAnswer !== null ? (
                    <div className="mt-6 h-[62px] w-full">
                      <SelectAnswerRow
                        selected={true}
                        onClick={() => {
                          if (answerListOpen) closeAnswerList();
                          else openAnswerList();
                        }}
                      >
                        <span className="font-pretandard text-quiz-option">
                          {currentQuestionWithType &&
                            currentQuestionWithType[
                              `choice${selectedAnswer}` as keyof ChoiceAttrs
                            ]}
                        </span>
                        <div className="h-[20px] w-[20px] shrink-0 rounded-full">
                          <CircleCheck className="h-full w-full" />
                        </div>
                      </SelectAnswerRow>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (answerListOpen) closeAnswerList();
                        else openAnswerList();
                      }}
                      className="relative mt-6 flex h-[62px] w-full items-center justify-between rounded-[18px] bg-[#1F1F1F] px-4"
                    >
                      <span className="font-pretandard text-quiz-option">
                        답 고르기
                      </span>
                      <div className="h-24p w-24p shrink-0">
                        <Icon
                          icon={arrow}
                          className="h-full w-full rotate-[270deg]"
                        />
                      </div>
                    </button>
                  )}
                  {!isLoading && answerListOpen && (
                    <AnswerListForm
                      key={selectedAnswer}
                      answerFormRef={answerFormRef}
                      answerClosedFormRef={answerClosedFormRef}
                      answerListOpen={answerListOpen}
                      levelTestLists={[]}
                      currentQuestionNo={0}
                      isGetResultApiLoading={false}
                      handleAnswerSelect={handleAnswerSelect}
                      openAnswerList={openAnswerList}
                      closeAnswerList={closeAnswerList}
                      selectedAnswer={Number(selectedAnswer)}
                      problemInfo={
                        currentQuestionWithType
                          ? (Object.fromEntries(
                              Object.entries(currentQuestionWithType).filter(
                                ([attr]) =>
                                  attr !== ('problemType' as keyof QuestionType)
                              )
                            ) as ProblemInfoMAQ)
                          : undefined
                      }
                    />
                  )}
                </>
              </div>
              <div className="flex w-full gap-2 pb-4">
                <ButtonPixel
                  status={isLoading ? 'inactive' : 'default'}
                  onClick={async () => {
                    if (!currentQuestionWithType || !selectedAnswer) return;
                    await sendAnswerButton(
                      currentQuestionWithType.id,
                      selectedAnswer
                    );
                  }}
                >
                  {isLoading ? <Spinner /> : 'Submit'}
                </ButtonPixel>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

// <div className="relative flex h-full w-full justify-center px-[2%] md:px-0">
//   <Toaster />
//   {isPageLoading ? (
//     <Spinner />
//   ) : (
//     <div className="flex h-full w-full max-w-[1200px] flex-col rounded-xl px-[2%] pb-[2%] pt-[1%] md:max-h-full md:min-h-[50vh]">
//       {!currentQuestionWithType ? (
//         '더 이상 풀 문제가 없습니다'
//       ) : (
//         <div className="flex h-full w-full flex-col">
//           <div className="flex h-full w-full flex-col pb-2 md:gap-2 md:p-2">
//             <div className="flex w-full items-end justify-between">
//               <div className="space-x-1 text-xl">
//                 <span>
//                   {category.at(0)
//                     ? category.at(0)?.toUpperCase() + category.slice(1)
//                     : ''}
//                 </span>
//                 <span
//                   className={`rounded-lg border p-0.5 px-1.5 text-[0.65rem] text-gray-800 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'bg-pointcolor-coral/40' : 'bg-pointcolor-apricot/40'}`}
//                 >
//                   {currentQuestionWithType?.problemType ===
//                   ProblemCategoryType.MAQ
//                     ? '객관식'
//                     : '주관식'}
//                 </span>
//               </div>
//               <button className="rounded-lg bg-pointcolor-beigebrown p-2 text-sm hover:cursor-auto">
//                 레벨 {currentQuestionWithType?.difficulty}
//               </button>
//             </div>
//             <div className="py-3 pl-2 font-bold">
//               {currentQuestionWithType?.questionTitle}
//             </div>
//             <div className="w-full flex-1 overflow-y-auto rounded-3xl bg-white p-2 shadow-md">
//               <MarkdownComponent
//                 markdown={currentQuestionWithType?.content ?? ''}
//               />
//             </div>
//           </div>

//           {problemAnswer ? (
//             <div className="flex w-full flex-col">
//               <div className="mt-4 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-3 md:text-base">
//                 {currentQuestionWithType?.problemType ===
//                 ProblemCategoryType.MAQ ? (
//                   Array.from({ length: 4 }, (_, i) => i).map((index) => {
//                     return (
//                       <ChoicedItemResult
//                         key={index}
//                         index={index}
//                         text={
//                           currentQuestionWithType[
//                             `choice${index + 1}` as Extract<
//                               keyof ProblemInfoMAQ,
//                               `choice${string}`
//                             >
//                           ]
//                         }
//                         userAnswer={selectedAnswer ?? ''}
//                         problemAnswer={
//                           (problemAnswer as SendMAQAnswerRes).answer
//                         }
//                       />
//                     );
//                   })
//                 ) : (
//                   <>
//                     <textarea
//                       className="w-full rounded-lg border p-2"
//                       value={selectedAnswer ?? ''}
//                       readOnly
//                     />
//                     <div
//                       className={`mt-4 flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 inner-border ${(problemAnswer as SendSAQAnswerRes).reflectedScore > 0 ? 'bg-correctGreen' : 'bg-wrongRed'}`}
//                     >
//                       <p className="text-sm text-gray-600">정답 : </p>
//                       <span>
//                         {(problemAnswer as SendSAQAnswerRes).modelAnswer}
//                       </span>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div
//                 className={`flex w-full flex-col md:pl-2 md:pr-3 ${currentQuestionWithType?.problemType === ProblemCategoryType.MAQ ? 'mt-4' : 'mt-2'} gap-0.5`}
//               >
//                 <div className="flex w-full flex-col rounded-xl bg-white px-4 py-3 inner-border">
//                   <p className="text-sm text-gray-600">해설 : </p>
//                   <span>{problemAnswer.answerExplanation}</span>
//                 </div>
//               </div>
//               <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
//                 {currentQuestionWithType ? (
//                   <div className="mr-1 flex h-full items-center gap-2 md:mr-4 md:mt-3 md:gap-2">
//                     <BookMarkCircle
//                       size={20}
//                       color="#b08968"
//                       strokeWidth={2.2}
//                       initialValue={false}
//                       onClick={async () =>
//                         await bookMarkToggle(currentQuestionWithType.id)
//                       }
//                     />
//                     <button
//                       disabled={problemAnswer === null}
//                       className={`flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
//                         problemAnswer === null
//                           ? 'cursor-not-allowed bg-gray-400 opacity-50'
//                           : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
//                       } text-white`}
//                       onClick={async () => {
//                         await handleNextButton();
//                       }}
//                     >
//                       <IoIosArrowForward
//                         color="white"
//                         className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
//                       />
//                     </button>
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           ) : (
//             <div className="flex w-full flex-col">
//               <div className="mt-2 flex w-full flex-col gap-2 text-sm md:gap-3 md:pl-2 md:pr-2 md:text-base">
//                 {currentQuestionWithType?.problemType ===
//                 ProblemCategoryType.MAQ
//                   ? Array.from({ length: 4 }, (_, i) => i).map((index) => {
//                       return (
//                         <ChoiceItem
//                           key={index}
//                           text={
//                             currentQuestionWithType[
//                               `choice${index + 1}` as Extract<
//                                 keyof ProblemInfoMAQ,
//                                 `choice${string}`
//                               >
//                             ]
//                           }
//                           isSelected={
//                             selectedAnswer === (index + 1).toString()
//                           }
//                           onClick={() => {
//                             if (isLoading) return;
//                             setSelectedAnswer((index + 1).toString());
//                           }}
//                         />
//                       );
//                     })
//                   : null}
//                 {currentQuestionWithType?.problemType ===
//                 ProblemCategoryType.SAQ ? (
//                   <textarea
//                     className="w-full rounded-lg border border-gray-300 p-2"
//                     placeholder="답을 입력해주세요"
//                     value={selectedAnswer ?? ''}
//                     onChange={(e) => {
//                       if (isLoading) return;
//                       setSelectedAnswer(e.target.value);
//                     }}
//                   />
//                 ) : null}
//               </div>
//               <div className="mt-2 flex w-full justify-end pb-4 pt-2 md:p-0 md:pb-10">
//                 {currentQuestionWithType ? (
//                   <button
//                     disabled={selectedAnswer === null}
//                     className={`mr-1 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
//                       selectedAnswer === null || isLoading
//                         ? 'cursor-not-allowed bg-gray-400 opacity-50'
//                         : 'bg-pointcolor-deepcoral hover:bg-pointcolor-deepcoral active:scale-95'
//                     } text-white`}
//                     onClick={async () => {
//                       if (!currentQuestionWithType || !selectedAnswer)
//                         return;
//                       await sendAnswerButton(
//                         currentQuestionWithType.id,
//                         selectedAnswer
//                       );
//                     }}
//                   >
//                     {isLoading ? (
//                       <Spinner size="xs" />
//                     ) : (
//                       <PiPaperPlaneTilt className="h-[18px] w-[18px]" />
//                     )}
//                   </button>
//                 ) : null}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )}
// </div>

export default SolvingProblemPage;
