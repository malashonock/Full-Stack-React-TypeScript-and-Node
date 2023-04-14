import { RequestHandler } from 'express';

import ThreadRepository from '../repo/Thread.repo';

const getAllThreads: RequestHandler = async (req, res) => {
  try {
    const threads = await ThreadRepository.getAllThreads();
    res.json(threads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getThread: RequestHandler = async (req, res) => {
  try {
    const { threadId } = req.params;

    if (!threadId) {
      return res.send(404).send('Thread tread not found');
    }

    const tread = await ThreadRepository.getThreadById(threadId);
    
    res.json(tread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const createThread: RequestHandler = async (req, res) => {
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

const updateThread: RequestHandler = async (req, res) => {
  try {
    const { threadId } = req.params;

    if (!threadId) {
      return res.status(404).send('Thread tread not found');
    }

    const { name, description } = req.body;

    if (!name && !description) {
      return res.status(304).send('No updatable fields were provided in the request');
    }

    const updatedThread = await ThreadRepository.updateThread(threadId, req.body);

    if (!updatedThread) {
      return res.status(404).send('Thread tread not found');
    }

    res.json(updatedThread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  getAllThreads,
  getThread,
  createThread,
  updateThread,
};