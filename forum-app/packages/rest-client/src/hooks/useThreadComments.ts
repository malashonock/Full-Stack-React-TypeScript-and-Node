import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';
import { useLoader } from 'hooks';

interface UseThreadCommentsResult {
  comments: ThreadCommentDto[];
  areCommentsLoading: boolean;
}

export const useThreadComments = (
  threadId: string | undefined,
  ...dependencies: any[]
): UseThreadCommentsResult => {
  const { data, isLoading } = useLoader({
    loader: async (threadId: string): Promise<ThreadCommentDto[]> =>
      await ThreadCommentService.getThreadComments(threadId),
    loaderArgs: [threadId],
    initialValue: [],
    dependencies,
  });

  return {
    comments: data,
    areCommentsLoading: isLoading,
  };
};
