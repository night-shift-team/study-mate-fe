import MarkdownComponent from '@/shared/markdown/ui/showMarkdownData';
import { useState } from 'react';

const ContentsMarkDown = ({ markdown }: { markdown: string }) => {
  const [updateMarkdown, setUpdateMarkdown] = useState(markdown);

  return (
    <div className="flex min-h-80 w-full flex-shrink-0 flex-col rounded-2xl border">
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Contents
      </span>
      <div className="flex w-full bg-white">
        <MarkdownComponent
          markdown={updateMarkdown}
          editable={true}
          setMarkdown={setUpdateMarkdown}
        />
      </div>
      <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
        Preview
      </span>
      <div className="flex w-full bg-white">
        <MarkdownComponent markdown={updateMarkdown} />
      </div>
    </div>
  );
};
export default ContentsMarkDown;
