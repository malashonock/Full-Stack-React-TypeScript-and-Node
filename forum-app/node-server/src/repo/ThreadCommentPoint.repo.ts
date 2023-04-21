import { EntityManager } from 'typeorm';

import dataSource from '../persistence/dataSource';
import { VoteType, ThreadCommentPoint } from '../persistence/entities';
import UserRepository from './User.repo';
import ThreadCommentRepository from './ThreadComment.repo';

const ThreadCommentPointRepository = dataSource.getRepository(ThreadCommentPoint).extend({

  async togglePoint(
    userId: string,
    commentId: string,
    type: VoteType,
  ): Promise<ThreadCommentPoint | null> {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const comment = await ThreadCommentRepository.findOne({
      where: {
        id: commentId,
      },
      relations: {
        author: true,
      },
    });

    if (!comment) {
      throw new Error('Thread comment not found');
    }

    if (userId === comment.author.id) {
      throw new Error('Thread comment author cannot like/dislike own threads');
    }

    const existingPoint = await this.getPointByUserAndThreadId(userId, commentId);

    // Run the rest within a transaction
    return await this.manager.transaction(async (
      transactionalEntityManager: EntityManager,
    ): Promise<ThreadCommentPoint | null> => {

      if (!existingPoint) {
        // Not voted yet, create a new point
        const createdPoint = this.create({
          user, 
          comment,
          type,
        });
        await this.save(createdPoint);
  
        // Update comment's points sum
        comment.pointsSum += type === VoteType.Upvote ? +1 : -1;
        await ThreadCommentRepository.save(comment);
  
        // Re-query again to avoid returning full user & comment
        return await this.getPointById(createdPoint.id);
      }
  
      if (type === existingPoint.type) {
        // Remove our previous vote
        await this.remove(existingPoint);
  
        // Unwind comment's points sum
        comment.pointsSum -= type === VoteType.Upvote ? +1 : -1;
        await ThreadCommentRepository.save(comment);
  
        return null;
      } else {
        // A point of opposite type already exists
        const prefix = type === VoteType.Upvote ? 'down' : 'up';
        throw new Error(`You have already ${prefix}voted this comment, undo your previous vote first`);
      }

    });
  },

  async getPointById(
    id: string,
  ): Promise<ThreadCommentPoint | null> {
    if (!id) {
      throw new Error('Thread comment point id is not defined');
    }

    const point = await this.findOneBy({ id });
  
    return point;
  },

  async getPointByUserAndThreadId(
    userId: string,
    commentId: string,
  ): Promise<ThreadCommentPoint | null> {
    if (!userId) {
      throw new Error('User id is not defined');
    }

    if (!commentId) {
      throw new Error('Thread comment id is not defined');
    }

    const point = await this.findOne({
      where: {
        user: {
          id: userId,
        },
        comment: {
          id: commentId,
        },
      }
    });
  
    return point;
  },

});

export default ThreadCommentPointRepository;