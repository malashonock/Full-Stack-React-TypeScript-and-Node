/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ThreadPointDto } from '@shared/types';

import { ThreadService } from 'services';

export const useUserThreadVote = (
  userId: string | undefined,
  threadId: string,
  ...dependencies: any[]
): ThreadPointDto | null => {
  const [vote, setVote] = useState<ThreadPointDto | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      (async () => {
        const userThreadVote = await ThreadService.getUserThreadVote(
          userId,
          threadId,
        );
        setVote(userThreadVote);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userId, threadId, ...dependencies]);

  return vote;
};
