/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThreadDto } from '@shared/types';

import { ThreadService } from 'services';

export const useCategoryThreads = (
  categoryId: string | undefined,
  effect: (threads: ThreadDto[]) => void,
  ...dependencies: any[]
): void => {
  useEffect(() => {
    if (!categoryId) {
      return;
    }

    try {
      (async () => {
        const categoryThreads = await ThreadService.getCategoryThreads(
          categoryId,
        );
        effect(categoryThreads);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [categoryId, ...dependencies]);
};
