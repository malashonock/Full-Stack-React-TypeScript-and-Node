import { useCallback } from 'react';

import { ThreadCategoryDto } from '@shared/types';

import { ThreadCategoryService } from 'services';
import { useLoader } from 'hooks';

interface UseCategoryResult {
  category: ThreadCategoryDto | null;
  isCategoryLoading: boolean;
}

export const useCategory = (
  categoryId: string | undefined,
  ...dependencies: any[]
): UseCategoryResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (categoryId: string): Promise<ThreadCategoryDto | null> =>
        await ThreadCategoryService.getCategoryById(categoryId),
      [],
    ),
    loaderArgs: [categoryId],
    initialValue: null,
    dependencies,
  });

  return {
    category: data,
    isCategoryLoading: isLoading,
  };
};
