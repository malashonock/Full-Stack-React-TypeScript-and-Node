import { Descendant, Node } from 'slate';
import { ElementType } from '../types';

export const Serializer = {
  serialize(nodes: Descendant[]) {
    return nodes
      .map((node: Descendant): string => Node.string(node))
      .join('\n');
  },

  deserialize(text: string): Descendant[] {
    return text.split('\n').map(
      (line: string): Descendant => ({
        type: ElementType.Paragraph,
        children: [{ text: line }],
      }),
    );
  },
};
