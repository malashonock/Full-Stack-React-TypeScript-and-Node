import { ThreadCategoryFields } from '@shared/types';

import dataSource from '../persistence/dataSource';
import { ThreadCategory } from '../persistence/entities';

const ThreadCategoryRepository = dataSource
  .getRepository(ThreadCategory)
  .extend({
    async createCategory({
      name,
      description,
    }: ThreadCategoryFields): Promise<ThreadCategory> {
      const createdCategory: ThreadCategory = this.create({
        name,
        description,
      });

      await this.save(createdCategory);

      return createdCategory;
    },

    async updateCategory(
      id: string,
      { name, description }: ThreadCategoryFields,
    ): Promise<ThreadCategory | null> {
      const updatedCategory = await this.getCategoryById(id);

      if (!updatedCategory) {
        return null;
      }

      if (name) updatedCategory.name = name;
      if (description) updatedCategory.description = description;

      await this.save(updatedCategory);

      return updatedCategory;
    },

    async getAllCategories(): Promise<ThreadCategory[]> {
      const categories = await this.find();
      return categories;
    },

    async getCategoryById(id: string): Promise<ThreadCategory | null> {
      if (!id) {
        throw new Error('Thread category id is not defined');
      }

      const category = await this.findOneBy({ id });

      return category;
    },
  });

export default ThreadCategoryRepository;
