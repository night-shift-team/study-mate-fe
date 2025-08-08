'use client';

// import AuthHoc from '@/shared/auth/model/authHoc';

import useLevelTest from '../model/levelTestHook';
import { ProblemInfoMAQ } from '@/shared/problem/model/problemInfo.types';
import MarkdownComponent from '@/shared/lexical/model/markdownConfig';
import NewHeader from '@/feature/header/ui/newheader';
import Cancel from '@public/assets/icons/leveltest/cancel.svg';
import ButtonPixel from '@/shared/button/buttonPixel';
import { Icon } from '@iconify/react';
import arrow from '@iconify/icons-mdi/play-arrow';
import SelectAnswerRow from './levelTestAnswer';
import CircleCheck from '@public/assets/icons/leveltest/checkedCircle.svg';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
const AnswerListForm = dynamic(() => import('./answerListForm'), {
  ssr: false,
});

export type ChoiceAttrs = Pick<
  ProblemInfoMAQ,
  'choice1' | 'choice2' | 'choice3' | 'choice4'
>;

const LevelTestPage = () => {
  const {
    // isPageLoading,
    // isStarted,
    // setIsStarted,
    answerFormRef,
    currentQuestionNo,
    levelTestLists,
    isGetResultApiLoading,
    selectedAnswer,
    handleAnswerSelect,
    handleNextQuestion,
    handlePrevQuestion,
    answerListOpen,
    openAnswerList,
    closeAnswerList,
    answerClosedFormRef,
  } = useLevelTest();

  return (
    <div className="flex h-full w-full flex-col">
      <NewHeader
        left={
          <Link href={RouteTo.Home}>
            <Cancel className="mt-1 h-6 w-6" />
          </Link>
        }
        center={
          <div className="flex h-40p w-40p items-center justify-center rounded-12p bg-point-orange">
            <span className="mt-1 flex h-full w-auto items-center justify-center text-center font-plusJakarta">
              {String(currentQuestionNo + 1).padStart(2, '0') ?? ''}
            </span>
          </div>
        }
        right={
          <span className="mt-1 flex h-full w-auto items-center font-plusJakarta text-[16px] font-semibold leading-none">
            {currentQuestionNo + 1}/{levelTestLists.length}
          </span>
        }
      />
      <div className="mt-2 flex h-full w-full overflow-y-auto bg-grayscale-800 scrollbar-hide">
        <div className="flex h-full w-full flex-col">
          <span className="mt-6 flex w-full justify-center px-4 text-[28px] font-bold leading-[20px] text-[#FFD900]">
            Lv. {levelTestLists[currentQuestionNo]?.difficulty ?? ''}
          </span>{' '}
          <div className="mt-4 flex justify-center font-pretandard text-quiz-question">
            {levelTestLists[currentQuestionNo]?.questionTitle}
          </div>
          <div className="flex h-full w-full p-1">
            <MarkdownComponent
              markdown={levelTestLists[currentQuestionNo]?.content ?? ''}
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
                        {
                          (levelTestLists[currentQuestionNo] as ProblemInfoMAQ)[
                            `choice${selectedAnswer}` as keyof ChoiceAttrs
                          ]
                        }
                      </span>
                      <div className="h-[20px] w-[20px] rounded-full">
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
                <AnswerListForm
                  key={selectedAnswer}
                  answerFormRef={answerFormRef}
                  answerClosedFormRef={answerClosedFormRef}
                  answerListOpen={answerListOpen}
                  levelTestLists={levelTestLists}
                  currentQuestionNo={currentQuestionNo}
                  isGetResultApiLoading={isGetResultApiLoading}
                  handleAnswerSelect={handleAnswerSelect}
                  openAnswerList={openAnswerList}
                  closeAnswerList={closeAnswerList}
                  selectedAnswer={selectedAnswer}
                />
              </>
            </div>
            <div className="flex w-full gap-2 pb-4">
              {currentQuestionNo === levelTestLists.length - 1 ? (
                <ButtonPixel status="default" onClick={handleNextQuestion}>
                  Submit
                </ButtonPixel>
              ) : (
                <>
                  <div className="flex h-40p w-1/2">
                    <ButtonPixel
                      status={
                        isGetResultApiLoading || currentQuestionNo <= 0
                          ? 'inactive'
                          : 'default'
                      }
                      disabled={isGetResultApiLoading || currentQuestionNo <= 0}
                      onClick={handlePrevQuestion}
                    >
                      Back
                    </ButtonPixel>
                  </div>
                  <div className="flex h-40p w-1/2">
                    <ButtonPixel
                      status={
                        isGetResultApiLoading || selectedAnswer === null
                          ? 'inactive'
                          : 'default'
                      }
                      disabled={
                        isGetResultApiLoading || selectedAnswer === null
                      }
                      onClick={handleNextQuestion}
                    >
                      Next
                    </ButtonPixel>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelTestPage;
