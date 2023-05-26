/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';

export const useThread = (
  threadId: string | undefined,
  ...dependencies: any[]
): ThreadDto | null => {
  const [thread, setThread] = useState<ThreadDto | null>(null);

  useEffect(() => {
    try {
      if (!threadId) {
        return;
      }

      if (threadId) {
        (async () => {
          const fetchedThread = await ThreadService.getThreadById(threadId);
          setThread(fetchedThread);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [...dependencies]);

  return thread;
};
