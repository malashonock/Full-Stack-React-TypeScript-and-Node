import { RefObject, useRef } from 'react';

import { ThreadCommentPointsCounter } from 'common/components';
import { UserNameAndTime } from '..';
import { RichTextEditor } from 'features/editor';
import { useOnViewEffect } from 'hooks';
import { ThreadCommentService } from 'services';

import './ThreadComment.scss';

interface ThreadCommentProps {
  threadId: string;
  commentId: string;
  body?: string;
  userName?: string;
  lastModifiedOn?: Date;
  pointsSum?: number;
  threadTreeLoadedRef?: RefObject<boolean>;
}

export const ThreadComment = ({
  threadId,
  commentId,
  body,
  userName,
  lastModifiedOn,
  threadTreeLoadedRef,
}: ThreadCommentProps) => {
  const commentRef = useRef<HTMLDivElement>(null);

  useOnViewEffect(
    commentRef,
    async () => {
      if (commentId) {
        await ThreadCommentService.viewComment(commentId);
      }
    },
    !threadTreeLoadedRef?.current,
  );

  return (
    <div className="thread-comment" ref={commentRef}>
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
