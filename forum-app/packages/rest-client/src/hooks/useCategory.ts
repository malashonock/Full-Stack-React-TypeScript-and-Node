/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadCategoryDto } from '@shared/types';

import { ThreadCategoryService } from 'services';

export const useCategory = (
  categoryId: string | undefined,
  effect: (category: ThreadCategoryDto) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    try {
      if (!categoryId) {
        return;
      }

      if (categoryId) {
        (async () => {
          const category = await ThreadCategoryService.getCategoryById(
            categoryId,
          );
          effect(category);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [...dependencies]);
};
