import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';
import { useLoader } from 'hooks';

interface UseThreadResult {
  thread: ThreadDto | null;
  isThreadLoading: boolean;
}

export const useThread = (
  threadId: string | undefined,
  ...dependencies: any[]
): UseThreadResult => {
  const { data, isLoading } = useLoader({
    loader: async (threadId: string): Promise<ThreadDto | null> =>
      await ThreadService.getThreadById(threadId),
    loaderArgs: [threadId],
    initialValue: null,
    dependencies,
  });

  return {
    thread: data,
    isThreadLoading: isLoading,
  };
};
