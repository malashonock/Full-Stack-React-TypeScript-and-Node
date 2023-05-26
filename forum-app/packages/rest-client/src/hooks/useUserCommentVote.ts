/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadCommentPointDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useUserCommentVote = (
  userId: string | undefined,
  commentId: string,
  ...dependencies: any[]
): ThreadCommentPointDto | null => {
  const [vote, setVote] = useState<ThreadCommentPointDto | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      (async () => {
        const userCommentVote = await ThreadCommentService.getUserCommentVote(
          userId,
          commentId,
        );
        setVote(userCommentVote);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userId, commentId, ...dependencies]);

  return vote;
};
