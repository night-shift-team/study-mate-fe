import React, { Dispatch, SetStateAction } from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import MarkdownContent from '../model/markdownContentUpdate';
import useLexical from '../model/markdownEditorHook';

const EditorContainer = ({
  markdown,
  setMarkdown,
}: {
  markdown: string;
  editable?: boolean;
  setMarkdown?: Dispatch<SetStateAction<string>>;
}) => {
  const { onChange } = useLexical(setMarkdown);
  return (
    <div className="h-full w-full overflow-scroll scrollbar-hide">
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="editor-input prose prose-lg min-w-full !border-none !p-4 focus:outline-none" />
        }
        placeholder={<div></div>}
        ErrorBoundary={({ children }) => children}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin onChange={onChange} />
      <MarkdownContent markdown={markdown} />
    </div>
  );
};

export default EditorContainer;
