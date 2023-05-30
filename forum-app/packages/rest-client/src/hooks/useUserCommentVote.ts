import { useCallback } from 'react';

import { ThreadCommentPointDto } from '@shared/types';

import { ThreadCommentService } from 'services';
import { useLoader } from 'hooks';

interface UseUserCommentVoteResult {
  userCommentVote: ThreadCommentPointDto | null;
  isUserCommentVoteLoading: boolean;
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
    userCommentVote: data,
    isUserCommentVoteLoading: isLoading,
  };
};
