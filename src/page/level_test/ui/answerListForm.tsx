'use client';
import {
  ProblemInfoLevelTest,
  ProblemInfoMAQ,
} from '@/shared/problem/model/problemInfo.types';
import SelectAnswerRow from './levelTestAnswer';
import CircleCheck from '@public/assets/icons/leveltest/checkedCircle.svg';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export type ChoiceAttrs = Pick<
  ProblemInfoMAQ,
  'choice1' | 'choice2' | 'choice3' | 'choice4'
>;
interface AnswerListFormProps {
  answerFormRef: React.RefObject<HTMLDivElement | null>;
  answerListOpen: boolean;
  levelTestLists: ProblemInfoLevelTest[];
  currentQuestionNo: number;
  isGetResultApiLoading: boolean;
  handleAnswerSelect: (index: number) => void;
  openAnswerList: () => void;
  closeAnswerList: () => void;
  selectedAnswer: number | null;
  answerClosedFormRef: React.RefObject<HTMLDivElement | null>;
  problemInfo?: ProblemInfoMAQ;
}

const AnswerListForm = ({
  answerListOpen,
  levelTestLists,
  currentQuestionNo,
  isGetResultApiLoading,
  handleAnswerSelect,
  closeAnswerList,
  selectedAnswer,
  answerFormRef,
  answerClosedFormRef,
  problemInfo,
}: AnswerListFormProps) => {
  if (!answerClosedFormRef.current) return;
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    if (!answerClosedFormRef.current) return;
    setIsMounted(true);
  }, [answerClosedFormRef.current]);

  return (
    <>
      {isMounted
        ? createPortal(
            <div
              ref={answerFormRef}
              className={`absolute bottom-0 left-0 z-[1] h-auto w-full origin-bottom rounded-[18px] bg-[#1F1F1F] ${answerListOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
            >
              {Array.from(
                {
                  length: Object.keys(
                    problemInfo
                      ? problemInfo
                      : (levelTestLists[currentQuestionNo] ?? [])
                  ).filter((keyValue) => keyValue.startsWith('choice') === true)
                    .length,
                },
                (_, i) => i
              ).map((index) => {
                return (
                  <SelectAnswerRow
                    key={index}
                    selected={selectedAnswer === index + 1}
                    onClick={() => {
                      if (isGetResultApiLoading) {
                        return;
                      }
                      // if (selectedAnswer === index + 1) {
                      //   closeAnswerList();
                      //   return;
                      // }
                      // if (isGetResultApiLoading) {
                      //   return;
                      // } else {
                      handleAnswerSelect(index + 1);
                      setTimeout(() => {
                        closeAnswerList();
                      }, 100);
                      return;
                      // }
                    }}
                  >
                    <span className="font-pretandard text-quiz-option">
                      {
                        (problemInfo
                          ? problemInfo
                          : (levelTestLists[
                              currentQuestionNo
                            ] as ProblemInfoMAQ))[
                          `choice${index + 1}` as keyof ChoiceAttrs
                        ]
                      }
                    </span>
                    {selectedAnswer === index + 1 ? (
                      <div className="h-[20px] w-[20px] shrink-0 rounded-full">
                        <CircleCheck className="h-full w-full" />
                      </div>
                    ) : (
                      <div className="h-[20px] w-[20px] shrink-0 rounded-full inner-border-2" />
                    )}
                  </SelectAnswerRow>
                );
              })}
            </div>,
            answerClosedFormRef.current
          )
        : null}
    </>
  );
};
export default AnswerListForm;
