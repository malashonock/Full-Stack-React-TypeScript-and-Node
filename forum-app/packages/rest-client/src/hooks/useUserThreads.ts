import { useCallback } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';
import { useLoader } from 'hooks';

interface UseUserThreadsResult {
  userThreads: ThreadDto[];
  areUserThreadsLoading: boolean;
}

export const useUserThreads = (
  userId: string | undefined,
  ...dependencies: any[]
): UseUserThreadsResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (userId: string): Promise<ThreadDto[]> =>
        await ThreadService.getUserThreads(userId),
      [],
    ),
    loaderArgs: [userId],
    initialValue: [],
    dependencies,
  });

  return {
    userThreads: data,
    areUserThreadsLoading: isLoading,
  };
};
