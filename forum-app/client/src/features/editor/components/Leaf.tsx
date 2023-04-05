import { RenderLeafProps } from 'slate-react';

export const Leaf = ({
  attributes,
  leaf,
  children,
}: RenderLeafProps): JSX.Element => {
  // let wrappedChildren = children;
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};
