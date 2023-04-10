import { RequestHandler } from 'express';

import UserRepo from '../repo/User.repo';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const { data: createdUser, messages } = await UserRepo.registerUser(userName, email, password);
    if (createdUser) {
      res.send(createdUser);
    } else if (messages) {
      res.status(400).send(messages[0]);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  createUser,
};