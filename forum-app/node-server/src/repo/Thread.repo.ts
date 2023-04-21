import dataSource from '../persistence/dataSource';
import { Thread } from '../persistence/entities';
import { ThreadFields } from '../shared/types';
import ThreadCategoryRepository from './ThreadCategory.repo';
import UserRepository from './User.repo';

const ThreadRepository = dataSource.getRepository(Thread).extend({

  async createThread(authorId: string, {
    categoryId,
    title,
    body,
  }: ThreadFields): Promise<Thread | null> {
    const category = await ThreadCategoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    
    const author = await UserRepository.getUserById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    const createdThread: Thread = this.create({
      category,
      author,
      title,
      body,
    })
    
    await this.save(createdThread);

    // Re-query again to avoid returning full author & category
    return await this.getThreadById(createdThread.id);
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

  async getAllThreadsByAuthorId(
    authorId: string,
  ): Promise<Thread[]> {
    const categoryThreads = await this.createQueryBuilder('thread')
      .where('thread.authorId = :authorId', { authorId })
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
        t."lastModifiedOn",
        t."authorId",
        t."categoryId"
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

  async viewThread(id: string): Promise<Thread | null> {
    const viewedThread = await this.getThreadById(id);

    if (!viewedThread) {
      return null;
    }

    viewedThread.viewsCount++;

    await this.save(viewedThread);

    return viewedThread;
  },

});

export default ThreadRepository;