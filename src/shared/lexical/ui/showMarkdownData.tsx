import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import {
  $getRoot,
  COMMAND_PRIORITY_CRITICAL,
  EditorState,
  EditorThemeClasses,
  INSERT_LINE_BREAK_COMMAND,
  KEY_ENTER_COMMAND,
} from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

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

const EditorContainer = ({
  markdown,
  editable,
  setMarkdown,
}: {
  markdown: string;
  editable?: boolean;
  setMarkdown?: Dispatch<SetStateAction<string>>;
}) => {
  const [editor] = useLexicalComposerContext();
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      if (setMarkdown) {
        console.log('transformer');
        const newMarkdown =
          root.getChildrenSize() === 0
            ? ''
            : $convertToMarkdownString(TRANSFORMERS);
        setMarkdown((prevMarkdown) =>
          prevMarkdown !== newMarkdown ? newMarkdown : prevMarkdown
        );
        console.log(newMarkdown);
      }
    });
  };

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event && event.shiftKey) {
          editor.dispatchCommand(INSERT_LINE_BREAK_COMMAND, true);
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

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

const MarkdownContent = ({ markdown }: { markdown: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(markdown, TRANSFORMERS);
    });
  }, [editor, markdown]);

  return null;
};

export default MarkdownComponent;
