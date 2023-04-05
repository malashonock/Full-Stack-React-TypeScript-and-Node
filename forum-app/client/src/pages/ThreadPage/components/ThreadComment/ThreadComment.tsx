import { LikesCount } from 'common/components';
import { UserNameAndTime } from '..';

import './ThreadComment.scss';
import { RichTextEditor } from 'features/editor';

interface ThreadCommentProps {
  body?: string;
  userName?: string;
  lastModifiedOn?: Date;
  likesCount?: number;
}

export const ThreadComment = ({
  body,
  userName,
  lastModifiedOn,
  likesCount,
}: ThreadCommentProps) => {
  return (
    <div className="thread-comment">
      <div className="thread-comment__header">
        <UserNameAndTime userName={userName} lastModifiedOn={lastModifiedOn} />
        <LikesCount count={likesCount || 0} />
      </div>
      <div className="thread-comment__editor">
        <RichTextEditor existingBody={body} />
      </div>
    </div>
  );
};
