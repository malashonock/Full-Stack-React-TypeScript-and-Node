import { useCallback } from 'react';

import {
  useAppSelector,
  useForceUpdate,
  useThreadComment,
  useUserCommentVote,
} from 'hooks';
import { ThreadCommentService } from 'services';
import { PointsCounterBase } from '../PointsCounterBase';
import { selectLoggedUser } from 'store/slices/auth.slice';

interface ThreadCommentPointsCounter {
  threadId: string;
  commentId: string;
}

export const ThreadCommentPointsCounter = ({
  threadId,
  commentId,
}: ThreadCommentPointsCounter) => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const { updateCounter, forceUpdate } = useForceUpdate();
  const { comment } = useThreadComment(threadId, commentId, updateCounter);
  const { userCommentVote } = useUserCommentVote(
    loggedUser?.id,
    commentId,
    updateCounter,
  );

  const isAuthenticated = Boolean(loggedUser);
  const isOwn = Boolean(loggedUser && comment?.author.id === loggedUser?.id);

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
      isAuthenticated={isAuthenticated}
      isOwn={isOwn}
      currentVote={userCommentVote?.type ?? null}
      onUpvote={handleUpvote}
      onDownvote={handleDownvote}
    />
  );
};
