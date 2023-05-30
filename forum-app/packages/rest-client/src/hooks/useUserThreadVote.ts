import { useCallback } from 'react';

import { ThreadPointDto } from '@shared/types';

import { ThreadService } from 'services';
import { useLoader } from 'hooks';

interface UseUserThreadVoteResult {
  userThreadVote: ThreadPointDto | null;
  isUserThreadVoteLoading: boolean;
}

export const useUserThreadVote = (
  userId: string | undefined,
  threadId: string,
  ...dependencies: any[]
): UseUserThreadVoteResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (
        userId: string,
        threadId: string,
      ): Promise<ThreadPointDto | null> =>
        await ThreadService.getUserThreadVote(userId, threadId),
      [],
    ),
    loaderArgs: [userId, threadId],
    initialValue: null,
    dependencies,
  });

  return {
    userThreadVote: data,
    isUserThreadVoteLoading: isLoading,
  };
};
