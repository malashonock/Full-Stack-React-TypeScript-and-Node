import dataSource from '../persistence/dataSource';
import { Thread } from '../persistence/entities';
import { ThreadFields } from '../shared/types';
import ThreadCategoryRepository from './ThreadCategory.repo';
import UserRepository from './User.repo';

const ThreadRepository = dataSource.getRepository(Thread).extend({

  async createThread(userId: string, {
    categoryId,
    title,
    body,
  }: ThreadFields): Promise<Thread> {
    const category = await ThreadCategoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const createdThread: Thread = this.create({
      category,
      user,
      title,
      body,
    });

    await this.save(createdThread);
  
    return createdThread;
  },

  async updateThread(id: string, {
    title,
    body,
  }: ThreadFields): Promise<Thread | null> {
    const updatedThread = await this.getThreadById(id);

    if (!updatedThread) {
      return null;
    }

    if (title) updatedThread.title = title;
    if (body) updatedThread.body = body;

    await this.save(updatedThread);

    return updatedThread;
  },

  async getAllThreads(): Promise<Thread[]> {
    const threads = await this.find();
    return threads;
  },

  async getAllThreadsByCategoryId(
    categoryId: string,
  ): Promise<Thread[]> {
    const categoryThreads = await this.createQueryBuilder('thread')
      .where('thread.categoryId = :categoryId', { categoryId })
      .orderBy('thread.createdOn', 'DESC')
      .getMany();

    return categoryThreads;
  },

  async getAllThreadsByUserId(
    userId: string,
  ): Promise<Thread[]> {
    const categoryThreads = await this.createQueryBuilder('thread')
      .where('thread.userId = :userId', { userId })
      .orderBy('thread.createdOn', 'DESC')
      .getMany();

    return categoryThreads;
  },

  async getTopCategoryThreads(
    topN: number,
  ): Promise<Thread[]> {
    const topCategoryThreads = await this.query(`
      SELECT 
        t.id, 
        t.title, 
        t.body, 
        t."viewsCount", 
        t."isDisabled", 
        t."createdOn", 
        t."lastModifiedOn"
      FROM (
        SELECT *, row_number() OVER (
          PARTITION BY "categoryId"
          ORDER BY "viewsCount" DESC
        ) AS thread_number
        FROM "Threads"
      ) AS t
      WHERE thread_number <= $1
    `, [topN]) as Thread[];

    return topCategoryThreads;
  },

  async getThreadById(
    id: string,
  ): Promise<Thread | null> {
    if (!id) {
      throw new Error('Thread id is not defined');
    }

    const thread = await this.findOneBy({ id });
  
    return thread;
  },

});

export default ThreadRepository;