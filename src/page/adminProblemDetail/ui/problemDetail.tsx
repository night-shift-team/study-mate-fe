'use client';

import { ProblemDetailPageProps } from '@/app/admin/management/problem/detail/page';
import MarkdownComponent from '@/shared/markdown/ui/showMarkdownData';

const ProblemDetail = ({ params }: { params: ProblemDetailPageProps }) => {
  const id = params.id;
  const title = params.title;
  const descr = params.descr;
  const markdown = params.markdown;

  return (
    <div className="flex h-full w-full flex-col items-start p-4">
      <div className="fixed left-0 flex h-12 w-full items-center justify-between bg-white px-4">
        <span className="flex h-12 w-28 items-center justify-center text-xl">
          Problem {id}
        </span>
        <div className="flex gap-1">
          <button className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border text-sm">
            문제 수정
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
        <TitleBox title={title} />
        <div className="grid w-full grid-flow-col grid-cols-3 grid-rows-2 gap-2">
          <AttrBox title="Category" content="운영체제" />
          <AttrBox title="Level" content="5" />
          <AttrBox title="Type" content="객관식" />
          <AttrBox title="CreatedDt" content="24.05.31 00:14" />
          <AttrBox title="Activate" content="X" />
        </div>
        <ContentsMarkDown markdown={markdown} />
        <Selections />
        <div className="flex w-full flex-col gap-2 rounded-2xl bg-gray-200 p-2">
          <span className="mt-2 w-full text-center text-lg">Solution</span>
          <span className="w-full break-words px-2 text-center text-xs">
            {descr}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProblemDetail;

const TitleBox = ({ title }: { title: string }) => {
  return (
    <div className="flex h-20 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border bg-gray-200">
      <span className="text-lg">Title</span>
      <span className="w-full break-words px-2 text-center text-xs">
        {title}
      </span>
    </div>
  );
};

const AttrBox = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex h-16 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border bg-gray-200">
      <span className="w-full text-center text-lg">{title}</span>
      <span
        className={`w-full break-words text-center text-xs ${content.length > 10 ? 'tracking-[-0.05em]' : ''}`}
      >
        {content}
      </span>
    </div>
  );
};

const ContentsMarkDown = ({ markdown }: { markdown: string }) => {
  return (
    <div className="flex min-h-80 w-full flex-shrink-0 flex-col rounded-2xl bg-gray-200">
      <span className="mt-2 w-full text-center text-lg">Contents</span>
      <div className="flex w-full">
        <MarkdownComponent markdown={markdown} />
      </div>
    </div>
  );
};

const Selections = () => {
  return (
    <div className="flex w-full grow flex-col gap-2 rounded-2xl bg-gray-200 p-2">
      <span className="mt-2 text-center text-lg">Selections</span>
      <div className="flex w-full flex-col gap-1 px-2 text-[0.7rem]">
        <span>
          1.
          --------------------------------------------------------------------
        </span>
        <span>
          2.
          --------------------------------------------------------------------
        </span>
        <span>
          3.
          --------------------------------------------------------------------
        </span>
        <span>
          4.
          --------------------------------------------------------------------
        </span>
        <span>
          5.
          --------------------------------------------------------------------
        </span>
      </div>
    </div>
  );
};
