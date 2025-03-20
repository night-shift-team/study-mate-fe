'use client';

import { ProblemDetailPageProps } from '@/app/admin/management/problem/detail/page';
import { useLayoutEffect, useState } from 'react';
import { HorizonTalScrollContainer } from '@/shared/eventListeners/model/mouseEvents';
import { MdCancel } from 'react-icons/md';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import {
  AttrBox,
  ContentsMarkDown,
  Selections,
  TitleBox,
} from './problemDetailComponents';
import { QuizQuestion } from '@/entities/test';
import AuthHoc from '@/shared/auth/model/authHoc';

export interface SelectedProblem extends QuizQuestion {
  markdown: string;
}

const ProblemDetail = ({ id }: ProblemDetailPageProps) => {
  const [selectedProblem, setSelectedProblem] =
    useState<SelectedProblem | null>(null);

  useLayoutEffect(() => {
    const localProblemData = localStorage.getItem('selectedProblemInfo');
    if (localProblemData) {
      setSelectedProblem(JSON.parse(localProblemData));
    } else {
      //TODO: problem info api call and set selectedProblem
    }
  }, []);

  useLayoutEffect(() => {
    HorizonTalScrollContainer();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start p-4">
      <div className="fixed left-0 flex h-12 w-full items-center justify-between bg-white px-4">
        <span className="flex h-12 w-28 items-center justify-center text-xl font-bold">
          Problem {id}
        </span>
        <div className="flex gap-1">
          <button className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border text-sm">
            <Link
              href={{
                pathname: RouteTo.AdminManagementProblemUpdate,
                query: {
                  id: selectedProblem?.id,
                },
              }}
            >
              문제 수정
            </Link>
          </button>
          <button
            disabled={true}
            className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border bg-gray-100 text-sm"
          >
            문제 삭제
          </button>
        </div>
      </div>
      <div className="mt-14 flex h-[calc(100%-4rem)] w-full flex-col gap-2 overflow-y-auto scrollbar-hide">
        <TitleBox title={selectedProblem?.question ?? ''} />
        <div
          id="horizontal-scroll-container"
          className="w-ful grid grid-flow-col grid-cols-3 grid-rows-2 gap-2 md:min-h-16 md:grid-cols-[repeat(5,min-content)] md:grid-rows-1 md:overflow-x-auto md:scrollbar-hide"
        >
          <AttrBox title="Category" content="운영체제" />
          <AttrBox title="Level" content="5" />
          <AttrBox title="Type" content="객관식" />
          <AttrBox title="CreatedDt" content="24.05.31 00:14" />
          <AttrBox title="Activate" content={MdCancel} />
        </div>
        <ContentsMarkDown markdown={selectedProblem?.markdown ?? ''} />
        <Selections />
        <div className="flex w-full flex-col gap-2 rounded-2xl border p-2">
          <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
            Solution
          </span>
          <span className="w-full break-words px-2 text-center text-xs">
            {selectedProblem?.explanation}
          </span>
        </div>
      </div>
    </div>
  );
};
export default AuthHoc(ProblemDetail);
