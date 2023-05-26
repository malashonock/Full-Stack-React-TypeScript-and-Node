/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';

export const useUserThreads = (
  userId: string | undefined,
  ...dependencies: any[]
): ThreadDto[] => {
  const [threads, setThreads] = useState<ThreadDto[]>([]);
  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      (async () => {
        const userThreads = await ThreadService.getUserThreads(userId);
        setThreads(userThreads);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userId, ...dependencies]);

  return threads;
};
