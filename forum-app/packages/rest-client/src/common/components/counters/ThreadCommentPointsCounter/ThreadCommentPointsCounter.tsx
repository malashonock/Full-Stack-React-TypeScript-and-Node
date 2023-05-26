import { useCallback } from 'react';

import { useForceUpdate, useThreadComment } from 'hooks';
import { ThreadCommentService } from 'services';
import { PointsCounterBase } from '../PointsCounterBase';

interface ThreadCommentPointsCounter {
  threadId: string;
  commentId: string;
}

export const ThreadCommentPointsCounter = ({
  threadId,
  commentId,
}: ThreadCommentPointsCounter) => {
  const { updateCounter, forceUpdate } = useForceUpdate();
  const comment = useThreadComment(threadId, commentId, updateCounter);

  const handleUpvote = useCallback(async () => {
    try {
      await ThreadCommentService.upvoteComment(threadId, commentId);
      forceUpdate();
    } catch (error) {
      alert((error as Error).message);
    }
  }, [threadId]);

  const handleDownvote = useCallback(async () => {
    try {
      await ThreadCommentService.downvoteComment(threadId, commentId);
      forceUpdate();
    } catch (error) {
      alert((error as Error).message);
    }
  }, [threadId]);

  return (
    <PointsCounterBase
      count={comment?.pointsSum || 0}
      onUpvote={handleUpvote}
      onDownvote={handleDownvote}
    />
  );
};
