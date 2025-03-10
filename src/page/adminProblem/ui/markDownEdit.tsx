import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { useLayoutEffect, useRef, useState } from 'react';
import { useUpdateProblem } from '../model/updateProblemContext';

const ContentsMarkDown = () => {
  const { updateProblemInfo, setUpdateProblemInfo } = useUpdateProblem();
  const markDownSizeRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  const updateHeight = () => {
    requestAnimationFrame(() => {
      const height = markDownSizeRef.current?.getBoundingClientRect().height;
      setTextareaHeight(`${height}px`);
    });
  };
  useLayoutEffect(() => {
    updateHeight();
  }, [updateProblemInfo.markdown, textareaHeight]);

  return (
    <div className="flex min-h-80 w-full flex-shrink-0 flex-col rounded-2xl border md:flex-row">
      <div className="flex w-full flex-col">
        <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
          Contents
        </span>
        <div className="flex w-full bg-white text-center">
          <textarea
            placeholder="Enter some text..."
            className={`flex w-full rounded-2xl p-4`}
            style={{ height: textareaHeight }}
            value={updateProblemInfo.markdown}
            onChange={(e) =>
              setUpdateProblemInfo((prev) => ({
                ...prev,
                markdown: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="mt-2 w-full text-center text-lg font-bold text-gray-400">
          Preview
        </span>
        <div ref={markDownSizeRef} className="flex w-full bg-white">
          <MarkdownComponent markdown={updateProblemInfo.markdown} />
        </div>
      </div>
    </div>
  );
};

export default ContentsMarkDown;
