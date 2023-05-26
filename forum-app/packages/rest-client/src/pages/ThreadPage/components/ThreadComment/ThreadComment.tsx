import { ThreadCommentPointsCounter } from 'common/components';
import { UserNameAndTime } from '..';
import { RichTextEditor } from 'features/editor';

import './ThreadComment.scss';

interface ThreadCommentProps {
  threadId: string;
  commentId: string;
  body?: string;
  userName?: string;
  lastModifiedOn?: Date;
  pointsSum?: number;
}

export const ThreadComment = ({
  threadId,
  commentId,
  body,
  userName,
  lastModifiedOn,
}: ThreadCommentProps) => {
  return (
    <div className="thread-comment">
      <div className="thread-comment__header">
        <UserNameAndTime userName={userName} lastModifiedOn={lastModifiedOn} />
        <ThreadCommentPointsCounter threadId={threadId} commentId={commentId} />
      </div>
      <div className="thread-comment__editor">
        <RichTextEditor existingBody={body} />
      </div>
    </div>
  );
};
