import { ThreadFields } from '@shared/types';

import dataSource from '../persistence/dataSource';
import { Thread } from '../persistence/entities';
import ThreadCategoryRepository from './ThreadCategory.repo';
import UserRepository from './User.repo';

const ThreadRepository = dataSource.getRepository(Thread).extend({
  async createThread(
    authorId: string,
    { categoryId, title, body }: ThreadFields,
  ): Promise<Thread | null> {
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
    });

    await this.save(createdThread);

    return createdThread;
  },

  async updateThread(
    id: string,
    { title, body }: Partial<ThreadFields>,
  ): Promise<Thread | null> {
    const updatedThread = await this.getThreadById(id);

    if (!updatedThread) {
      return null;
    }

    if (title) updatedThread.title = title;
    if (body) updatedThread.body = body;

    await this.save(updatedThread);

    // Re-query again to populate author & category fields
    return await this.getThreadById(updatedThread.id);
  },

  async getAllThreads(): Promise<Thread[]> {
    const threads = await this.find({
      relations: {
        author: true,
        category: true,
      },
    });
    return threads;
  },

  async getAllThreadsByCategoryId(categoryId: string): Promise<Thread[]> {
    const categoryThreads = await this.createQueryBuilder('thread')
      .where('thread.categoryId = :categoryId', { categoryId })
      .leftJoinAndSelect('thread.author', 'author')
      .leftJoinAndSelect('thread.category', 'category')
      .orderBy('thread.createdOn', 'DESC')
      .getMany();

    return categoryThreads;
  },

  async getAllThreadsByAuthorId(authorId: string): Promise<Thread[]> {
    const categoryThreads = await this.createQueryBuilder('thread')
      .where('thread.authorId = :authorId', { authorId })
      .leftJoinAndSelect('thread.author', 'author')
      .leftJoinAndSelect('thread.category', 'category')
      .orderBy('thread.createdOn', 'DESC')
      .getMany();

    return categoryThreads;
  },

  async getTopCategoryThreads(topN: number): Promise<Thread[]> {
    // Retrieve top threads' ids
    const topCategoryThreadIds = (await this.query(
      `
      SELECT 
        thr.id
      FROM (
        SELECT *, row_number() OVER (
          PARTITION BY "categoryId"
          ORDER BY 
            "viewsCount" DESC, 
            "commentsCount" DESC
        ) AS thr_rating
        FROM "Threads" AS thr
      ) AS thr
      WHERE thr_rating <= $1
    `,
      [topN],
    )) as Array<{ id: string }>;

    // Retrieve corresponding entities
    const topCategoryThreads = await this.createQueryBuilder('thread')
      .where('thread.id IN(:...ids)', {
        ids: topCategoryThreadIds.map(({ id }) => Number(id)),
      })
      .leftJoinAndSelect('thread.author', 'author')
      .leftJoinAndSelect('thread.category', 'category')
      .orderBy('thread.categoryId', 'ASC')
      .orderBy('thread.viewsCount', 'DESC')
      .orderBy('thread.commentsCount', 'DESC')
      .getMany();

    return topCategoryThreads;
  },

  async getThreadById(id: string): Promise<Thread | null> {
    if (!id) {
      throw new Error('Thread id is not defined');
    }

    const thread = await this.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
        category: true,
      },
    });

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
