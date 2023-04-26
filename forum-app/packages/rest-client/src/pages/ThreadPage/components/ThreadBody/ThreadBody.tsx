import { RichTextEditor } from 'features/editor';
import './ThreadBody.scss';

interface ThreadBodyProps {
  body?: string;
}

export const ThreadBody = ({ body }: ThreadBodyProps) => {
  return (
    <div className="thread-body">
      <strong className="thread-body__label">Body</strong>
      <div className="thread-body__editor">
        <RichTextEditor existingBody={body} />
      </div>
    </div>
  );
};
