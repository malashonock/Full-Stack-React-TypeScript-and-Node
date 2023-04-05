import { useSlate } from 'slate-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faBold,
  faCode,
  faItalic,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';

import { EditorButton } from './EditorButton';
import { TextFormatType } from '../types';
import { CustomEditor } from '../utils';

interface MarkButtonProps {
  textFormat: TextFormatType;
}

export const MarkButton = ({ textFormat }: MarkButtonProps) => {
  const editor = useSlate();

  const icon: IconDefinition = ((): IconDefinition => {
    switch (textFormat) {
      case TextFormatType.Bold:
        return faBold;
      case TextFormatType.Italic:
        return faItalic;
      case TextFormatType.Underline:
        return faUnderline;
      case TextFormatType.Code:
        return faCode;
      default:
        throw new Error('Unsupported text format');
    }
  })();

  return (
    <EditorButton
      active={CustomEditor.isMarkActive(editor, textFormat)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, textFormat);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </EditorButton>
  );
};
