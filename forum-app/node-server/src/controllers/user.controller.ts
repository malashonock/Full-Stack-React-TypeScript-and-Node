import { RequestHandler } from 'express';

import UserRepo from '../repo/User.repo';

const createUser: RequestHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const createdUser = await UserRepo.registerUser(userName, email, password);
    res.send(createdUser);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  createUser,
};