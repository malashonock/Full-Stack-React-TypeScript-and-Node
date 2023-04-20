import { EntityManager } from 'typeorm';

import dataSource from '../persistence/dataSource';
import { VoteType, ThreadPoint } from '../persistence/entities';
import UserRepository from './User.repo';
import ThreadRepository from './Thread.repo';

const ThreadPointRepository = dataSource.getRepository(ThreadPoint).extend({

  async togglePoint(
    userId: string,
    threadId: string,
    type: VoteType,
  ): Promise<ThreadPoint | null> {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const thread = await ThreadRepository.findOne({
      where: {
        id: threadId,
      },
      relations: {
        user: true,
      },
    });

    if (!thread) {
      throw new Error('Thread not found');
    }

    if (thread.user.id === userId) {
      throw new Error('Thread author cannot vote for own threads');
    }

    const existingPoint = await this.getPointByUserAndThreadId(userId, threadId);

    // Run the rest within a transaction
    return await this.manager.transaction(async (
      transactionalEntityManager: EntityManager,
    ): Promise<ThreadPoint | null> => {

      if (!existingPoint) {
        // Not voted yet, create a new point
        const createdPoint = this.create({
          user, 
          thread,
          type,
        });
        await this.save(createdPoint);
  
        // Update thread's points sum
        thread.pointsSum += type === VoteType.Upvote ? +1 : -1;
        await ThreadRepository.save(thread);
  
        // Re-query again to avoid returning full user & thread
        return await this.getPointById(createdPoint.id);
      }
  
      if (type === existingPoint.type) {
        // Remove our previous vote
        await this.remove(existingPoint);
  
        // Unwind thread's points sum
        thread.pointsSum -= type === VoteType.Upvote ? +1 : -1;
        await ThreadRepository.save(thread);
  
        return null;
      } else {
        // A point of opposite type already exists
        const prefix = type === VoteType.Upvote ? 'down' : 'up';
        throw new Error(`You have already ${prefix}voted this thread, undo your previous vote first`);
      }

    });
  },

  async getPointById(
    id: string,
  ): Promise<ThreadPoint | null> {
    if (!id) {
      throw new Error('Thread point id is not defined');
    }

    const point = await this.findOneBy({ id });
  
    return point;
  },

  async getPointByUserAndThreadId(
    userId: string,
    threadId: string,
  ): Promise<ThreadPoint | null> {
    if (!userId) {
      throw new Error('User id is not defined');
    }

    if (!threadId) {
      throw new Error('Thread id is not defined');
    }

    const point = await this.findOne({
      where: {
        user: {
          id: userId,
        },
        thread: {
          id: threadId,
        },
      }
    });
  
    return point;
  },

});

export default ThreadPointRepository;