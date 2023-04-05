import { useCallback, useEffect, useMemo, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

import {
  BlockButton,
  EditorToolbar,
  Element,
  Leaf,
  MarkButton,
} from './components';
import { ElementType, TextFormatType } from './types';
import { CustomEditor, Serializer } from './utils';
import { HOTKEYS } from './constants';

interface RichEditorProps {
  existingBody?: string;
}

const initialValue: Descendant[] = [
  {
    type: ElementType.Paragraph,
    children: [{ text: 'Enter your post here.' }],
  },
];

export const RichTextEditor = ({ existingBody }: RichEditorProps) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const renderElement = useCallback(Element, []);
  const renderLeaf = useCallback(Leaf, []);

  useEffect(() => {
    if (existingBody) {
      editor.children = Serializer.deserialize(existingBody);
      editor.onChange();
    }
  }, [existingBody]);

  return (
    <Slate editor={editor} value={initialValue}>
      <EditorToolbar>
        <MarkButton textFormat={TextFormatType.Bold} />
        <MarkButton textFormat={TextFormatType.Italic} />
        <MarkButton textFormat={TextFormatType.Underline} />
        <MarkButton textFormat={TextFormatType.Code} />
        <BlockButton blockType={ElementType.Heading} />
        <BlockButton blockType={ElementType.BlockQuote} />
        <BlockButton blockType={ElementType.NumberedList} />
        <BlockButton blockType={ElementType.BulletedList} />
      </EditorToolbar>
      <Editable
        className="editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>): void => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const textFormat = HOTKEYS[hotkey];
              CustomEditor.toggleMark(editor, textFormat);
            }
          }
        }}
      />
    </Slate>
  );
};
