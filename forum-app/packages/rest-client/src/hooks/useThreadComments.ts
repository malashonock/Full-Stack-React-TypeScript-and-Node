/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadCommentDto } from '@shared/types';

import { ThreadCommentService } from 'services';

export const useThreadComments = (
  threadId: string | undefined,
  effect: (comments: ThreadCommentDto[]) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    if (!threadId) {
      return;
    }

    try {
      (async () => {
        const threadComments = await ThreadCommentService.getThreadComments(
          threadId,
        );
        effect(threadComments);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [threadId, ...dependencies]);
};
