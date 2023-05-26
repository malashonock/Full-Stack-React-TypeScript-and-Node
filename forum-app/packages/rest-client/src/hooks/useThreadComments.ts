/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useThreadComments = (
  threadId: string | undefined,
  ...dependencies: any[]
): ThreadCommentDto[] => {
  const [comments, setComments] = useState<ThreadCommentDto[]>([]);

  useEffect(() => {
    if (!threadId) {
      return;
    }

    try {
      (async () => {
        const threadComments = await ThreadCommentService.getThreadComments(
          threadId,
        );
        setComments(threadComments);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [threadId, ...dependencies]);

  return comments;
};
