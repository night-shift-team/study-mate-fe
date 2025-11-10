import { EditorThemeClasses } from 'lexical';
import { Dispatch, SetStateAction } from 'react';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import EditorContainer from '../ui/editorContainer';

const MarkdownComponent = ({
  markdown,
  editable,
  setMarkdown,
}: {
  markdown: string;
  editable?: boolean;
  setMarkdown?: Dispatch<SetStateAction<string>>;
}) => {
  const theme: EditorThemeClasses = {
    text: {
      bold: 'font-semibold',
      italic: 'italic',
    },
    paragraph: 'whitespace-pre-wrap',
    code: 'bg-gray-100 text-gray-800 font-mono p-2 rounded block whitespace-pre-wrap no-before no-after',

    // 🔽 여기가 핵심
    list: {
      // 기본 ul 스타일
      ul: 'list-disc list-outside ml-6 my-1',
      // 기본 ol 스타일
      ol: 'list-decimal list-outside ml-6 my-1',

      // 각 li 스타일
      listitem: 'my-0.5',

      // 체크리스트 쓸 경우 (안 쓰면 빼도 됨)
      checklist: 'list-none ml-0',
      listitemChecked: 'line-through text-gray-400',
      listitemUnchecked: '',

      // 중첩 리스트 스타일
      nested: {
        list: 'ml-4',
        listitem: 'my-0.5',
      },

      // 필요하면 깊이에 따라 다른 스타일도 가능 (안 써도 됨)
      // ulDepth: ['ml-4', 'ml-8', 'ml-12'],
      // olDepth: ['ml-4', 'ml-8', 'ml-12'],
    },
  };
  const initialConfig = {
    namespace: 'markdown-editor',
    theme: theme,
    onError: (error: any) => console.error(error),
    editable: editable ?? false,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer
        markdown={markdown}
        editable={editable}
        setMarkdown={setMarkdown}
      />
    </LexicalComposer>
  );
};
export default MarkdownComponent;
