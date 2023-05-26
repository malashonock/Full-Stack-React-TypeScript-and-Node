import { ThreadFields, VoteType } from '@shared/types';

import ThreadRepository from '../repo/Thread.repo';
import ThreadPointRepository from '../repo/ThreadPoint.repo';
import { Thread, ThreadPoint } from '../persistence/entities';
import { Request, Response } from '../types';

const getAllThreads = async (req: Request, res: Response<Thread[]>) => {
  try {
    const threads = await ThreadRepository.getAllThreads();
    res.json(threads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getThread = async (req: Request, res: Response<Thread | null>) => {
  try {
    const { threadId } = req.params;
    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const thread = await ThreadRepository.getThreadById(threadId);

    res.json(thread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const createThread = async (
  req: Request<ThreadFields>,
  res: Response<Thread | null>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const createdThread = await ThreadRepository.createThread(userId, req.body);

    res.json(createdThread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateThread = async (
  req: Request<Partial<ThreadFields>>,
  res: Response<Thread>,
) => {
  try {
    const { threadId } = req.params;
    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const { title, body } = req.body;

    if (!title && !body) {
      return res
        .status(304)
        .send('No updatable fields were provided in the request');
    }

    const updatedThread = await ThreadRepository.updateThread(
      threadId,
      req.body,
    );

    if (!updatedThread) {
      return res.status(404).send('Thread not found');
    }

    res.json(updatedThread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getCategoryThreads = async (req: Request, res: Response<Thread[]>) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(404).send('Thread category not found');
    }

    const categoryThreads = await ThreadRepository.getAllThreadsByCategoryId(
      categoryId,
    );
    res.json(categoryThreads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getUserThreads = async (req: Request, res: Response<Thread[]>) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const userThreads = await ThreadRepository.getAllThreadsByAuthorId(userId);
    res.json(userThreads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getTopCategoryThreads = async (req: Request, res: Response<Thread[]>) => {
  try {
    const topN = Number(req.query.take) || 3;

    const topCategoryThreads = await ThreadRepository.getTopCategoryThreads(
      topN,
    );
    res.json(topCategoryThreads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const viewThread = async (req: Request, res: Response<Thread>) => {
  try {
    const { threadId } = req.params;
    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const viewedThread = await ThreadRepository.viewThread(threadId);

    if (!viewedThread) {
      return res.status(404).send('Thread not found');
    }

    res.json(viewedThread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const toggleUpvoteThread = async (req: Request, res: Response<ThreadPoint>) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { threadId } = req.params;

    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const createdUpvote = await ThreadPointRepository.togglePoint(
      userId,
      threadId,
      VoteType.Upvote,
    );

    if (createdUpvote) {
      return res.status(201).json(createdUpvote);
    } else {
      return res.status(204).send('Upvote removed');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const toggleDownvoteThread = async (
  req: Request,
  res: Response<ThreadPoint>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { threadId } = req.params;

    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const createdDownvote = await ThreadPointRepository.togglePoint(
      userId,
      threadId,
      VoteType.Downvote,
    );

    if (createdDownvote) {
      return res.status(201).json(createdDownvote);
    } else {
      return res.status(204).send('Downvote removed');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getUserThreadVote = async (
  req: Request,
  res: Response<ThreadPoint | null>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { threadId } = req.params;
    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const userThreadVote =
      await ThreadPointRepository.getPointByUserAndThreadId(userId, threadId);
    if (!userThreadVote) {
      return res.status(404).send("User hasn't voted for this thread yet");
    }

    res.json(userThreadVote);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  getAllThreads,
  getThread,
  createThread,
  updateThread,
  getCategoryThreads,
  getUserThreads,
  getTopCategoryThreads,
  viewThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
  getUserThreadVote,
};
