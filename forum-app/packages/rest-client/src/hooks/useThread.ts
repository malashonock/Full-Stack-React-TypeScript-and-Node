/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';

export const useThread = (
  threadId: string | undefined,
  effect: (thread: ThreadDto) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    try {
      if (!threadId) {
        return;
      }

      if (threadId) {
        (async () => {
          const thread = await ThreadService.getThreadById(threadId);
          effect(thread);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [...dependencies]);
};
