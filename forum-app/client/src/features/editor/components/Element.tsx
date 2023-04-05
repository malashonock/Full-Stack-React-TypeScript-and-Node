import { RenderElementProps } from 'slate-react';

import { ElementType } from '../types';

export const Element = ({
  attributes,
  element,
  children,
}: RenderElementProps): JSX.Element => {
  switch (element.type) {
    case ElementType.BlockQuote:
      return <blockquote {...attributes}>{children}</blockquote>;
    case ElementType.Heading:
      return <h1 {...attributes}>{children}</h1>;
    case ElementType.BulletedList:
      return <ul {...attributes}>{children}</ul>;
    case ElementType.NumberedList:
      return <ol {...attributes}>{children}</ol>;
    case ElementType.ListItem:
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
