import { useCallback } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';
import { useLoader } from 'hooks';

interface UseCategoryThreadsResult {
  categoryThreads: ThreadDto[];
  areCategoryThreadsLoading: boolean;
}

export const useCategoryThreads = (
  categoryId: string | undefined,
  ...dependencies: any[]
): UseCategoryThreadsResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (categoryId: string): Promise<ThreadDto[]> =>
        await ThreadService.getCategoryThreads(categoryId),
      [],
    ),
    loaderArgs: [categoryId],
    initialValue: [],
    dependencies,
  });

  return {
    categoryThreads: data,
    areCategoryThreadsLoading: isLoading,
  };
};
