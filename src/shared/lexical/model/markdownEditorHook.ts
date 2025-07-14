import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Dispatch, SetStateAction, useEffect } from 'react';

import {
  $getRoot,
  COMMAND_PRIORITY_CRITICAL,
  EditorState,
  INSERT_LINE_BREAK_COMMAND,
  KEY_ENTER_COMMAND,
} from 'lexical';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';

const useLexical = (
  setMarkdown: Dispatch<SetStateAction<string>> | undefined
) => {
  const [editor] = useLexicalComposerContext();
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      if (setMarkdown) {
        const newMarkdown =
          root.getChildrenSize() === 0
            ? ''
            : $convertToMarkdownString(TRANSFORMERS);
        setMarkdown((prevMarkdown) =>
          prevMarkdown !== newMarkdown ? newMarkdown : prevMarkdown
        );
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

  return { editor, onChange };
};

export default useLexical;
