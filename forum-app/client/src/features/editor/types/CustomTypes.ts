import { BaseEditor, Element, Text } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export enum ElementType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  BlockQuote = 'block-quote',
  BulletedList = 'bulleted-list',
  NumberedList = 'numbered-list',
  ListItem = 'list-item',
}

export enum TextFormatType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Code = 'code',
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface ParagraphElement {
  type: ElementType.Paragraph;
  children: CustomText[];
}

export type CustomElement = {
  type: ElementType;
  children: CustomText[];
};

export interface FormattedText {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  code?: true;
}

export type CustomText = FormattedText;

declare module 'slate' {
  export interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
