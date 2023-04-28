/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadCategoryDto } from '@shared/types';

import { ThreadCategoryService } from 'services';

export const useCategories = (
  effect: (categories: ThreadCategoryDto[]) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    try {
      (async () => {
        const categories = await ThreadCategoryService.getAllCategories();
        effect(categories);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [...dependencies]);
};
