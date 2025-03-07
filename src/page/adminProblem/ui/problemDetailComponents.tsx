import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { IconType } from 'react-icons/lib';

export const TitleBox = ({ title }: { title: string }) => {
  return (
    <div className="flex h-16 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="font-bold text-[#FEA1A1]">Title</span>
      <span className="w-full break-words px-2 text-center text-xs md:w-auto">
        {title}
      </span>
    </div>
  );
};

export const AttrBox = ({
  title,
  content: Content,
}: {
  title: string;
  content: string | IconType;
}) => {
  return (
    <div className="flex h-16 w-full max-w-60 flex-col items-center justify-center rounded-2xl border bg-white md:min-w-60 md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="flex w-full items-end justify-center text-center font-bold text-[#FEA1A1]">
        {title}
      </span>
      <span
        className={`flex w-full justify-center break-words text-center text-xs ${Content.length > 10 ? 'tracking-[-0.05em]' : ''}`}
      >
        {typeof Content === 'string' ? (
          Content
        ) : (
          <div className="flex w-full justify-center">
            <Content size={'1.3rem'} color="#4bd352" />
          </div>
        )}
      </span>
    </div>
  );
};

export const ContentsMarkDown = ({ markdown }: { markdown: string }) => {
  return (
    <div className="flex min-h-80 w-full flex-shrink-0 flex-col rounded-2xl border">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Contents
      </span>
      <div className="flex w-full bg-white">
        <MarkdownComponent markdown={markdown} />
      </div>
    </div>
  );
};

export const Selections = () => {
  return (
    <div className="flex w-full grow flex-col gap-2 rounded-2xl border p-2">
      <span className="mt-2 text-center text-lg font-bold text-[#FEA1A1]">
        Selections
      </span>
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
