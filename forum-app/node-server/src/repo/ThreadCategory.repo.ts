import dataSource from '../persistence/dataSource';
import { ThreadCategory } from '../persistence/entities';
import { ThreadCategoryFields } from '../shared/dto/ThreadCategory.dto';

const ThreadCategoryRepository = dataSource.getRepository(ThreadCategory).extend({

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

  async updateCategory(id: string, {
    name,
    description,
  }: ThreadCategoryFields): Promise<ThreadCategory | null> {
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
    const categories = await ThreadCategory.find();
    return categories;
  },

  async getCategoryById(
    id: string,
  ): Promise<ThreadCategory | null> {
    const category = await ThreadCategory.findOne({
      where: { id },
    });
  
    return category;
  },

});

export default ThreadCategoryRepository;