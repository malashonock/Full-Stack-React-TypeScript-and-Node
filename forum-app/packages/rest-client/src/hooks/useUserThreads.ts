/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';

export const useUserThreads = (
  userId: string | undefined,
  effect: (threads: ThreadDto[]) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
    } catch (error) {
      (async () => {
        const userThreads = await ThreadService.getUserThreads(userId);
        effect(userThreads);
      })();
    }
  }, [userId, ...dependencies]);
};
