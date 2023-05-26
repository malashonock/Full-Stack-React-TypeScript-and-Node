/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useThreadComment = (
  threadId: string | undefined,
  commentId: string | undefined,
  ...dependencies: any[]
): ThreadCommentDto | null => {
  const [comment, setComment] = useState<ThreadCommentDto | null>(null);

  useEffect(() => {
    try {
      if (!threadId || !commentId) {
        return;
      }

      if (threadId) {
        (async () => {
          const fetchedComment = await ThreadCommentService.getCommentById(
            threadId,
            commentId,
          );
          setComment(fetchedComment);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [...dependencies]);

  return comment;
};
