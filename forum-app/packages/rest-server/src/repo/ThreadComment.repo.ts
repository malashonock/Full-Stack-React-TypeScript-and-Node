import { ThreadCommentFields } from '@shared/types';

import dataSource from '../persistence/dataSource';
import { ThreadComment } from '../persistence/entities';
import ThreadRepository from './Thread.repo';
import UserRepository from './User.repo';
import { EntityManager } from 'typeorm';

const ThreadCommentRepository = dataSource.getRepository(ThreadComment).extend({
  async createComment(
    authorId: string,
    threadId: string,
    { body }: ThreadCommentFields,
  ): Promise<ThreadComment | null> {
    const author = await UserRepository.getUserById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    const thread = await ThreadRepository.getThreadById(threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    // Run the rest within a transaction
    return await this.manager.transaction(
      async (
        transactionalEntityManager: EntityManager,
      ): Promise<ThreadComment | null> => {
        const createdComment: ThreadComment = this.create({
          author,
          thread,
          body,
        });
        await this.save(createdComment);

        // Update parent thread's comments count
        thread.commentsCount++;
        await ThreadRepository.save(thread);

        // Re-query again to avoid returning full author & thread
        return await this.getCommentById(createdComment.id);
      },
    );
  },

  async updateComment(
    id: string,
    { body }: ThreadCommentFields,
  ): Promise<ThreadComment | null> {
    const updatedComment = await this.getCommentById(id);

    if (!updatedComment) {
      return null;
    }

    if (body) updatedComment.body = body;

    await this.save(updatedComment);

    return updatedComment;
  },

  async getAllCommentsByThreadId(threadId: string): Promise<ThreadComment[]> {
    const threadComments = await this.createQueryBuilder('comment')
      .where('comment.threadId = :threadId', { threadId })
      .orderBy('comment.createdOn', 'DESC')
      .getMany();

    return threadComments;
  },

  async getAllCommentsByAuthorId(authorId: string): Promise<ThreadComment[]> {
    const userComments = await this.createQueryBuilder('comment')
      .where('comment.authorId = :authorId', { authorId })
      .orderBy('comment.createdOn', 'DESC')
      .getMany();

    return userComments;
  },

  async getCommentById(id: string): Promise<ThreadComment | null> {
    if (!id) {
      throw new Error('Thread comment id is not defined');
    }

    const comment = await this.findOneBy({ id });

    return comment;
  },

  async viewComment(id: string): Promise<ThreadComment | null> {
    const viewedComment = await this.getCommentById(id);

    if (!viewedComment) {
      return null;
    }

    viewedComment.viewsCount++;

    await this.save(viewedComment);

    return viewedComment;
  },
});

export default ThreadCommentRepository;
