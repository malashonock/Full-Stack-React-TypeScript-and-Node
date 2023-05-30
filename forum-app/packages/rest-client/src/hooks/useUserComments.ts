import { useCallback } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';
import { useLoader } from 'hooks';

interface UseUserCommentsResult {
  userComments: ThreadCommentDto[];
  areUserCommentsLoading: boolean;
}

export const useUserComments = (
  userId: string | undefined,
  ...dependencies: any[]
): UseUserCommentsResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (userId: string): Promise<ThreadCommentDto[]> =>
        await ThreadCommentService.getUserComments(userId),
      [],
    ),
    loaderArgs: [userId],
    initialValue: [],
    dependencies,
  });

  return {
    userComments: data,
    areUserCommentsLoading: isLoading,
  };
};
