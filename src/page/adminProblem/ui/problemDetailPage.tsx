'use client';

import { MdCheck } from 'react-icons/md';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

import AuthHoc from '@/shared/auth/model/authHoc';
import useProblemDetail from '../model/problemDetailHook';
import {
  Answer,
  AttrBox,
  ContentsMarkDown,
  ModelAnswer,
  Solution,
  TitleBox,
} from '@/feature/adminProblem/ui/problemDetailComponents';

const ProblemDetailPage = () => {
  const { problemDetailInfo } = useProblemDetail();

  return (
    <div className="flex h-full w-full max-w-[80rem] flex-col items-center p-4">
      <div className="fixed flex h-12 w-full max-w-[80rem] items-center justify-between border-b-2 bg-pointcolor-sand px-4">
        <span className="flex h-12 max-w-full items-center justify-center text-xl font-bold">
          Problem {problemDetailInfo?.questionId}
        </span>
        <div className="flex gap-1">
          <button className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border bg-white text-sm hover:bg-pointcolor-coral/30">
            <Link href={RouteTo.AdminManagementProblemUpdate}>문제 수정</Link>
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
        <TitleBox title={problemDetailInfo?.questionTitle ?? ''} />
        <div
          id="horizontal-scroll-container"
          className="w-ful grid grid-flow-col grid-cols-3 grid-rows-2 gap-2 md:min-h-16 md:grid-cols-[repeat(5,min-content)] md:grid-rows-1 md:overflow-x-auto md:scrollbar-hide"
        >
          <AttrBox
            title="Category"
            content={problemDetailInfo?.category.split('_')[0] ?? ''}
          />
          <AttrBox
            title="Difficulty"
            content={problemDetailInfo?.difficulty.toString() ?? ''}
          />
          <AttrBox
            title="Type"
            content={problemDetailInfo?.category.split('_')[1] ?? ''}
          />
          <AttrBox
            title="Activate"
            content={problemDetailInfo ? MdCheck : ''}
          />
        </div>
        <ContentsMarkDown markdown={problemDetailInfo?.content ?? ''} />
        <Answer updateProblemInfo={problemDetailInfo} />
        <ModelAnswer problemDetailInfo={problemDetailInfo} />
        <Solution problemDetailInfo={problemDetailInfo} />
      </div>
    </div>
  );
};
export default AuthHoc(ProblemDetailPage);
