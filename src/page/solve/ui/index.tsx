'use client';
import LoginHoc from '@/shared/auth/model/authHoc';
import Link from 'next/link';
import { CategoryGridContents } from './categoryGridContents';

const SolveProblem = () => {
  return (
    <div className="flex h-full w-full flex-col px-[6rem] py-[8rem]">
      <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[25%] items-center justify-center px-[0.5rem] text-[3vh]">
          Computer Science
        </div>
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-start gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="운영체제" count={152} />
            <CategoryGridContents title="데이터베이스" count={152} />
            <CategoryGridContents title="네트워크" count={152} />
            <CategoryGridContents title={`자료구조와\n알고리즘`} count={152} />
          </div>
        </div>
      </div>
      <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-end gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="Javascript" count={152} />
            <CategoryGridContents title="React" count={152} />
            <CategoryGridContents title="Nextjs" count={152} />
          </div>
        </div>
        <div className="flex h-full w-[25%] items-center justify-center px-[0.5rem] text-[3vh]">
          Frontend
        </div>
      </div>
    </div>
  );
};
export default LoginHoc(SolveProblem);
