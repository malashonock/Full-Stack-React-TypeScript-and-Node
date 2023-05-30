import { useCallback } from 'react';

import { ThreadCategoryDto } from '@shared/types';

import { ThreadCategoryService } from 'services';
import { useLoader } from 'hooks';

interface UseCategoriesResult {
  categories: ThreadCategoryDto[];
  areCategoriesLoading: boolean;
}

export const useCategories = (...dependencies: any[]): UseCategoriesResult => {
  const { data, isLoading } = useLoader({
    loader: useCallback(
      async (): Promise<ThreadCategoryDto[]> =>
        await ThreadCategoryService.getAllCategories(),
      [],
    ),
    loaderArgs: [],
    initialValue: [],
    dependencies,
  });

  return {
    categories: data,
    areCategoriesLoading: isLoading,
  };
};
