import { ElementType, TextFormatType } from './types';

export const HOTKEYS: { [hotkey: string]: TextFormatType } = {
  'mod+b': TextFormatType.Bold,
  'mod+i': TextFormatType.Italic,
  'mod+u': TextFormatType.Underline,
  'mod+`': TextFormatType.Code,
};

export const LIST_TYPES: ElementType[] = [
  ElementType.NumberedList,
  ElementType.BulletedList,
];
