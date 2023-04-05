import { useSlate } from 'slate-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeading,
  faUnderline,
  faQuoteRight,
  faListOl,
  faListUl,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { EditorButton } from './EditorButton';
import { ElementType } from '../types';
import { CustomEditor } from '../utils';

interface BlockButtonProps {
  blockType: ElementType;
}

export const BlockButton = ({ blockType }: BlockButtonProps) => {
  const editor = useSlate();

  const icon: IconDefinition = ((): IconDefinition => {
    switch (blockType) {
      case ElementType.Heading:
        return faHeading;
      case ElementType.BlockQuote:
        return faQuoteRight;
      case ElementType.NumberedList:
        return faListOl;
      case ElementType.BulletedList:
        return faListUl;
      default:
        throw new Error('Unsupported block type');
    }
  })();

  return (
    <EditorButton
      active={CustomEditor.isBlockActive(editor, blockType)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, blockType);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </EditorButton>
  );
};
