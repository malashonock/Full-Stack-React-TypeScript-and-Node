import { ThreadCommentFields, VoteType } from '@shared/types';

import ThreadCommentRepository from '../repo/ThreadComment.repo';
import { ThreadComment, ThreadCommentPoint } from '../persistence/entities';
import ThreadCommentPointRepository from '../repo/ThreadCommentPoint.repo';
import { Request, Response } from '../types';

const getComment = async (
  req: Request,
  res: Response<ThreadComment | null>,
) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const comment = await ThreadCommentRepository.getCommentById(commentId);

    res.json(comment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const createComment = async (
  req: Request<ThreadCommentFields>,
  res: Response<ThreadComment | null>,
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

    const createdComment = await ThreadCommentRepository.createComment(
      userId,
      threadId,
      req.body,
    );

    res.json(createdComment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateComment = async (
  req: Request<Partial<ThreadCommentFields>>,
  res: Response<ThreadComment | null>,
) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const { body } = req.body;
    if (!body) {
      return res
        .status(304)
        .send('No updatable fields were provided in the request');
    }

    const updatedComment = await ThreadCommentRepository.updateComment(
      commentId,
      req.body,
    );

    if (!updatedComment) {
      return res.status(404).send('Thread comment not found');
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getThreadComments = async (
  req: Request,
  res: Response<ThreadComment[]>,
) => {
  try {
    const { threadId } = req.params;
    if (!threadId) {
      return res.status(404).send('Thread not found');
    }

    const threadComments =
      await ThreadCommentRepository.getAllCommentsByThreadId(threadId);

    res.json(threadComments);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getUserComments = async (
  req: Request,
  res: Response<ThreadComment[]>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const userComments = await ThreadCommentRepository.getAllCommentsByAuthorId(
      userId,
    );

    res.json(userComments);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const viewComment = async (req: Request, res: Response<ThreadComment>) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const viewedComment = await ThreadCommentRepository.viewComment(commentId);

    if (!viewedComment) {
      return res.status(404).send('Thread comment not found');
    }

    res.json(viewedComment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const toggleUpvoteComment = async (
  req: Request,
  res: Response<ThreadCommentPoint>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const createdUpvote = await ThreadCommentPointRepository.togglePoint(
      userId,
      commentId,
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

const toggleDownvoteComment = async (
  req: Request,
  res: Response<ThreadCommentPoint>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const createdDownvote = await ThreadCommentPointRepository.togglePoint(
      userId,
      commentId,
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

const getUserCommentVote = async (
  req: Request,
  res: Response<ThreadCommentPoint | null>,
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread not found');
    }

    const userCommentVote =
      await ThreadCommentPointRepository.getPointByUserAndThreadId(
        userId,
        commentId,
      );
    if (!userCommentVote) {
      return res.status(404).send("User hasn't voted for this comment yet");
    }

    res.json(userCommentVote);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  getComment,
  createComment,
  updateComment,
  getThreadComments,
  getUserComments,
  viewComment,
  toggleUpvoteComment,
  toggleDownvoteComment,
  getUserCommentVote,
};
