import dataSource from '../persistence/dataSource';
import { ThreadComment } from '../persistence/entities';
import { ThreadCommentFields } from '../shared/types';
import ThreadRepository from './Thread.repo';
import UserRepository from './User.repo';

const ThreadCommentRepository = dataSource.getRepository(ThreadComment).extend({

  async createComment(userId: string, threadId: string, {
    body,
  }: ThreadCommentFields): Promise<ThreadComment | null> {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const thread = await ThreadRepository.getThreadById(threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    const createdComment: ThreadComment = this.create({
      user,
      thread,
      body,
    });

    await this.save(createdComment);

    // Re-query again to avoid returning full user & thread
    return await this.getCommentById(createdComment.id);
  },

  async updateComment(id: string, {
    body,
  }: ThreadCommentFields): Promise<ThreadComment | null> {
    const updatedComment = await this.getCommentById(id);

    if (!updatedComment) {
      return null;
    }

    if (body) updatedComment.body = body;

    await this.save(updatedComment);

    return updatedComment;
  },

  async getAllCommentsByThreadId(
    threadId: string,
  ): Promise<ThreadComment[]> {
    const threadComments = await this.createQueryBuilder('comment')
      .where('comment.threadId = :threadId', { threadId })
      .orderBy('comment.createdOn', 'DESC')
      .getMany();

    return threadComments;
  },

  async getAllCommentsByUserId(
    userId: string,
  ): Promise<ThreadComment[]> {
    const userComments = await this.createQueryBuilder('comment')
      .where('comment.userId = :userId', { userId })
      .orderBy('comment.createdOn', 'DESC')
      .getMany();

    return userComments;
  },

  async getCommentById(
    id: string,
  ): Promise<ThreadComment | null> {
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