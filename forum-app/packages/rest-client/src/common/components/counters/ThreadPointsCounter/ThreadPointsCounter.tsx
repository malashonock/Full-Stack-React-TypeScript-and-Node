import { useCallback } from 'react';

import {
  useAppSelector,
  useForceUpdate,
  useThread,
  useUserThreadVote,
} from 'hooks';
import { ThreadService } from 'services';
import { PointsCounterBase } from '../PointsCounterBase';
import { selectLoggedUser } from 'store/slices/auth.slice';

interface ThreadPointsCounter {
  threadId: string;
}

export const ThreadPointsCounter = ({ threadId }: ThreadPointsCounter) => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const { updateCounter, forceUpdate } = useForceUpdate();
  const thread = useThread(threadId, updateCounter);
  const userThreadVote = useUserThreadVote(
    loggedUser?.id,
    threadId,
    updateCounter,
  );

  const isAuthenticated = Boolean(loggedUser);
  const isOwn = Boolean(loggedUser && thread?.author.id === loggedUser?.id);

  const handleUpvote = useCallback(async () => {
    try {
      await ThreadService.upvoteThread(threadId);
      forceUpdate();
    } catch (error) {
      alert((error as Error).message);
    }
  }, [threadId]);

  const handleDownvote = useCallback(async () => {
    try {
      await ThreadService.downvoteThread(threadId);
      forceUpdate();
    } catch (error) {
      alert((error as Error).message);
    }
  }, [threadId]);

  return (
    <PointsCounterBase
      count={thread?.pointsSum || 0}
      isAuthenticated={isAuthenticated}
      isOwn={isOwn}
      currentVote={userThreadVote?.type ?? null}
      onUpvote={handleUpvote}
      onDownvote={handleDownvote}
    />
  );
};
