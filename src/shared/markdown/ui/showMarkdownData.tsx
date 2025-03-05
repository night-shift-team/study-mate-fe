import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  $createRangeSelection,
  $getSelection,
  $setSelection,
  EditorState,
  EditorThemeClasses,
  RangeSelection,
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
      bold: 'font-semibold', // tailwind class
      italic: 'italic', //tailwind class
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
      <EditorContainer markdown={markdown} editable={editable} />
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
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      if (setMarkdown) {
        setMarkdown(markdown);
      }
    });
  };
  const LexicalErrorBoundary = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return children;
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="editor-input prose prose-lg min-w-full !border-none !p-4 focus:outline-none" />
        }
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin onChange={onChange} />
      <SelectionPlugin editable={editable} />
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

const SelectionPlugin = ({ editable }: { editable?: boolean }) => {
  if (!editable) return;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection() as RangeSelection;
        if (selection && selection.isCollapsed() && !editor._editable) {
          editor.update(() => {
            const currentSelection = $createRangeSelection();
            currentSelection.anchor.set(
              selection.anchor.key,
              selection.anchor.offset,
              selection.anchor.type
            );
            currentSelection.focus.set(
              selection.focus.key,
              selection.focus.offset,
              selection.focus.type
            );
            $setSelection(currentSelection);
          });
        }
      });
    });
  }, [editor]);

  return null;
};
export default MarkdownComponent;
