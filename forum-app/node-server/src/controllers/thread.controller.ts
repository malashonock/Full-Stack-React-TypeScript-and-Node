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
      return res.send(404).send('Thread not found');
    }

    const thread = await ThreadRepository.getThreadById(threadId);
    
    res.json(thread);
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
      return res.status(404).send('Thread not found');
    }

    const { name, description } = req.body;

    if (!name && !description) {
      return res.status(304).send('No updatable fields were provided in the request');
    }

    const updatedThread = await ThreadRepository.updateThread(threadId, req.body);

    if (!updatedThread) {
      return res.status(404).send('Thread not found');
    }

    res.json(updatedThread);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getCategoryThreads: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.send(404).send('Thread category not found');
    }

    const categoryThreads = await ThreadRepository.getAllThreadsByCategoryId(categoryId);
    res.json(categoryThreads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getUserThreads: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;

    if (!userId) {
      return res.send(404).send('User not found');
    }

    const userThreads = await ThreadRepository.getAllThreadsByUserId(userId);
    res.json(userThreads);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getTopCategoryThreads: RequestHandler = async (req, res) => {
  try {
    const topN = Number(req.query.take) || 3;

    const topCategoryThreads = await ThreadRepository.getTopCategoryThreads(topN);
    res.json(topCategoryThreads);
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
};