import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { EditorThemeClasses } from 'lexical';

const MarkdownComponent = ({ markdown }: { markdown: string }) => {
  const LexicalErrorBoundary = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return children;
  };

  const theme: EditorThemeClasses = {
    text: {
      bold: 'font-semibold', // tailwind class
      italic: 'italic', //tailwind class
    },
  };
  const initialConfig = {
    namespace: 'markdown-editor',
    theme: theme,
    onError: (error: any) => console.error(error),
    editable: false,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="h-full w-full overflow-hidden">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="editor-input prose prose-lg min-w-full focus:outline-none" />
          }
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

        <MarkdownContent markdown={markdown} />
      </div>
    </LexicalComposer>
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
