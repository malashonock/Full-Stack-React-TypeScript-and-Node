import { useCallback } from 'react';

import { useForceUpdate, useThread } from 'hooks';
import { ThreadService } from 'services';
import { PointsCounterBase } from '../PointsCounterBase';

interface ThreadPointsCounter {
  threadId: string;
}

export const ThreadPointsCounter = ({ threadId }: ThreadPointsCounter) => {
  const { updateCounter, forceUpdate } = useForceUpdate();
  const thread = useThread(threadId, updateCounter);

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
      onUpvote={handleUpvote}
      onDownvote={handleDownvote}
    />
  );
};
