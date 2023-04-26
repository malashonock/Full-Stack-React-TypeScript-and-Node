import { Node, Editor, Element, Transforms } from 'slate';

import { ElementType, TextFormatType } from '../types';
import { LIST_TYPES } from '../constants';

export const CustomEditor = {
  isMarkActive(editor: Editor, textFormat: TextFormatType): boolean {
    const marks = Editor.marks(editor);
    return marks ? !!marks[textFormat] : false;
  },

  toggleMark(editor: Editor, textFormat: TextFormatType): void {
    const isMarkActive = CustomEditor.isMarkActive(editor, textFormat);

    if (isMarkActive) {
      Editor.removeMark(editor, textFormat);
    } else {
      Editor.addMark(editor, textFormat, true);
    }
  },

  isBlockActive(editor: Editor, blockType: ElementType): boolean {
    const match = Editor.nodes(editor, {
      match(node: Node): boolean {
        return Object.hasOwn(node, 'type')
          ? (node as Element).type === blockType
          : false;
      },
    });

    return [...match].length > 0;
  },

  toggleBlock(editor: Editor, blockType: ElementType): void {
    const isBlockActive = CustomEditor.isBlockActive(editor, blockType);
    const isList = LIST_TYPES.includes(blockType);

    // Unwrap lists
    Transforms.unwrapNodes(editor, {
      match(node: Node): boolean {
        return Object.hasOwn(node, 'type')
          ? LIST_TYPES.includes((node as Element).type)
          : false;
      },
      split: true,
    });

    // Update selected nodes type
    const type: ElementType = (() => {
      if (isBlockActive) {
        return ElementType.Paragraph;
      }

      if (isList) {
        return ElementType.ListItem;
      }

      return blockType;
    })();

    Transforms.setNodes(editor, {
      type,
    });

    // If we're marking a fragment as a list,
    // wrap the selection under a new list root
    if (!isBlockActive && isList) {
      const listRoot: Element = {
        type: blockType,
        children: [],
      };

      Transforms.wrapNodes(editor, listRoot);
    }
  },
};
