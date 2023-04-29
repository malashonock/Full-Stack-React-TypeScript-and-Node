/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useUserComments = (
  userId: string | undefined,
  effect: (comments: ThreadCommentDto[]) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      (async () => {
        const userComments = await ThreadCommentService.getUserComments(userId);
        effect(userComments);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userId, ...dependencies]);
};
