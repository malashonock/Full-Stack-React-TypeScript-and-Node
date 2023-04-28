import { ThreadCategoryDto } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const getAllCategories = async (): Promise<ThreadCategoryDto[]> => {
  const categories = await FetchService.runQuery<ThreadCategoryDto[]>(
    '/categories',
  );
  return categories;
};

const getCategoryById = async (id: string): Promise<ThreadCategoryDto> => {
  const category = await FetchService.runQuery<ThreadCategoryDto>(
    `/categories/${id}`,
  );
  return category;
};

const logout = async (): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    '/auth/logout',
    MutationMethod.POST,
    {},
  );
};

export const ThreadCategoryService = {
  getAllCategories,
  getCategoryById,
  logout,
};
