import { RequestHandler } from 'express';

import ThreadCommentRepository from '../repo/ThreadComment.repo';
import { VoteType } from '../persistence/entities';
import ThreadCommentPointRepository from '../repo/ThreadCommentPoint.repo';

const getComment: RequestHandler = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.send(404).send('Thread comment not found');
    }

    const comment = await ThreadCommentRepository.getCommentById(commentId);
    
    res.json(comment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const createComment: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { threadId } = req.params;
    if (!threadId) {
      return res.send(404).send('Thread not found');
    }

    const createdComment = await ThreadCommentRepository.createComment(userId, threadId, req.body);

    res.json(createdComment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateComment: RequestHandler = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.send(404).send('Thread comment not found');
    }

    const { body } = req.body;
    if (!body) {
      return res.status(304).send('No updatable fields were provided in the request');
    }

    const updatedComment = await ThreadCommentRepository.updateComment(commentId, req.body);

    if (!updatedComment) {
      return res.status(404).send('Thread comment not found');
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getThreadComments: RequestHandler = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.send(404).send('Thread comment not found');
    }

    const threadComments = await ThreadCommentRepository.getAllCommentsByThreadId(commentId);
    
    res.json(threadComments);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getUserComments: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.send(404).send('User not found');
    }

    const userComments = await ThreadCommentRepository.getAllCommentsByAuthorId(userId);

    res.json(userComments);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const viewComment: RequestHandler = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.send(404).send('Thread comment not found');
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
const toggleUpvoteComment: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const createdUpvote = await ThreadCommentPointRepository.togglePoint(userId, commentId, VoteType.Upvote);

    if (createdUpvote) {
      return res.status(201).json(createdUpvote);
    } else {
      return res.status(204).send('Upvote removed');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const toggleDownvoteComment: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send('Thread comment not found');
    }

    const createdDownvote = await ThreadCommentPointRepository.togglePoint(userId, commentId, VoteType.Downvote);

    if (createdDownvote) {
      return res.status(201).json(createdDownvote);
    } else {
      return res.status(204).send('Downvote removed');
    }
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
};