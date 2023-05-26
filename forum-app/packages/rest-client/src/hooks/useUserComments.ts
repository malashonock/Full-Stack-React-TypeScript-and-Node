/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useUserComments = (
  userId: string | undefined,
  ...dependencies: any[]
): ThreadCommentDto[] => {
  const [comments, setComments] = useState<ThreadCommentDto[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      (async () => {
        const userComments = await ThreadCommentService.getUserComments(userId);
        setComments(userComments);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userId, ...dependencies]);

  return comments;
};
