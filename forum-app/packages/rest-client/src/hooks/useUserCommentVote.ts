import { useCallback } from 'react';

import { ThreadCommentPointDto } from '@shared/types';

import { ThreadCommentService } from 'services';
import { useLoader } from 'hooks';

interface UseUserCommentVoteResult {
  vote: ThreadCommentPointDto | null;
  isVoteLoading: boolean;
}

export const useUserCommentVote = (
  userId: string | undefined,
  commentId: string,
  ...dependencies: any[]
): UseUserCommentVoteResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (
        userId: string,
        commentId: string,
      ): Promise<ThreadCommentPointDto | null> =>
        await ThreadCommentService.getUserCommentVote(userId, commentId),
      [],
    ),
    loaderArgs: [userId, commentId],
    initialValue: null,
    dependencies,
  });

  return {
    vote: data,
    isVoteLoading: isLoading,
  };
};
