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
