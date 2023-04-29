import { PointsCounter } from 'common/components';
import { UserNameAndTime } from '..';
import { RichTextEditor } from 'features/editor';

import './ThreadComment.scss';

interface ThreadCommentProps {
  body?: string;
  userName?: string;
  lastModifiedOn?: Date;
  pointsSum?: number;
}

export const ThreadComment = ({
  body,
  userName,
  lastModifiedOn,
  pointsSum,
}: ThreadCommentProps) => {
  return (
    <div className="thread-comment">
      <div className="thread-comment__header">
        <UserNameAndTime userName={userName} lastModifiedOn={lastModifiedOn} />
        <PointsCounter count={pointsSum || 0} />
      </div>
      <div className="thread-comment__editor">
        <RichTextEditor existingBody={body} />
      </div>
    </div>
  );
};
