import { useCallback } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';
import { useLoader } from 'hooks';

interface UseThreadCommentResult {
  comment: ThreadCommentDto | null;
  isCommentLoading: boolean;
}

export const useThreadComment = (
  threadId: string | undefined,
  commentId: string | undefined,
  ...dependencies: any[]
): UseThreadCommentResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (
        threadId: string,
        commentId: string,
      ): Promise<ThreadCommentDto | null> =>
        await ThreadCommentService.getCommentById(threadId, commentId),
      [],
    ),
    loaderArgs: [threadId, commentId],
    initialValue: null,
    dependencies,
  });

  return {
    comment: data,
    isCommentLoading: isLoading,
  };
};
